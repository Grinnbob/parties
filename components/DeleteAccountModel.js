import * as React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Padding, FontSize, FontFamily, Color, Border } from "../GlobalStyles";

const DeleteAccountModel = () => {
  return (
    <View style={[styles.alert, styles.formFlexBox]}>
      <Image
        style={styles.iconsaxlinearclosecircle}
        resizeMode="cover"
        source={require("../assets/iconsaxlinearclosecircle2.png")}
      />
      <View style={[styles.titleParent, styles.formSpaceBlock]}>
        <View style={styles.title}>
          <View style={styles.icon}>
            <Image
              style={styles.warningIcon}
              resizeMode="cover"
              source={require("../assets/warning.png")}
            />
          </View>
          <View style={styles.title1}>
            <Text style={styles.areYouSure}>
              Are you sure want to delete your account?
            </Text>
          </View>
        </View>
        <Text style={styles.keepInMind}>
          Keep in mind this action cannot be undone
        </Text>
      </View>
      <LinearGradient
        style={[styles.form, styles.formSpaceBlock]}
        locations={[0, 1]}
        colors={["#6c1b9e", "#ff077e"]}
        useAngle={true}
        angle={-90}
      >
        <Text style={styles.label}>Yes, delete my account</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  formFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Padding.p_5xl,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  formSpaceBlock: {
    marginTop: 24,
    alignSelf: "stretch",
  },
  iconsaxlinearclosecircle: {
    position: "absolute",
    top: 8,
    left: 295,
    width: 24,
    height: 24,
    overflow: "hidden",
    zIndex: 0,
  },
  warningIcon: {
    width: 43,
    height: 43,
  },
  icon: {
    flexDirection: "row",
  },
  areYouSure: {
    fontSize: FontSize.typographyBodyMediumBold_size,
    lineHeight: 20,
    fontWeight: "700",
    fontFamily: FontFamily.typographyBodySmallBold,
    color: Color.primarySoBlack,
    textAlign: "left",
    flex: 1,
  },
  title1: {
    marginLeft: 16,
    flex: 1,
    flexDirection: "row",
  },
  title: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  keepInMind: {
    fontSize: FontSize.typographyBodySmallBold_size,
    lineHeight: 17,
    fontWeight: "300",
    fontFamily: FontFamily.typographyBodyMediumLight,
    color: Color.primaryAlmostGrey,
    width: 279,
    marginTop: 16,
    textAlign: "center",
  },
  titleParent: {
    zIndex: 1,
  },
  label: {
    fontSize: FontSize.typographyHeadingMedium_size,
    lineHeight: 22,
    fontFamily: FontFamily.typographyBodyMediumRegular,
    color: Color.labelColorDarkPrimary,
    textAlign: "center",
  },
  form: {
    borderRadius: Border.br_11xl,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowRadius: 15,
    elevation: 15,
    height: 40,
    paddingVertical: Padding.p_xs,
    backgroundColor: Color.appColorGradient,
    zIndex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Padding.p_5xl,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  alert: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.labelColorDarkPrimary,
    shadowColor: "rgba(27, 27, 27, 0.16)",
    shadowRadius: 16,
    elevation: 16,
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 1,
    width: 327,
    paddingVertical: Padding.p_13xl,
  },
});

export default DeleteAccountModel;
