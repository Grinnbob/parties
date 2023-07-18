import * as React from "react";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ServiceTypeCard from "./ServiceTypeCard";
import { Border, Color } from "../GlobalStyles";

const ServiceTypeCardTrash = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.touchableopacity}
      activeOpacity={0.2}
      onPress={() => navigation.navigate("VendorDescriptionScreen")}
    >
      <ServiceTypeCard
        img={require("../assets/img4.png")}
        partyDecorations={`Party
Decorations`}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableopacity: {
    flex: 1,
    borderRadius: Border.br_base,
    backgroundColor: Color.gray_100,
    height: 156,
    overflow: "hidden",
  },
});

export default ServiceTypeCardTrash;
