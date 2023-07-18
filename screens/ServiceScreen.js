import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import SearchServiceCard from "../components/SearchServiceCard";
import BottomTab from "../components/BottomTab";
import { Padding, Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const ServiceScreen = () => {
  return (
    <View style={styles.servicescreen}>
      <Image
        style={styles.bgIcon}
        resizeMode="cover"
        source={require("../assets/bg8.png")}
      />
      <View style={styles.container}>
        <View style={[styles.search, styles.searchSpaceBlock]}>
          <View style={styles.left}>
            <Image
              style={styles.magnifyingglassIconLayout}
              resizeMode="cover"
              source={require("../assets/magnifyingglass1.png")}
            />
            <Text style={[styles.title, styles.titleTypo]}>Tacos</Text>
          </View>
        </View>
        <View style={[styles.search1, styles.searchSpaceBlock]}>
          <View style={styles.left1}>
            <Text style={[styles.title1, styles.titleTypo]}>Tacos</Text>
            <Image
              style={styles.magnifyingglassIconLayout}
              resizeMode="cover"
              source={require("../assets/magnifyingglass1.png")}
            />
          </View>
          <Image
            style={[
              styles.iconsaxlinearsetting4,
              styles.magnifyingglassIconLayout,
            ]}
            resizeMode="cover"
            source={require("../assets/iconsaxlinearsetting4.png")}
          />
        </View>
        <View style={styles.subNav}>
          <View style={styles.links}>
            <View style={[styles.iconsaxlinearfilter, styles.linkFlexBox]}>
              <Image
                style={styles.vectorIcon}
                resizeMode="cover"
                source={require("../assets/vector3.png")}
              />
            </View>
            <View style={[styles.linksChild, styles.link1Border]} />
            <View style={styles.links1}>
              <LinearGradient
                style={[styles.link, styles.linkFlexBox]}
                locations={[0, 1]}
                colors={["#6c1b9e", "#ff077e"]}
                useAngle={true}
                angle={-90}
              >
                <View style={styles.iconLayout}>
                  <View style={styles.square} />
                </View>
                <Text style={[styles.label, styles.titleTypo]}>Latest</Text>
                <View style={[styles.iconRight, styles.iconLayout]}>
                  <View style={styles.square} />
                </View>
              </LinearGradient>
              <View style={[styles.link1, styles.link1Border]}>
                <View style={styles.iconLayout}>
                  <View style={styles.square} />
                </View>
                <Text style={[styles.label1, styles.labelClr]}>Trending</Text>
                <View style={[styles.iconRight, styles.iconLayout]}>
                  <View style={styles.square} />
                </View>
              </View>
              <View style={[styles.link1, styles.link1Border]}>
                <View style={styles.iconLayout}>
                  <View style={styles.square} />
                </View>
                <Text style={[styles.label1, styles.labelClr]}>Mixologist</Text>
                <View style={[styles.iconRight, styles.iconLayout]}>
                  <View style={styles.square} />
                </View>
              </View>
              <View style={[styles.link1, styles.link1Border]}>
                <View style={styles.iconLayout}>
                  <View style={styles.square} />
                </View>
                <Text style={[styles.label3, styles.label3Typo]}>
                  Taco Truck
                </Text>
                <View style={[styles.iconRight, styles.iconLayout]}>
                  <View style={styles.square} />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.container1}>
          <SearchServiceCard
            imgBg={require("../assets/imgbg.png")}
            manuelsRentals="Manuel’s Rentals"
          />
          <SearchServiceCard
            cardsMarginTop={16}
            imgBg={require("../assets/imgbg1.png")}
            manuelsRentals="Vendor’s name"
            btnShadowOffset="unset"
          />
          <SearchServiceCard
            cardsMarginTop={16}
            imgBg={require("../assets/imgbg2.png")}
            manuelsRentals="Vendor’s name"
            btnShadowOffset="unset"
          />
        </View>
      </View>
      <BottomTab />
      <View style={styles.topnavigationContent}>
        <View style={[styles.leftAccessory, styles.accessoryPosition]}>
          <Text style={styles.leftTitle}>Prev. Title</Text>
          <Image
            style={[styles.iconsaxlinearhambergermenu, styles.backIconLayout]}
            resizeMode="cover"
            source={require("../assets/iconsaxlinearhambergermenu.png")}
          />
          <Image
            style={styles.backIconLayout}
            resizeMode="cover"
            source={require("../assets/back.png")}
          />
        </View>
        <View style={styles.title2}>
          <Text style={styles.title3}>{`Food & Beverages`}</Text>
        </View>
        <View style={[styles.rightAccessory, styles.accessoryPosition]}>
          <Text style={[styles.title4, styles.label3Typo]}>Label</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchSpaceBlock: {
    paddingVertical: Padding.p_xs,
    backgroundColor: Color.gray_300,
    flexDirection: "row",
    width: 330,
    borderRadius: Border.br_81xl,
    alignItems: "center",
    paddingHorizontal: Padding.p_5xl,
  },
  titleTypo: {
    fontFamily: FontFamily.typographyBodyMediumLight,
    fontWeight: "300",
  },
  magnifyingglassIconLayout: {
    height: 24,
    width: 24,
    overflow: "hidden",
  },
  linkFlexBox: {
    height: 34,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  link1Border: {
    borderColor: "#232323",
    borderStyle: "solid",
    marginLeft: 8,
  },
  iconLayout: {
    height: 19,
    width: 19,
    display: "none",
    overflow: "hidden",
  },
  labelClr: {
    color: Color.primaryAlmostGrey,
    marginLeft: 8,
  },
  label3Typo: {
    fontFamily: FontFamily.typographyBodyMediumRegular,
    textAlign: "center",
  },
  accessoryPosition: {
    paddingBottom: Padding.p_4xs,
    paddingTop: Padding.p_4xs,
    width: 130,
    height: 42,
    top: 7,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
  },
  backIconLayout: {
    marginLeft: 5,
    height: 40,
    width: 40,
  },
  bgIcon: {
    top: 0,
    width: 665,
    height: 1052,
    left: 0,
    position: "absolute",
  },
  title: {
    marginLeft: 8,
    textAlign: "left",
    color: Color.labelColorDarkPrimary,
    lineHeight: 20,
    fontSize: FontSize.typographyBodyMediumBold_size,
    fontWeight: "300",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  search: {
    shadowColor: "rgba(27, 27, 27, 0.16)",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 16,
    elevation: 16,
    shadowOpacity: 1,
  },
  title1: {
    fontSize: FontSize.size_mini,
    textAlign: "left",
    color: Color.labelColorDarkPrimary,
  },
  left1: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconsaxlinearsetting4: {
    display: "none",
    marginLeft: 8,
  },
  search1: {
    marginTop: 16,
    display: "none",
  },
  vectorIcon: {
    height: 21,
    width: 19,
  },
  iconsaxlinearfilter: {
    borderRadius: Border.br_5xs,
    paddingTop: Padding.p_7xs,
    paddingRight: Padding.p_5xs,
    paddingBottom: Padding.p_7xs,
  },
  linksChild: {
    borderRightWidth: 1,
    width: 1,
    alignSelf: "stretch",
  },
  square: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: 3,
    backgroundColor: Color.primary500Main,
    opacity: 0.2,
    position: "absolute",
    width: "100%",
  },
  label: {
    textAlign: "center",
    marginLeft: 8,
    color: Color.labelColorDarkPrimary,
    lineHeight: 20,
    fontSize: FontSize.typographyBodyMediumBold_size,
    fontWeight: "300",
  },
  iconRight: {
    marginLeft: 8,
  },
  link: {
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_7xs,
    backgroundColor: Color.appColorGradient,
    borderRadius: Border.br_81xl,
    height: 34,
    overflow: "hidden",
  },
  label1: {
    textAlign: "center",
    fontFamily: FontFamily.typographyBodyMediumLight,
    fontWeight: "300",
    lineHeight: 20,
    fontSize: FontSize.typographyBodyMediumBold_size,
  },
  link1: {
    borderWidth: 1,
    paddingHorizontal: Padding.p_xs,
    height: 34,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Padding.p_5xs,
    borderStyle: "solid",
    borderRadius: Border.br_81xl,
    overflow: "hidden",
  },
  label3: {
    color: Color.primaryAlmostGrey,
    marginLeft: 8,
    fontSize: FontSize.size_mini,
  },
  links1: {
    paddingLeft: Padding.p_5xs,
    marginLeft: 8,
    flexDirection: "row",
  },
  links: {
    flexDirection: "row",
    width: 330,
    alignItems: "center",
  },
  subNav: {
    paddingHorizontal: 0,
    justifyContent: "center",
    paddingVertical: Padding.p_5xs,
    alignSelf: "stretch",
    marginTop: 16,
  },
  container1: {
    alignSelf: "stretch",
    marginTop: 16,
  },
  container: {
    top: 108,
    paddingVertical: 0,
    alignItems: "center",
    paddingHorizontal: Padding.p_5xl,
    width: 375,
    left: 0,
    position: "absolute",
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
  leftAccessory: {
    paddingLeft: Padding.p_base,
    paddingRight: Padding.p_4xs,
    left: 0,
  },
  title3: {
    fontSize: FontSize.typographyHeadingLarge_size,
    lineHeight: 25,
    fontWeight: "700",
    fontFamily: FontFamily.typographyBodySmallBold,
    textAlign: "center",
    color: Color.labelColorDarkPrimary,
  },
  title2: {
    left: 163,
    width: 49,
    height: 42,
    top: 7,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
  },
  title4: {
    fontSize: FontSize.typographyHeadingMedium_size,
    lineHeight: 22,
    color: Color.appColorPerfectPink,
  },
  rightAccessory: {
    left: 245,
    paddingLeft: Padding.p_4xs,
    paddingRight: Padding.p_5xl,
    justifyContent: "flex-end",
    display: "none",
  },
  topnavigationContent: {
    marginLeft: -187.5,
    top: 44,
    left: "50%",
    height: 56,
    width: 375,
    position: "absolute",
  },
  servicescreen: {
    backgroundColor: Color.primarySoBlack,
    height: 877,
    overflow: "hidden",
    width: "100%",
    flex: 1,
  },
});

export default ServiceScreen;
