import * as React from "react";
import {
  Image,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
  SafeAreaView,
} from "react-native";
import MenuCard from "../../components/MenuCard";
import { FontFamily, FontSize, Padding, Color } from "../../GlobalStyles";
import { useNavigation } from "@react-navigation/core";
import apis from "../../apis";
import useGlobalState from "../../stateManagement/hook";
import StateTypes from "../../stateManagement/StateTypes";
import loadApp from "../../navigation/loadApp";

const VendorSideNav = () => {
  const { navigate, toggleDrawer, closeDrawer } = useNavigation();
  const [token, setToken] = useGlobalState(
    StateTypes.token.key,
    StateTypes.token.default
  );
  const [user, setUser] = useGlobalState(
    StateTypes.user.key,
    StateTypes.user.default
  );

  const switchToHost = async () => {
    try {
      setToken("host");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await apis.device.deleteById(setToken);
  };

  return (
    <ScrollView
      style={{ backgroundColor: "#000" }}
      contentContainerStyle={styles.root}
    >
      <ImageBackground
        style={styles.bgIcon}
        resizeMode="cover"
        source={require("../../assets/bg11.png")}
      />
      <SafeAreaView style={styles.safeAreaView}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 18,
          }}
        >
          <TouchableOpacity onPress={() => navigate("Calendar")}>
            <Image
              style={styles.backIconLayout}
              resizeMode="cover"
              source={require("../../assets/back.png")}
            />
          </TouchableOpacity>
          <View style={styles.title}>
            <Text style={styles.title1}>Settings</Text>
          </View>
          <View style={{ width: 30, height: 30 }}></View>
        </View>
        <View style={styles.divider} />
        <View style={styles.settings}>
          <View>
            {/* <TouchableOpacity
            style={styles.touchableopacity}
            activeOpacity={0.2}
            onPress={() => navigate("EditAccount")}
          >
            <MenuCard
              icon={require("../../assets/iconsaxlinearbaghappy.png")}
              title="Your jobs"
              propWidth={327}
              propAlignSelf="unset"
            />
          </TouchableOpacity> */}
            {/* <TouchableOpacity
            style={styles.touchableopacity}
            activeOpacity={0.2}
            onPress={() => navigate("EditAccount")}
          >
            <MenuCard
              icon={require("../../assets/iconsaxlinearemptywallet.png")}
              title="Your Income"
              propWidth={327}
              propAlignSelf="unset"
            />
          </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.touchableopacity}
              activeOpacity={0.2}
              onPress={() => navigate("EditAccount")}
            >
              <MenuCard
                icon={require("../../assets/iconsaxlinearuser.png")}
                title="Account settings"
                propWidth={327}
                propAlignSelf="unset"
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
            style={styles.touchableopacity}
            activeOpacity={0.2}
            // onPress={() => navigate("EditAccount")}
          >
            <MenuCard
              icon={require("../../assets/iconsaxlinearcard.png")}
              title="Payment methods"
              propWidth={327}
              propAlignSelf="unset"
            />
          </TouchableOpacity> */}

            <TouchableOpacity
              style={styles.touchableopacity}
              activeOpacity={0.2}
              onPress={() => navigate("FAQ")}
            >
              <MenuCard
                icon={require("../../assets/question.png")}
                title="FAQ"
                propWidth={327}
                propAlignSelf="unset"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.touchableopacity}
              activeOpacity={0.2}
              onPress={() => navigate("Term")}
            >
              <MenuCard
                icon={require("../../assets/iconsaxlineardocumenttext.png")}
                title="Terms & Policy"
                propWidth={327}
                propAlignSelf="unset"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableopacity}
              activeOpacity={0.2}
              onPress={() => navigate("Privacy")}
            >
              <MenuCard
                icon={require("../../assets/iconsaxlinearshieldtick.png")}
                title="Privacy Policy"
                propWidth={327}
                propAlignSelf="unset"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.touchableopacity}
              activeOpacity={0.2}
              onPress={() => navigate("Report")}
            >
              <MenuCard
                icon={require("../../assets/iconsaxlinearflag.png")}
                title="Report problem"
                propWidth={327}
                propAlignSelf="unset"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.touchableopacity}
              activeOpacity={0.2}
              onPress={switchToHost}
            >
              <MenuCard
                icon={require("../../assets/iconsaxlineararrangehorizontalcircle.png")}
                title="Switch to host"
                propWidth={327}
                propAlignSelf="unset"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.touchableopacity, styles.logout]}
            activeOpacity={0.2}
            onPress={logout}
          >
            <MenuCard
              propMarginTop="unset"
              icon={require("../../assets/iconsaxlinearlogoutcurve.png")}
              title="Log out"
              propWidth="unset"
              propAlignSelf="stretch"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  title2Typo: {
    fontFamily: FontFamily.typographyBodyMediumRegular,
    lineHeight: 22,
    fontSize: FontSize.typographyHeadingMedium_size,
  },
  backIconLayout: {
    marginLeft: 15,
    height: 40,
    width: 40,
  },
  bgIcon: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  iconsaxlineardocumenttext: {
    width: 20,
    height: 20,
    overflow: "hidden",
  },
  termsPolicy: {
    marginLeft: 16,
    textAlign: "left",
    color: Color.labelColorDarkPrimary,
  },
  touchableopacity: {
    width: 327,
    paddingHorizontal: 0,
    paddingVertical: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  settings: {
    paddingHorizontal: Padding.p_5xl,
    justifyContent: "space-between",
    // height: "100%",
    flex: 1,
    marginTop: 20,
  },
  leftTitle: {
    fontSize: FontSize.textLargeBold_size,
    letterSpacing: 0,
    lineHeight: 22,
    fontFamily: FontFamily.bodyRegular,
    color: Color.defaultSystemBlueLight,
    display: "none",
    textAlign: "left",
    alignItems: "center",
    flex: 1,
  },
  iconsaxlinearhambergermenu: {
    display: "none",
    overflow: "hidden",
  },
  title1: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "700",
    fontFamily: FontFamily.typographyBodySmallBold,
    textAlign: "center",
    color: Color.labelColorDarkPrimary,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
  },
  title2: {
    color: Color.appColorPerfectPink,
    textAlign: "center",
  },
  divider: {
    borderStyle: "solid",
    borderColor: "rgba(77, 77, 77, 0.5)",
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 16,
  },
  logout: {
    marginBottom: 30,
  },
});

export default VendorSideNav;
