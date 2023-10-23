import React, { useState } from "react";
import { ImageBackground, View } from "react-native";
import VendorBackButton from "../../components/navigation/VendorBackButton";
import { styles } from "./styles";
import { Tabs } from "../../components/Atoms/Tabs";
import { useNavigation } from "@react-navigation/native";

const tabs = [
  {
    id: "messages",
    label: "Messages",
  },
  {
    id: "eventDetails",
    label: "Event Details",
  },
];
export const EventScreen: React.FC = (props) => {
  const navigation = useNavigation();
  const { navigate } = navigation;
  const [selectedTab, setSelectedTab] = useState(tabs[1].id);

  const handleTabChange = (id: string) => {
    if (id === tabs[0].id) {
      navigate("EventMessages");
    }
    setSelectedTab(id);
  };

  return (
    <View style={styles.screen}>
      <ImageBackground
        style={styles.bgIcon}
        resizeMode="cover"
        source={require("../../assets/bg11.png")}
      />
      <View style={styles.header}>
        <VendorBackButton navigation={navigation} style={styles.backButton} />
      </View>
      {/*<Divider />*/}
      <Tabs value={selectedTab} tabs={tabs} onChange={handleTabChange} />
      <View style={styles.content}></View>
    </View>
  );
};
