import React, { useMemo } from "react";
import { Text, StyleSheet, Image, View, Pressable } from "react-native";
import { Padding, Color, FontSize, FontFamily } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/core";
import Back from "../assets/back.svg";

const TopNavigationContent = ({
  title,
  RightComponent,
  backStyle,
  LeftComponent,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.topnavigationContent}>
      <Pressable
        onPress={LeftComponent ? LeftComponent : () => navigation.pop()}
        style={{ marginLeft: 10, ...backStyle }}
      >
        <Back />
      </Pressable>
      <View style={styles.title}>
        <Text style={styles.title1}>{title}</Text>
      </View>
      {RightComponent ? (
        RightComponent
      ) : (
        <View style={{ width: 30, height: 30 }}></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  leftAccessory: {
    alignItems: "center",
  },
  title1: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "700",
    fontFamily: FontFamily.typographyBodySmallBold,
    color: Color.labelColorDarkPrimary,
    textAlign: "center",
    bottom: 7,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  topnavigationContent: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 40,
    marginBottom: 20,
  },
});

export default TopNavigationContent;
