import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Padding, Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const ServicesCard = ({ table10Chairs, startingAt }) => {
  return (
    <View style={styles.services}>
      <View style={styles.food1}>
        <View style={styles.top}>
          <View
            style={[styles.startingAtParent, styles.startingAtParentSpaceBlock]}
          >
            <Text style={[styles.startingAt, styles.startingAtTypo]}>
              {startingAt}
            </Text>
            <Text style={[styles.person, styles.personTypo]}>
              <Text style={styles.text}>{`$20 `}</Text>
              <Text style={styles.person1}>/ person</Text>
            </Text>
          </View>
          <View
            style={[
              styles.table10ChairsWrapper,
              styles.startingAtParentSpaceBlock,
            ]}
          >
            <Text style={[styles.table10, styles.personTypo]}>
              {table10Chairs}
            </Text>
          </View>
        </View>
        <View style={styles.text1}>
          <Text style={[styles.allCombosCome, styles.startingAtTypo]}>
            All combos come with your choice of one of the following per season:
            Bean paste sew, tofu soup, white kimchi noodles, or steamed egg.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  startingAtParentSpaceBlock: {
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_base,
    alignSelf: "stretch",
  },
  startingAtTypo: {
    textAlign: "left",
    color: Color.labelColorDarkPrimary,
    fontFamily: FontFamily.typographyBodyMediumLight,
    fontWeight: "300",
  },
  personTypo: {
    fontSize: FontSize.typographyHeadingMedium_size,
    textAlign: "left",
    color: Color.labelColorDarkPrimary,
  },
  startingAt: {
    fontSize: FontSize.typographyBodySmallBold_size,
    lineHeight: 17,
  },
  text: {
    fontFamily: FontFamily.textLargeBold,
    fontWeight: "700",
  },
  person1: {
    fontFamily: FontFamily.sFProDisplayRegular,
  },
  person: {
    lineHeight: 19,
    marginTop: 4,
  },
  startingAtParent: {
    backgroundColor: Color.darkslategray_100,
    width: 130,
    justifyContent: "center",
  },
  table10: {
    lineHeight: 22,
    fontFamily: FontFamily.typographyBodySmallBold,
    fontWeight: "700",
    alignSelf: "stretch",
  },
  table10ChairsWrapper: {
    flex: 1,
    backgroundColor: Color.appColorPerfectPink,
    justifyContent: "flex-end",
  },
  top: {
    backgroundColor: Color.darkslategray_200,
    flexDirection: "row",
    alignItems: "flex-end",
    alignSelf: "stretch",
    overflow: "hidden",
  },
  allCombosCome: {
    fontSize: FontSize.typographyBodyMediumBold_size,
    lineHeight: 20,
    alignSelf: "stretch",
  },
  text1: {
    paddingHorizontal: 23,
    paddingTop: 15,
    paddingBottom: 23,
    width: 329,
  },
  food1: {
    borderRadius: Border.br_base,
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 1,
    overflow: "hidden",
    width: 329,
  },
  services: {
    marginTop: 15.27,
  },
});

export default ServicesCard;
