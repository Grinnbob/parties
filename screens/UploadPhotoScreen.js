import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MidGradientButton from "../components/MidGradientButton";
import TopNavigationContent from "../components/TopNavigationContent";
import { Border, Color, Padding } from "../GlobalStyles";

const UploadPhotoScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.uploadphotoscreen}>
      <Image
        style={[styles.bgIcon, styles.bgIconPosition]}
        resizeMode="cover"
        source={require("../assets/bg1.png")}
      />
      <View style={[styles.photos, styles.bgIconPosition]}>
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
        style={styles.statusBarIcon}
        resizeMode="cover"
        source={require("../assets/status-bar.png")}
      />
      <View style={[styles.formWrapper, styles.bgIconPosition]}>
        <MidGradientButton
          onFormPress={() => navigation.navigate("SuccessPhotoScreen")}
          label="Upload"
        />
      </View>
      <TopNavigationContent title={`Upload photos & videos`} />
    </View>
  );
};

const styles = StyleSheet.create({
  bgIconPosition: {
    left: 0,
    position: "absolute",
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
    flexDirection: "row",
    height: 120,
    width: 375,
  },
  bgIcon: {
    width: 665,
    height: 1032,
    top: 0,
    left: 0,
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
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  formWrapper: {
    top: 722,
    backgroundColor: Color.gray_1000,
    height: 90,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_base,
    alignItems: "center",
    left: 0,
    position: "absolute",
  },
  uploadphotoscreen: {
    backgroundColor: Color.primarySoBlack,
    width: "100%",
    height: 812,
    overflow: "hidden",
    flex: 1,
  },
});

export default UploadPhotoScreen;
