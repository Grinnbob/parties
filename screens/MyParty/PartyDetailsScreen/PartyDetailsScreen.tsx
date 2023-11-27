import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { Tabs } from "../../../components/Atoms";
import { useNavigation } from "@react-navigation/native";
import { BackButton } from "../../../components/navigation/BackButton";
import { ConversationModel, PartyModel } from "../../../models";
import { NotFoundImageIcon } from "../../../components/Icons";
import { Chat } from "../../../components/Chat";
import useGlobalState from "../../../stateManagement/hook";
import StateTypes from "../../../stateManagement/StateTypes";
import apis from "../../../apis";
import { PartyInfo } from "../../../components/Moleculs";

const tabs = [
  {
    id: "eventDetails",
    label: "Quote Details",
  },
  {
    id: "messages",
    label: "Messages",
  },
];

type PartyDetailsScreenProps = {
  route: {
    params: {
      party: PartyModel;
    };
  };
};

export const PartyDetailsScreen: React.FC<PartyDetailsScreenProps> = ({
  route,
}) => {
  const navigation = useNavigation();
  const { navigate } = navigation;
  const [selectedTab, setSelectedTab] = useState(tabs[0].id);
  const [user] = useGlobalState(StateTypes.user.key, StateTypes.user.default);
  const [conversation, setConversation] = useState<ConversationModel | null>(
    null
  );
  const [isConversationLoading, setIsConversationLoading] = useState(true);

  const { party } = route.params;

  useEffect(() => {
    const getConversationId = async () => {
      const response = await apis.conversation.getByPartyId({
        PartyId: party.id,
      });
      setConversation(response.data[0]);
      setIsConversationLoading(false);
    };
    getConversationId();
  }, [party.id]);

  const handleTabChange = (id: string) => {
    setSelectedTab(id);
  };

  return (
    <View style={styles.screen}>
      <ImageBackground
        style={styles.bgIcon}
        resizeMode="cover"
        source={require("../../../assets/bg11.png")}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.partyImageNotFound}>
            <NotFoundImageIcon
              width="120"
              height="120"
              style={styles.notFoundImageIcon}
            />
          </View>
          <View style={styles.headerInnerContainer}>
            <TouchableOpacity style={styles.backButtonContainer}>
              <BackButton />
            </TouchableOpacity>
          </View>
        </View>
        <Tabs value={selectedTab} tabs={tabs} onChange={handleTabChange} />
        <View style={styles.content}>
          <View
            style={[
              styles.eventDetailsContainer,
              styles.tabContainer,
              tabs[0].id === selectedTab ? styles.visibleTab : undefined,
            ]}
          >
            <PartyInfo party={party} />
          </View>
          <View
            style={[
              styles.tabContainer,
              tabs[1].id === selectedTab ? styles.visibleTab : undefined,
            ]}
          >
            {isConversationLoading || !conversation?.id ? (
              <ActivityIndicator size={16} style={styles.activityIndicator} />
            ) : (
              <Chat conversationId={conversation?.id} userId={user.id} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
