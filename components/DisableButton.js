import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";

const DisableButton = () => {
  return (
    <View style={styles.buttons}>
      <View style={styles.btn}>
        <Text style={styles.label}>Next</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: FontSize.typographyHeadingMedium_size,
    lineHeight: 22,
    fontFamily: FontFamily.typographyBodyMediumRegular,
    color: Color.dimgray_100,
    textAlign: "center",
  },
  btn: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.gray_600,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 15,
    elevation: 15,
    shadowOpacity: 1,
    width: 327,
    height: 40,
    flexDirection: "row",
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_xs,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    position: "absolute",
    top: 732,
    left: 24,
  },
});

export default DisableButton;
