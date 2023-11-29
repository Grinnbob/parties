import React from "react";
import { ImageBackground, Text, View } from "react-native";
import { styles } from "./styles";
import VendorBackButton from "../../../components/navigation/VendorBackButton";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "../../../components/Atoms";
import { Chat } from "../../../components/Chat";
import useGlobalState from "../../../stateManagement/hook";
import StateTypes from "../../../stateManagement/StateTypes";
import { QuoteModel } from "../../../models";
import { BackButton } from "../../../components/navigation/BackButton";
import { useRecoilState } from "recoil";
import { selectedQuoteAtom } from "../../../stateManagement";

type EventMessageScreenProps = {
  route: {
    params: {
      quote: QuoteModel;
      conversationId: number;
    };
  };
};

export const EventMessageScreen: React.FC<EventMessageScreenProps> = ({
  route,
}) => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };

  const { conversationId } = route.params;
  const [selectedQuote] = useRecoilState(selectedQuoteAtom);
  const { Party: party } = selectedQuote;

  const [user] = useGlobalState(StateTypes.user.key, StateTypes.user.default);

  return (
    <View style={styles.screen}>
      <ImageBackground
        style={styles.bgIcon}
        resizeMode="cover"
        source={require("../../../assets/bg11.png")}
      />
      <View style={styles.header}>
        <BackButton onPress={handleBackPress} />
        <View>
          <Text style={styles.title}>{party.name}</Text>
          <Text style={styles.serviceName}>{party.description}</Text>
        </View>
        <View style={styles.hidden} />
      </View>
      <Divider />
      <Chat
        conversationId={conversationId}
        userId={user.id}
        vendorId={user.id}
      />
    </View>
  );
};
