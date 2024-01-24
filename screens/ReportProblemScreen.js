import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Linking,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Padding, Border, FontSize, FontFamily, Color } from "../GlobalStyles";

const ReportProblemScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.reportproblemscreen}>
      <Image
        style={styles.bgIcon}
        resizeMode="cover"
        source={require("../assets/bg20.png")}
      />
      <LinearGradient
        style={[styles.form, styles.formShadowBox]}
        locations={[0, 1]}
        colors={["#6c1b9e", "#ff077e"]}
        useAngle={true}
        angle={-90}
      >
        <Text style={[styles.label, styles.labelLayout]}>Next</Text>
      </LinearGradient>
      <Image
        style={styles.statusBarIcon}
        resizeMode="cover"
        source={require("../assets/status-bar.png")}
      />
      <View style={[styles.form1, styles.formBorder]}>
        <View style={[styles.icon, styles.iconLayout]} />
        <Text style={[styles.chooseAParty, styles.chooseAPartyTypo]}>
          Choose a party
        </Text>
        <Image
          style={[styles.iconsaxlineararrowsquaredown, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/iconsaxlineararrowsquaredown1.png")}
        />
      </View>
      <View style={styles.problemDetails}>
        <View>
          <Text style={[styles.title1, styles.titleTypo]}>Problem Details</Text>
          <Text
            style={[styles.pleaseIncludeAny, styles.pleaseIncludeAnyLayout]}
          >{`Please include any details you think we may need to know. Also include a resolution that you would prefer. `}</Text>
        </View>
        <View style={styles.textField} />
        <View style={styles.attach}>
          <View style={[styles.form2, styles.formBorder]}>
            <Text style={[styles.chooseAParty, styles.chooseAPartyTypo]}>
              Attach evidence
            </Text>
            <View style={styles.selectWrapper}>
              <Text style={styles.select}>Select</Text>
            </View>
          </View>
          <Text
            style={[styles.youCanAlsoContainer, styles.pleaseIncludeAnyLayout]}
          >
            <Text style={styles.youCanAlso}>{`You can also check pur `}</Text>
            <Text style={styles.faq}>FAQ</Text>
            <Text style={styles.youCanAlso}> for more questions.</Text>
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.form3, styles.formShadowBox]}
        activeOpacity={0.2}
        onPress={() => navigation.navigate("ReportSuccessScreen")}
      >
        <Text style={[styles.label1, styles.labelLayout]}>Send</Text>
      </TouchableOpacity>
      <View style={styles.topnavigationContent}>
        <View style={[styles.leftAccessory, styles.header]}>
          <Text style={styles.leftTitle}>Prev. Title</Text>
          <Image
            style={[styles.iconsaxlinearhambergermenu, styles.backLayout]}
            resizeMode="cover"
            source={require("../assets/iconsaxlinearhambergermenu.png")}
          />
          <Pressable
            style={styles.backLayout}
            onPress={() => Linking.openURL("https://www.google.com")}
          >
            <Image
              style={styles.icon1}
              resizeMode="cover"
              source={require("../assets/back.png")}
            />
          </Pressable>
        </View>
        <View style={styles.title2}>
          <Text style={[styles.title3, styles.titleTypo]}>
            Report a Problem
          </Text>
        </View>
        <View style={[styles.rightAccessory, styles.header]}>
          <Text style={[styles.title4, styles.titleClr]}>Label</Text>
          <Text style={[styles.title5, styles.title5SpaceBlock]}>Invite</Text>
          <Image
            style={[styles.iconsaxlinearshoppingcart, styles.xIconLayout]}
            resizeMode="cover"
            source={require("../assets/iconsaxlinearshoppingcart.png")}
          />
          <Image
            style={[styles.iconsaxlinearshoppingcart, styles.xIconLayout]}
            resizeMode="cover"
            source={require("../assets/magnifyGlass.png")}
          />
          <Image
            style={styles.xIconLayout}
            resizeMode="cover"
            source={require("../assets/x.png")}
          />
          <Image
            style={[styles.iconsaxlinearshoppingcart, styles.xIconLayout]}
            resizeMode="cover"
            source={require("../assets/iconsaxlinearuseradd.png")}
          />
          <Image
            style={[styles.iconsaxlinearshoppingcart, styles.xIconLayout]}
            resizeMode="cover"
            source={require("../assets/iconsaxlinearexport.png")}
          />
          <Image
            style={[styles.iconsaxlinearshoppingcart, styles.xIconLayout]}
            resizeMode="cover"
            source={require("../assets/iconsaxlinearheart.png")}
          />
          <Image
            style={[styles.dotsthreeIcon, styles.title5SpaceBlock]}
            resizeMode="cover"
            source={require("../assets/dotsthree.png")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formShadowBox: {
    justifyContent: "center",
    paddingVertical: Padding.p_xs,
    flexDirection: "row",
    height: 40,
    shadowOpacity: 1,
    elevation: 15,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: "rgba(0, 0, 0, 0.15)",
    borderRadius: Border.br_11xl,
    top: 732,
    alignItems: "center",
    paddingHorizontal: Padding.p_5xl,
    width: 327,
    left: 24,
    position: "absolute",
  },
  labelLayout: {
    lineHeight: 22,
    fontSize: FontSize.typographyHeadingMedium_size,
  },
  formBorder: {
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#232323",
    borderStyle: "solid",
    borderRadius: Border.br_5xs,
    alignItems: "center",
    flexDirection: "row",
  },
  iconLayout: {
    height: 21,
    width: 21,
  },
  chooseAPartyTypo: {
    fontFamily: FontFamily.typographyBodyMediumLight,
    fontWeight: "300",
    color: Color.primaryAlmostGrey,
  },
  titleTypo: {
    fontFamily: FontFamily.typographyBodySmallBold,
    fontWeight: "700",
    color: Color.labelColorDarkPrimary,
  },
  pleaseIncludeAnyLayout: {
    marginTop: 8,
    lineHeight: 17,
    fontSize: FontSize.typographyBodySmallBold_size,
    textAlign: "left",
    width: 327,
  },
  header: {
    paddingBottom: Padding.p_4xs,
    paddingTop: Padding.p_4xs,
    width: 130,
    height: 42,
    top: 7,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  backLayout: {
    marginLeft: 5,
    width: 40,
    height: 40,
  },
  titleClr: {
    color: Color.appColorPerfectPink,
    textAlign: "center",
  },
  title5SpaceBlock: {
    marginLeft: 10,
    display: "none",
  },
  xIconLayout: {
    height: 24,
    width: 24,
    marginLeft: 10,
    overflow: "hidden",
  },
  bgIcon: {
    width: 665,
    left: 0,
    top: 0,
    position: "absolute",
    height: 812,
  },
  label: {
    textAlign: "center",
    color: Color.labelColorDarkPrimary,
    fontFamily: FontFamily.typographyBodyMediumRegular,
  },
  form: {
    backgroundColor: Color.appColorGradient,
    display: "none",
  },
  statusBarIcon: {
    height: 44,
    width: 375,
    left: 0,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  icon: {
    backgroundColor: Color.dimgray_200,
    display: "none",
  },
  chooseAParty: {
    textAlign: "left",
    color: Color.primaryAlmostGrey,
    lineHeight: 22,
    fontSize: FontSize.typographyHeadingMedium_size,
  },
  iconsaxlineararrowsquaredown: {
    overflow: "hidden",
  },
  form1: {
    top: 124,
    paddingVertical: Padding.p_base,
    paddingHorizontal: Padding.p_5xl,
    justifyContent: "space-between",
    width: 327,
    left: 24,
    position: "absolute",
  },
  title1: {
    textAlign: "left",
    lineHeight: 22,
    fontSize: FontSize.typographyHeadingMedium_size,
    width: 327,
    fontFamily: FontFamily.typographyBodySmallBold,
    fontWeight: "700",
  },
  pleaseIncludeAny: {
    color: Color.primaryAlmostGrey,
    fontFamily: FontFamily.typographyBodyMediumLight,
    fontWeight: "300",
  },
  textField: {
    backgroundColor: Color.gray_700,
    height: 280,
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#232323",
    borderStyle: "solid",
    borderRadius: Border.br_5xs,
    width: 327,
  },
  select: {
    fontSize: FontSize.typographyBodyMediumBold_size,
    lineHeight: 20,
    textAlign: "left",
    color: Color.labelColorDarkPrimary,
    fontFamily: FontFamily.typographyBodyMediumRegular,
  },
  selectWrapper: {
    backgroundColor: Color.appColorPartyPurple,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_5xs,
    borderRadius: Border.br_5xs,
    flexDirection: "row",
  },
  form2: {
    height: 53,
    paddingLeft: Padding.p_5xl,
    paddingTop: Padding.p_base,
    paddingRight: Padding.p_5xs,
    paddingBottom: Padding.p_base,
    alignSelf: "stretch",
  },
  youCanAlso: {
    color: Color.primaryAlmostGrey,
  },
  faq: {
    color: Color.labelColorDarkPrimary,
  },
  youCanAlsoContainer: {
    fontFamily: FontFamily.typographyBodyMediumRegular,
  },
  attach: {
    alignSelf: "stretch",
    marginTop: 24,
  },
  problemDetails: {
    top: 209,
    left: 24,
    position: "absolute",
  },
  label1: {
    color: Color.dimgray_100,
    textAlign: "center",
    fontFamily: FontFamily.typographyBodyMediumRegular,
  },
  form3: {
    backgroundColor: Color.gray_600,
  },
  leftTitle: {
    fontSize: FontSize.textLargeBold_size,
    letterSpacing: 0,
    lineHeight: 22,
    fontFamily: FontFamily.bodyRegular,
    color: Color.defaultSystemBlueLight,
    textAlign: "left",
    display: "none",
    alignItems: "center",
    flex: 1,
  },
  iconsaxlinearhambergermenu: {
    display: "none",
    overflow: "hidden",
  },
  icon1: {
    height: "100%",
    width: "100%",
  },
  leftAccessory: {
    paddingLeft: Padding.p_base,
    paddingRight: Padding.p_4xs,
    left: 0,
  },
  title3: {
    fontSize: FontSize.typographyHeadingLarge_size,
    lineHeight: 25,
    textAlign: "center",
  },
  title2: {
    left: 163,
    width: 49,
    height: 42,
    top: 7,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  title4: {
    fontFamily: FontFamily.typographyBodyMediumRegular,
    lineHeight: 22,
    fontSize: FontSize.typographyHeadingMedium_size,
    display: "none",
  },
  title5: {
    fontSize: FontSize.size_mini,
    fontWeight: "600",
    fontFamily: FontFamily.montserratSemibold,
    color: Color.appColorPerfectPink,
    textAlign: "center",
  },
  iconsaxlinearshoppingcart: {
    display: "none",
  },
  dotsthreeIcon: {
    width: 32,
    height: 32,
    overflow: "hidden",
  },
  rightAccessory: {
    left: 245,
    paddingLeft: Padding.p_4xs,
    paddingRight: Padding.p_5xl,
    justifyContent: "flex-end",
  },
  topnavigationContent: {
    marginLeft: -187.5,
    top: 44,
    left: "50%",
    borderColor: "rgba(77, 77, 77, 0.5)",
    borderBottomWidth: 1,
    height: 56,
    borderStyle: "solid",
    width: 375,
    position: "absolute",
  },
  reportproblemscreen: {
    backgroundColor: Color.labelColorDarkPrimary,
    overflow: "hidden",
    height: 812,
    flex: 1,
    width: "100%",
  },
});

export default ReportProblemScreen;
