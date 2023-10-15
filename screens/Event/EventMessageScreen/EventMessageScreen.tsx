import React, { useRef, useState } from "react";
import { ImageBackground, Text, View } from "react-native";
import { styles } from "./styles";
import VendorBackButton from "../../../components/navigation/VendorBackButton";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "../../../components/Atoms";
import { Chat } from "../../../components/Chat";

export const EventMessageScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const handleBackPress = () => {
    navigate("Event");
  };

  return (
    <View style={styles.screen}>
      <ImageBackground
        style={styles.bgIcon}
        resizeMode="cover"
        source={require("../../../assets/bg11.png")}
      />
      <View style={styles.header}>
        <VendorBackButton onPress={handleBackPress} style={styles.backButton} />
        <View>
          <Text style={styles.title}>Anthony's Tacos</Text>
          <Text style={styles.serviceName}>Food service</Text>
        </View>
        <View style={styles.hidden} />
      </View>
      <Divider />
      <Chat />
    </View>
  );
};
