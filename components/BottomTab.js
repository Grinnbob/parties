import * as React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { FontFamily, FontSize, Border, Color, Padding } from "../GlobalStyles";

const BottomTab = () => {
  return (
    <View style={styles.tab}>
      <View style={[styles.homeindicator, styles.tabsPosition]}>
        <View style={[styles.homeIndicator, styles.tabsPosition]} />
      </View>
      <View style={[styles.tabs, styles.tabsPosition]}>
        <View style={[styles.tabbarTab, styles.tabbarFlexBox]}>
          <Image
            style={styles.houseIcon}
            resizeMode="cover"
            source={require("../assets/house.png")}
          />
          <Image
            style={styles.houseIcon1}
            resizeMode="cover"
            source={require("../assets/house1.png")}
          />
          <Image
            style={styles.iconsaxboldhome2Layout}
            resizeMode="cover"
            source={require("../assets/iconsaxlinearhome2.png")}
          />
          <Image
            style={[styles.iconsaxboldhome2, styles.iconsaxboldhome2Layout]}
            resizeMode="cover"
            source={require("../assets/iconsaxboldhome2.png")}
          />
          <Text style={styles.home}>Home</Text>
        </View>
        <View style={[styles.tabbarTab, styles.tabbarFlexBox]}>
          <Image
            style={styles.iconsaxboldhome2Layout}
            resizeMode="cover"
            source={require("../assets/iconsaxlinearlampon.png")}
          />
          <Text style={[styles.inspirations, styles.servicesTypo]}>
            Inspirations
          </Text>
        </View>
        <View style={styles.tabbarFlexBox}>
          <Text
            style={[styles.planParty, styles.servicesTypo]}
          >{`Plan Party `}</Text>
          <Image
            style={styles.iconsaxbulkaddcircle}
            resizeMode="cover"
            source={require("../assets/iconsaxbulkaddcircle.png")}
          />
        </View>
        <View style={[styles.tabbarTab, styles.tabbarFlexBox]}>
          <Image
            style={styles.iconsaxboldhome2Layout}
            resizeMode="cover"
            source={require("../assets/iconsaxlinearbaghappy2.png")}
          />
          <Text style={[styles.services, styles.servicesTypo]}>Services</Text>
        </View>
        <View style={[styles.tabbarTab, styles.tabbarFlexBox]}>
          <Image
            style={styles.iconsaxboldhome2Layout}
            resizeMode="cover"
            source={require("../assets/iconsaxlinearparty.png")}
          />
          <Text style={[styles.inspirations, styles.servicesTypo]}>
            My Party
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsPosition: {
    left: "50%",
    position: "absolute",
  },
  tabbarFlexBox: {
    flex: 1,
    alignSelf: "stretch",
  },
  iconsaxboldhome2Layout: {
    overflow: "hidden",
    height: 24,
    width: 24,
  },
  servicesTypo: {
    fontFamily: FontFamily.sFProDisplayRegular,
    textAlign: "center",
    fontSize: FontSize.typographyBodyXSmallRegular_size,
  },
  homeIndicator: {
    marginLeft: -66.5,
    bottom: 6,
    borderRadius: Border.br_81xl,
    backgroundColor: Color.labelColorDarkPrimary,
    width: 134,
    height: 5,
  },
  homeindicator: {
    top: 56,
    height: 28,
    marginLeft: -187.5,
    left: "50%",
    width: 375,
  },
  houseIcon: {
    display: "none",
    height: 24,
    width: 24,
  },
  houseIcon1: {
    width: 32,
    height: 32,
    display: "none",
  },
  iconsaxboldhome2: {
    display: "none",
  },
  home: {
    fontWeight: "700",
    fontFamily: FontFamily.textLargeBold,
    textAlign: "center",
    fontSize: FontSize.typographyBodyXSmallRegular_size,
    color: Color.primaryAlmostGrey,
  },
  tabbarTab: {
    paddingTop: Padding.p_xs,
    justifyContent: "space-between",
    alignItems: "center",
  },
  inspirations: {
    color: Color.primaryAlmostGrey,
    fontFamily: FontFamily.sFProDisplayRegular,
  },
  planParty: {
    top: 44,
    left: 17,
    color: Color.primaryAlmostGrey,
    fontFamily: FontFamily.sFProDisplayRegular,
    position: "absolute",
  },
  iconsaxbulkaddcircle: {
    top: -38,
    left: -17,
    width: 104,
    height: 104,
    position: "absolute",
  },
  services: {
    color: Color.appColorPerfectPink,
  },
  tabs: {
    marginTop: -42,
    top: "50%",
    borderTopLeftRadius: Border.br_base,
    borderTopRightRadius: Border.br_base,
    height: 56,
    flexDirection: "row",
    paddingHorizontal: Padding.p_5xs,
    paddingVertical: 0,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -187.5,
    left: "50%",
    width: 375,
  },
  tab: {
    top: 793,
    left: 0,
    backgroundColor: Color.gray_500,
    height: 84,
    width: 375,
    position: "absolute",
  },
});

export default BottomTab;
