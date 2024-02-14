import React, { useEffect, useMemo, useState } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Tabs } from "../../../components/Atoms";
import { useNavigation } from "@react-navigation/native";
import { BackButton } from "../../../components/navigation/BackButton";
import { ConversationModel, PartyModel } from "../../../models";
import { NotFoundImageIcon } from "../../../components/Icons";
import useGlobalState from "../../../stateManagement/hook";
import StateTypes from "../../../stateManagement/StateTypes";
import apis from "../../../apis";
import { PartyInfo } from "../../../components/Moleculs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { push } = navigation;
  const [isMessagePressed, setIsMessagedPressed] = useState(false);
  const tabs = useMemo(() => {
    return [
      {
        id: "eventDetails",
        label: "Event Details",
      },
      {
        id: "messages",
        label: "Messages",
        loading: isMessagePressed,
      },
    ];
  }, [isMessagePressed]);
  const [selectedTab, setSelectedTab] = useState(tabs[0].id);
  const [conversation, setConversation] = useState<ConversationModel | null>(
    null
  );
  const [isConversationLoading, setIsConversationLoading] = useState(true);

  const { party } = route.params;

  useEffect(() => {
    const getConversationId = async () => {
      const response = await apis.conversation.getByPartyId({
        partyId: party.id,
      });
      setConversation(response.data[0]);
      setIsConversationLoading(false);
    };
    getConversationId();
  }, [party.id]);

  const handleTabChange = (id: string) => {
    if (id === tabs[1].id) {
      if (!isConversationLoading) {
        push("PartyMessageScreen", {
          party,
          conversationId: conversation?.id,
        });
        return;
      } else {
        setIsMessagedPressed(true);
        return;
      }
    }
    if (isMessagePressed) {
      setIsMessagedPressed(false);
    }
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
          <View
            style={[
              styles.headerInnerContainer,
              { marginTop: insets.top ? insets.top : 16 },
            ]}
          >
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
        </View>
      </View>
    </View>
  );
};
