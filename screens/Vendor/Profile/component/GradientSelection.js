import * as React from "react";
import { Image, StyleSheet, Text, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  Padding,
  FontFamily,
  Color,
  FontSize,
  Border,
} from "../../../../GlobalStyles";

const GradientSelection = ({
  title,
  enable,
  onPressIn = () => {},
  onPress = () => {},
}) => {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        style={[styles.party2, styles.partySpaceBlock]}
        locations={[0, 1]}
        colors={
          enable ? ["#6c1b9e", "#ff077e"] : ["transparent", "transparent"]
        }
        useAngle={true}
        angle={-90}
      >
        <Text
          style={[styles.titleTypo1, { fontWeight: enable ? "700" : "300" }]}
        >
          {title}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  titleTypo1: {
    fontFamily: FontFamily.typographyBodySmallBold,
    color: Color.labelColorDarkPrimary,
  },
  partySpaceBlock: {
    paddingBottom: Padding.p_base,
    paddingRight: Padding.p_base,
    paddingTop: Padding.p_base,
    paddingLeft: Padding.p_13xl,
    flexDirection: "row",
  },
  party2: {
    borderTopRightRadius: Border.br_5xs,
    borderBottomRightRadius: Border.br_5xs,
    backgroundColor: Color.appColorGradient,
  },
});

export default GradientSelection;
