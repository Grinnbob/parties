import React, { useState } from "react";
import { ImageBackground, View } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Divider, GradientButton, Tabs } from "../../components/Atoms";
import { CreateQuoteModal } from "./CreateQuoteModal/CreateQuoteModal";

const tabs = [
  {
    id: "eventDetails",
    label: "Event Details",
  },
  {
    id: "messages",
    label: "Messages",
  },
];
export const EventScreen: React.FC = (props) => {
  const navigation = useNavigation();
  const { navigate } = navigation;
  const [selectedTab, setSelectedTab] = useState(tabs[0].id);
  const [isCreatQuoteModalOpen, setIsCreateQuoteModalOpen] = useState(false);

  const handleTabChange = (id: string) => {
    if (id === tabs[0].id) {
      navigate("EventMessages");
    }
    setSelectedTab(id);
  };

  const toggleCreateQuotePress = () => {
    setIsCreateQuoteModalOpen(!isCreatQuoteModalOpen);
  };

  return (
    <View style={styles.screen}>
      <ImageBackground
        style={styles.bgIcon}
        resizeMode="cover"
        source={require("../../assets/bg11.png")}
      />
      <View style={styles.header} />
      <Tabs value={selectedTab} tabs={tabs} onChange={handleTabChange} />
      <Divider />
      <View style={styles.content}>
        {selectedTab === "eventDetails" && (
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
          </>
        )}
        <CreateQuoteModal
          isOpen={isCreatQuoteModalOpen}
          onClose={toggleCreateQuotePress}
        />
      </View>
    </View>
  );
};
