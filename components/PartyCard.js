import React, { useMemo } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";

const PartyCard = ({ asset, title, enable, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {enable && (
        <Image
          style={styles.thumbIcon}
          resizeMode="cover"
          source={require("../assets/thumb.png")}
        />
      )}
      <View
        style={[
          styles.view,
          {
            backgroundColor: enable ? "#FF077E" : "transparent",
            borderWidth: enable ? 0 : 3,
          },
        ]}
      >
        {asset}
        <Text style={styles.fourthOfJuly}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fourthOfJuly: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "700",
    fontFamily: FontFamily.typographyBodySmallBold,
    color: Color.labelColorDarkPrimary,
    textAlign: "center",
    marginTop: 8,
  },
  thumbIcon: {
    width: 24,
    height: 24,
    position: "absolute",
    zIndex: 100,
    top: -10,
    left: 88,
  },
  view: {
    borderRadius: Border.br_base,
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.2)",
    height: 98,
    width: 98,
    paddingTop: Padding.p_12xs,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 7,
  },
});

export default PartyCard;
