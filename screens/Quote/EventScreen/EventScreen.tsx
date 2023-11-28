import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Divider, GradientButton, Tabs } from "../../../components/Atoms";
import { CreateQuoteModal } from "../../../components/Moleculs/CreateQuoteModal/CreateQuoteModal";
import { PartyInfo } from "../../../components/Moleculs";
import { ConversationModel, QuoteModel } from "../../../models";
import { NotFoundImageIcon } from "../../../components/Icons";
import { BackButton } from "../../../components/navigation/BackButton";
import apis from "../../../apis";

type PartyDetailsScreenProps = {
  route: {
    params: {
      quote: QuoteModel;
    };
  };
};

export const EventScreen: React.FC<PartyDetailsScreenProps> = ({ route }) => {
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
  const [isCreatQuoteModalOpen, setIsCreateQuoteModalOpen] = useState(false);
  const [isConversationLoading, setIsConversationLoading] = useState(true);
  const [conversation, setConversation] = useState<ConversationModel | null>(
    null
  );
  const isInitialized = useRef(false);
  const { quote } = route.params;
  const { Party: party } = quote;

  useEffect(() => {
    if (!isInitialized.current && quote.status === "new") {
      isInitialized.current = true;
      apis.quote.changeStatus(quote.id, "pending");
    }
  }, [quote]);

  const handleTabChange = (id: string) => {
    if (id === tabs[1].id) {
      if (!isConversationLoading) {
        push("EventMessageScreen", {
          quote,
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

  useEffect(() => {
    if (conversation?.id && isMessagePressed) {
      push("EventMessageScreen", {
        quote,
        conversationId: conversation?.id,
      });
      setIsMessagedPressed(false);
    }
  }, [conversation]);

  const toggleCreateQuotePress = () => {
    setIsCreateQuoteModalOpen(!isCreatQuoteModalOpen);
  };

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

  const handleBackPress = useCallback(() => {
    navigation.pop();
  }, []);

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
              <BackButton onPress={handleBackPress} />
            </TouchableOpacity>
          </View>
        </View>
        <Tabs value={selectedTab} tabs={tabs} onChange={handleTabChange} />
        <Divider />
        <View style={styles.content}>
          {selectedTab === "eventDetails" && (
            <>
              <PartyInfo party={party} />
              {(quote.status === "new" || quote.status === "pending") && (
                <>
                  <Divider style={styles.divider} />
                  <View style={styles.actionsContainer}>
                    <View style={styles.actionButtonContainer}>
                      <GradientButton
                        text="Deny Request"
                        style={styles.leftButton}
                        textStyle={styles.actionButtonText}
                        disabled={true}
                      />
                    </View>
                    <View style={styles.actionButtonContainer}>
                      <GradientButton
                        text="Create a Quote"
                        style={styles.rightButton}
                        textStyle={styles.actionButtonText}
                        onPress={toggleCreateQuotePress}
                      />
                    </View>
                  </View>
                  <Divider style={styles.divider} />
                </>
              )}
            </>
          )}
          <CreateQuoteModal
            isOpen={isCreatQuoteModalOpen}
            onClose={toggleCreateQuotePress}
          />
        </View>
      </View>
    </View>
  );
};
