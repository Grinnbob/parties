import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import GradientPinkButton from "../components/GradientPinkButton";
import { Padding, FontFamily, FontSize, Color } from "../GlobalStyles";

const ReportSuccessScreen = () => {
  return (
    <View style={styles.reportsuccessscreen}>
      <Image
        style={styles.bgIcon}
        resizeMode="cover"
        source={require("../assets/bg7.png")}
      />
      <GradientPinkButton />
      <View style={styles.topnavigationContent}>
        <View style={[styles.leftAccessory, styles.accessoryPosition]}>
          <Text style={styles.leftTitle}>Prev. Title</Text>
          <Image
            style={[
              styles.iconsaxlinearhambergermenu,
              styles.magnifyingglassIconLayout,
            ]}
            resizeMode="cover"
            source={require("../assets/iconsaxlinearhambergermenu1.png")}
          />
          <Image
            style={styles.backIcon}
            resizeMode="cover"
            source={require("../assets/back3.png")}
          />
        </View>
        <View style={[styles.title, styles.titleFlexBox]}>
          <Text style={styles.title1}>Get Inspired</Text>
        </View>
        <View style={[styles.rightAccessory, styles.accessoryPosition]}>
          <Text style={styles.title2}>Next</Text>
          <Image
            style={[styles.magnifyingglassIcon, styles.iconSpaceBlock]}
            resizeMode="cover"
            source={require("../assets/magnifyGlass.png")}
          />
          <Image
            style={[styles.xIcon, styles.iconSpaceBlock]}
            resizeMode="cover"
            source={require("../assets/x1.png")}
          />
        </View>
      </View>
      <View style={[styles.title3, styles.titleFlexBox]}>
        <Text style={styles.weAreAlwaysTypo}>Your problem has reported.</Text>
        <Text style={[styles.weAreAlways, styles.weAreAlwaysTypo]}>
          We are always here to help.
        </Text>
      </View>
      <Image
        style={styles.reportsuccessscreenChild}
        resizeMode="cover"
        source={require("../assets/group-18516.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  accessoryPosition: {
    paddingBottom: Padding.p_4xs,
    paddingTop: Padding.p_4xs,
    width: 130,
    alignItems: "center",
    flexDirection: "row",
    height: 42,
    top: "50%",
    marginTop: -21,
    position: "absolute",
  },
  magnifyingglassIconLayout: {
    height: 24,
    width: 24,
    display: "none",
  },
  titleFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  iconSpaceBlock: {
    marginLeft: 10,
    overflow: "hidden",
  },
  weAreAlwaysTypo: {
    fontFamily: FontFamily.textLargeBold,
    lineHeight: 28,
    fontSize: FontSize.typographyMediumTitle_size,
    alignSelf: "stretch",
    textAlign: "center",
    color: Color.labelColorDarkPrimary,
    fontWeight: "700",
  },
  bgIcon: {
    top: 0,
    width: 665,
    height: 891,
    left: 0,
    position: "absolute",
  },
  leftTitle: {
    fontSize: FontSize.textLargeBold_size,
    letterSpacing: 0,
    lineHeight: 22,
    fontFamily: FontFamily.bodyRegular,
    color: Color.defaultSystemBlueLight,
    textAlign: "left",
    alignItems: "center",
    display: "none",
    flex: 1,
  },
  iconsaxlinearhambergermenu: {
    marginLeft: 5,
    overflow: "hidden",
  },
  backIcon: {
    width: 17,
    height: 12,
    marginLeft: 5,
  },
  leftAccessory: {
    paddingLeft: Padding.p_5xl,
    paddingRight: Padding.p_4xs,
    alignItems: "center",
    display: "none",
    left: 0,
  },
  title1: {
    fontSize: FontSize.size_2xl,
    fontFamily: FontFamily.typographyBodySmallBold,
    textAlign: "center",
    color: Color.labelColorDarkPrimary,
    fontWeight: "700",
  },
  title: {
    right: 116,
    padding: Padding.p_4xs,
    flexDirection: "row",
    height: 42,
    top: "50%",
    marginTop: -21,
    justifyContent: "center",
    display: "none",
  },
  title2: {
    fontSize: FontSize.size_mini,
    fontWeight: "600",
    fontFamily: FontFamily.montserratSemibold,
    color: Color.mediumslateblue_100,
    textAlign: "center",
    display: "none",
  },
  magnifyingglassIcon: {
    height: 24,
    width: 24,
    display: "none",
  },
  xIcon: {
    width: 32,
    height: 32,
  },
  rightAccessory: {
    right: 0,
    paddingLeft: Padding.p_4xs,
    paddingRight: Padding.p_5xl,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  topnavigationContent: {
    marginLeft: -187.5,
    top: 44,
    left: "50%",
    width: 375,
    height: 56,
    display: "none",
    position: "absolute",
  },
  weAreAlways: {
    marginTop: 8,
  },
  title3: {
    top: 343,
    left: 24,
    width: 327,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: 0,
  },
  reportsuccessscreenChild: {
    top: 99,
    left: 98,
    width: 180,
    height: 180,
    position: "absolute",
  },
  reportsuccessscreen: {
    backgroundColor: Color.labelColorDarkPrimary,
    width: "100%",
    height: 812,
    overflow: "hidden",
    flex: 1,
  },
});

export default ReportSuccessScreen;
