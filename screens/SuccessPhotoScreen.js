import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import SuccessModel from "../components/SuccessModel";
import { Padding, FontFamily, Color, Border, FontSize } from "../GlobalStyles";

const SuccessPhotoScreen = () => {
  return (
    <View style={styles.successphotoscreen}>
      <Image
        style={[styles.bgIcon, styles.iconPosition]}
        resizeMode="cover"
        source={require("../assets/bg5.png")}
      />
      <View style={styles.topnavigationContent}>
        <View style={[styles.leftAccessory, styles.accessoryPosition]}>
          <Text style={[styles.leftTitle, styles.leftTitleTypo]}>Cancel</Text>
          <Image
            style={[
              styles.iconsaxlinearhambergermenu,
              styles.magnifyingglassIconLayout,
            ]}
            resizeMode="cover"
            source={require("../assets/iconsaxlinearhambergermenu1.png")}
          />
          <Image
            style={[
              styles.iconsaxlinearhambergermenu,
              styles.magnifyingglassIconLayout,
            ]}
            resizeMode="cover"
            source={require("../assets/x.png")}
          />
          <Image
            style={styles.backIcon}
            resizeMode="cover"
            source={require("../assets/back3.png")}
          />
        </View>
        <View style={[styles.title, styles.titleFlexBox1]}>
          <Text
            style={[styles.title1, styles.titleFlexBox]}
          >{`Upload photos & videos`}</Text>
        </View>
        <View style={[styles.rightAccessory, styles.accessoryPosition]}>
          <Text style={styles.title2}>Done</Text>
          <Image
            style={[
              styles.magnifyingglassIcon,
              styles.magnifyingglassIconLayout,
            ]}
            resizeMode="cover"
            source={require("../assets/magnifyGlass.png")}
          />
          <Image
            style={[
              styles.magnifyingglassIcon,
              styles.magnifyingglassIconLayout,
            ]}
            resizeMode="cover"
            source={require("../assets/x.png")}
          />
          <Image
            style={[
              styles.magnifyingglassIcon,
              styles.magnifyingglassIconLayout,
            ]}
            resizeMode="cover"
            source={require("../assets/iconsaxlinearuseradd.png")}
          />
        </View>
      </View>
      <View style={styles.photos}>
        <View style={styles.rowLayout}>
          <Image
            style={[styles.photo01Icon, styles.iconLayout1]}
            resizeMode="cover"
            source={require("../assets/photo-01.png")}
          />
          <Image
            style={[styles.photo02Icon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/photo-02.png")}
          />
          <Image
            style={[styles.photo02Icon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/homeScreen.png")}
          />
        </View>
        <View style={[styles.row02, styles.rowLayout]}>
          <Image
            style={[styles.photo01Icon, styles.iconLayout1]}
            resizeMode="cover"
            source={require("../assets/photo-04.png")}
          />
          <Image
            style={[styles.photo02Icon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/photo-05.png")}
          />
          <Image
            style={[styles.photo02Icon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/photo-06.png")}
          />
        </View>
        <View style={[styles.row02, styles.rowLayout]}>
          <Image
            style={[styles.photo01Icon, styles.iconLayout1]}
            resizeMode="cover"
            source={require("../assets/photo-07.png")}
          />
          <Image
            style={[styles.photo02Icon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/photo-08.png")}
          />
          <Image
            style={[styles.photo02Icon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/photo-09.png")}
          />
        </View>
        <View style={[styles.row02, styles.rowLayout]}>
          <Image
            style={[styles.photo01Icon, styles.iconLayout1]}
            resizeMode="cover"
            source={require("../assets/photo-10.png")}
          />
          <Image
            style={[styles.photo02Icon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/photo-11.png")}
          />
          <Image
            style={[styles.photo02Icon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/photo-12.png")}
          />
        </View>
        <View style={[styles.row02, styles.rowLayout]}>
          <Image
            style={[styles.photo01Icon, styles.iconLayout1]}
            resizeMode="cover"
            source={require("../assets/photo-13.png")}
          />
          <Image
            style={[styles.photo02Icon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/photo-14.png")}
          />
          <Image
            style={[styles.photo02Icon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/photo-15.png")}
          />
        </View>
        <View style={[styles.row02, styles.rowLayout]}>
          <Image
            style={styles.iconLayout1}
            resizeMode="cover"
            source={require("../assets/photo-16.png")}
          />
          <Image
            style={styles.iconLayout}
            resizeMode="cover"
            source={require("../assets/photo-17.png")}
          />
          <Image
            style={styles.iconLayout}
            resizeMode="cover"
            source={require("../assets/photo-18.png")}
          />
        </View>
      </View>
      <Image
        style={[styles.statusBarIcon, styles.iconPosition]}
        resizeMode="cover"
        source={require("../assets/status-bar.png")}
      />
      <View style={styles.formWrapper}>
        <LinearGradient
          style={[styles.form, styles.btnShadowBox]}
          locations={[0, 1]}
          colors={["#6c1b9e", "#ff077e"]}
          useAngle={true}
          angle={-90}
        >
          <Text style={[styles.label, styles.titleFlexBox]}>Upload</Text>
        </LinearGradient>
      </View>
      <View style={[styles.alertmodal, styles.titleFlexBox1]}>
        <View style={styles.alert}>
          <View style={styles.content}>
            <Text style={[styles.title3, styles.titleFlexBox]}>
              Report Problems
            </Text>
            <View style={styles.form1}>
              <Text style={[styles.typeYourProblem, styles.leftTitleTypo]}>
                Type your problem here
              </Text>
            </View>
          </View>
          <Image
            style={[
              styles.iconsaxlinearclosecircle,
              styles.magnifyingglassIconLayout,
            ]}
            resizeMode="cover"
            source={require("../assets/iconsaxlinearclosecircle1.png")}
          />
          <LinearGradient
            style={[styles.btn, styles.btnShadowBox]}
            locations={[0, 1]}
            colors={["#6c1b9e", "#ff077e"]}
            useAngle={true}
            angle={-90}
          >
            <Text style={[styles.label, styles.titleFlexBox]}>Add Guest</Text>
          </LinearGradient>
        </View>
        <SuccessModel />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconPosition: {
    top: 0,
    left: 0,
  },
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
  leftTitleTypo: {
    textAlign: "left",
    fontFamily: FontFamily.typographyBodyMediumRegular,
  },
  magnifyingglassIconLayout: {
    height: 24,
    width: 24,
    overflow: "hidden",
  },
  titleFlexBox1: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  titleFlexBox: {
    textAlign: "center",
    color: Color.labelColorDarkPrimary,
  },
  iconLayout1: {
    maxWidth: "100%",
    height: 120,
    overflow: "hidden",
    flex: 1,
  },
  iconLayout: {
    marginLeft: 8,
    maxWidth: "100%",
    height: 120,
    overflow: "hidden",
    flex: 1,
  },
  rowLayout: {
    height: 120,
    flexDirection: "row",
    width: 375,
  },
  btnShadowBox: {
    backgroundColor: Color.appColorGradient,
    paddingVertical: Padding.p_xs,
    height: 40,
    elevation: 15,
    shadowRadius: 15,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    borderRadius: Border.br_11xl,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    paddingHorizontal: Padding.p_5xl,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  bgIcon: {
    width: 665,
    height: 1032,
    left: 0,
    position: "absolute",
  },
  leftTitle: {
    color: Color.appColorPerfectPink,
    display: "none",
    lineHeight: 26,
    fontSize: FontSize.textLargeBold_size,
    textAlign: "left",
    alignItems: "center",
    flex: 1,
  },
  iconsaxlinearhambergermenu: {
    marginLeft: 5,
    display: "none",
  },
  backIcon: {
    width: 19,
    height: 14,
    marginLeft: 5,
  },
  leftAccessory: {
    paddingLeft: Padding.p_5xl,
    paddingRight: Padding.p_4xs,
    alignItems: "center",
    left: 0,
  },
  title1: {
    fontSize: FontSize.size_2xl,
    fontWeight: "700",
    fontFamily: FontFamily.typographyBodySmallBold,
  },
  title: {
    right: 58,
    padding: Padding.p_4xs,
    flexDirection: "row",
    height: 42,
    top: "50%",
    marginTop: -21,
    justifyContent: "center",
  },
  title2: {
    textAlign: "right",
    opacity: 0.4,
    color: Color.labelColorDarkPrimary,
    fontFamily: FontFamily.typographyBodyMediumRegular,
    lineHeight: 26,
    fontSize: FontSize.textLargeBold_size,
    flex: 1,
  },
  magnifyingglassIcon: {
    marginLeft: 10,
    display: "none",
  },
  rightAccessory: {
    right: 0,
    paddingLeft: Padding.p_4xs,
    paddingRight: Padding.p_5xl,
    justifyContent: "flex-end",
    display: "none",
    alignItems: "center",
  },
  topnavigationContent: {
    marginLeft: -187.5,
    top: 44,
    left: "50%",
    height: 56,
    width: 375,
    position: "absolute",
  },
  photo01Icon: {
    borderRadius: Border.br_5xs,
  },
  photo02Icon: {
    borderRadius: Border.br_5xs,
  },
  row02: {
    marginTop: 8,
  },
  photos: {
    top: 111,
    height: 680,
    left: 0,
    position: "absolute",
  },
  statusBarIcon: {
    height: 44,
    width: 375,
    left: 0,
    position: "absolute",
    overflow: "hidden",
  },
  label: {
    lineHeight: 22,
    fontSize: FontSize.typographyHeadingMedium_size,
    fontFamily: FontFamily.typographyBodyMediumRegular,
    textAlign: "center",
  },
  form: {
    width: 327,
  },
  formWrapper: {
    top: 722,
    backgroundColor: Color.gray_1000,
    height: 90,
    paddingVertical: Padding.p_base,
    paddingHorizontal: Padding.p_5xl,
    alignItems: "center",
    left: 0,
    position: "absolute",
  },
  title3: {
    letterSpacing: 0,
    lineHeight: 22,
    fontFamily: FontFamily.bodyRegular,
    alignSelf: "stretch",
    fontSize: FontSize.typographyHeadingMedium_size,
  },
  typeYourProblem: {
    lineHeight: 24,
    color: Color.primaryAlmostGrey,
    fontSize: FontSize.typographyHeadingMedium_size,
  },
  form1: {
    backgroundColor: Color.gray_700,
    height: 287,
    padding: Padding.p_base,
    marginTop: 16,
    alignSelf: "stretch",
    borderRadius: Border.br_5xs,
    flexDirection: "row",
  },
  content: {
    borderColor: "rgba(60, 60, 67, 0.36)",
    borderBottomWidth: 0.5,
    paddingBottom: Padding.p_base,
    zIndex: 0,
    alignSelf: "stretch",
    borderStyle: "solid",
    alignItems: "center",
    overflow: "hidden",
  },
  iconsaxlinearclosecircle: {
    top: 8,
    left: 295,
    zIndex: 1,
    position: "absolute",
  },
  btn: {
    zIndex: 2,
    marginTop: 24,
    alignSelf: "stretch",
  },
  alert: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.gray_200,
    shadowColor: "rgba(27, 27, 27, 0.16)",
    shadowRadius: 16,
    elevation: 16,
    borderColor: "#fff",
    borderWidth: 1,
    paddingTop: Padding.p_5xl,
    paddingBottom: Padding.p_21xl,
    borderStyle: "solid",
    width: 327,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    paddingHorizontal: Padding.p_5xl,
    display: "none",
  },
  alertmodal: {
    backgroundColor: Color.gray_900,
    padding: Padding.p_13xl,
    width: 375,
    left: 0,
    top: 0,
    height: 812,
  },
  successphotoscreen: {
    backgroundColor: Color.primarySoBlack,
    width: "100%",
    overflow: "hidden",
    height: 812,
    flex: 1,
  },
});

export default SuccessPhotoScreen;
