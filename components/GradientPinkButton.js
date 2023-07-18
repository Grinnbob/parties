import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";

const GradientPinkButton = () => {
  return (
    <View style={styles.buttons}>
      <LinearGradient
        style={styles.btn}
        locations={[0, 1]}
        colors={["#6c1b9e", "#ff077e"]}
        useAngle={true}
        angle={-90}
      >
        <Text style={styles.label}>Ok!</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: FontSize.typographyHeadingMedium_size,
    lineHeight: 22,
    fontFamily: FontFamily.typographyBodyMediumRegular,
    color: Color.labelColorDarkPrimary,
    textAlign: "center",
  },
  btn: {
    borderRadius: Border.br_11xl,
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
    backgroundColor: Color.appColorGradient,
  },
  buttons: {
    position: "absolute",
    top: 732,
    left: 24,
  },
});

export default GradientPinkButton;
