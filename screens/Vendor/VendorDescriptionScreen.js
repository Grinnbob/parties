import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ServicesCard from "../../components/ServicesCard";
import { useNavigation } from "@react-navigation/native";
import {
  Color,
  Padding,
  FontFamily,
  FontSize,
  Border,
} from "../../GlobalStyles";

const VendorDescriptionScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.vendordescriptionscreen}>
      {/* <Image
        style={styles.bgIcon}
        resizeMode="cover"
        source={require("../../assets/bg10.png")}
      /> */}
      <Image
        style={[styles.vendordescriptionscreenChild, styles.tabPosition]}
        resizeMode="cover"
        source={require("../../assets/rectangle-4568.png")}
      />
      <LinearGradient
        style={[styles.vendorDesc, styles.pressableShadowBox]}
        locations={[0, 1]}
        colors={["#000", "rgba(0, 0, 0, 0)"]}
        useAngle={true}
        angle={180}
      >
        <View>
          <Text style={[styles.vendorDescription, styles.title1Typo]}>
            Vendor Description
          </Text>
          <Text
            style={[styles.bestTexasBbq, styles.textTypo]}
          >{`Best texas BBQ around! Taste so good, make you wanna slap yo mama!

We've got it all! BBQ pit, lechon, beef brisket. Savory smoked for hours! Everything comes with ample homestyle sides, mash potatoes, corn bread, mac and cheese, and even cole slaw! Hire us today, we have great pricing!`}</Text>
        </View>
        <LinearGradient
          style={styles.btn}
          locations={[0, 1]}
          colors={["#6c1b9e", "#ff077e"]}
          useAngle={true}
          angle={-90}
        >
          <Pressable style={[styles.pressable, styles.iconLayout1]}>
            <Text style={[styles.label, styles.labelTypo]}>Call</Text>
          </Pressable>
        </LinearGradient>
        <View style={styles.foodParty}>
          <View style={styles.partyRental}>
            <View style={styles.foodParent}>
              <Text style={[styles.vendorDescription, styles.title1Typo]}>
                Food
              </Text>
              <Text style={[styles.flexiblePayments, styles.textTypo]}>
                Flexible Payments
              </Text>
            </View>
            <ServicesCard
              table10Chairs="2 Table + 10 Chairs"
              startingAt="Starting at"
            />
            <ServicesCard
              table10Chairs="BBQ Combo 1 + Sides"
              startingAt="Starting at"
            />
          </View>
          <View style={styles.food1}>
            <View style={styles.foodParent}>
              <Text style={[styles.vendorDescription, styles.title1Typo]}>
                Party Rental
              </Text>
              <Text style={[styles.flexiblePayments, styles.textTypo]}>
                Flexible Payments
              </Text>
            </View>
            <ServicesCard
              table10Chairs="Texas Cowboy Theme"
              startingAt="Custom Packaged"
            />
            <ServicesCard
              table10Chairs="Astronaut Package"
              startingAt="Custom Packaged"
            />
          </View>
        </View>
      </LinearGradient>
      <View style={styles.user}>
        <Image
          style={styles.userChild}
          resizeMode="cover"
          source={require("../../assets/ellipse-3.png")}
        />
        <View style={[styles.nameParent, styles.parentLayout]}>
          <View style={styles.name}>
            <Text style={styles.allAmericanBbq}>All American BBQ Truck</Text>
          </View>
          <View style={[styles.frameParent, styles.parentLayout]}>
            <View>
              <View style={styles.starsParent}>
                <View style={[styles.stars, styles.tabsFlexBox]}>
                  <Image
                    style={styles.vectorIconLayout}
                    resizeMode="cover"
                    source={require("../../assets/vector9.png")}
                  />
                  <Image
                    style={[styles.vectorIcon1, styles.vectorIconLayout]}
                    resizeMode="cover"
                    source={require("../../assets/vector10.png")}
                  />
                  <Image
                    style={[styles.vectorIcon1, styles.vectorIconLayout]}
                    resizeMode="cover"
                    source={require("../../assets/vector11.png")}
                  />
                  <Image
                    style={[styles.vectorIcon1, styles.vectorIconLayout]}
                    resizeMode="cover"
                    source={require("../../assets/vector12.png")}
                  />
                  <Image
                    style={[styles.vectorIcon1, styles.vectorIconLayout]}
                    resizeMode="cover"
                    source={require("../../assets/vector13.png")}
                  />
                </View>
                <Text style={[styles.text, styles.textTypo]}>4.1</Text>
              </View>
              <Text style={[styles.serviced86Parties, styles.textTypo]}>
                Serviced 86 parties
              </Text>
            </View>
            <Image
              style={styles.iconsaxlinearshare}
              resizeMode="cover"
              source={require("../../assets/iconsaxlinearshare.png")}
            />
            <Image
              style={[styles.iconsaxlinearexport, styles.houseIconLayout]}
              resizeMode="cover"
              source={require("../../assets/iconsaxlinearexport1.png")}
            />
          </View>
        </View>
      </View>
      <View style={[styles.tab, styles.tabPosition]}>
        <View style={[styles.homeindicator, styles.homeindicatorPosition]}>
          <View style={[styles.homeIndicator, styles.homeindicatorPosition]} />
        </View>
        <View style={[styles.tabs, styles.tabsLayout]}>
          <View style={styles.tabbarTab}>
            <Image
              style={[styles.houseIcon, styles.houseIconLayout]}
              resizeMode="cover"
              source={require("../../assets/house.png")}
            />
            <Image
              style={[styles.houseIcon1, styles.iconLayout]}
              resizeMode="cover"
              source={require("../../assets/house1.png")}
            />
            <Image
              style={[styles.iconsaxlinearexport, styles.houseIconLayout]}
              resizeMode="cover"
              source={require("../../assets/iconsaxlinearhome2.png")}
            />
            <Image
              style={[styles.iconsaxboldhome2, styles.houseIconLayout]}
              resizeMode="cover"
              source={require("../../assets/iconsaxboldhome2.png")}
            />
            <Text style={styles.home}>Home</Text>
          </View>
          <View style={styles.tabbarTab}>
            <Image
              style={[styles.iconsaxlinearexport, styles.houseIconLayout]}
              resizeMode="cover"
              source={require("../../assets/iconsaxlinearlampon.png")}
            />
            <Text style={[styles.inspirations, styles.servicesTypo]}>
              Inspirations
            </Text>
          </View>
          <View style={styles.tabbarTab2}>
            <Text
              style={[styles.planParty, styles.planPartyPosition]}
            >{`Plan Party `}</Text>
            <Image
              style={styles.iconsaxbulkaddcircle}
              resizeMode="cover"
              source={require("../../assets/iconsaxbulkaddcircle1.png")}
            />
          </View>
          <View style={styles.tabbarTab}>
            <Image
              style={[styles.iconsaxlinearexport, styles.houseIconLayout]}
              resizeMode="cover"
              source={require("../../assets/iconsaxlinearbaghappy2.png")}
            />
            <Text style={[styles.services, styles.titleClr]}>Services</Text>
          </View>
          <View style={styles.tabbarTab}>
            <Image
              style={[styles.iconsaxlinearexport, styles.houseIconLayout]}
              resizeMode="cover"
              source={require("../../assets/iconsaxlinearparty.png")}
            />
            <Text style={[styles.inspirations, styles.servicesTypo]}>
              My Party
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.topnavigationContent, styles.planPartyPosition]}>
        <View style={[styles.leftAccessory, styles.header]}>
          <Text style={styles.leftTitle}>Prev. Title</Text>
          <Image
            style={[styles.iconsaxlinearhambergermenu, styles.backLayout]}
            resizeMode="cover"
            source={require("../../assets/iconsaxlinearhambergermenu.png")}
          />
          <TouchableOpacity
            style={styles.backLayout}
            activeOpacity={0.2}
            onPress={() => navigation.navigate("HomeScreen")}
          >
            <Image
              style={styles.iconLayout1}
              resizeMode="cover"
              source={require("../../assets/back.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.title}>
          <Text
            style={[styles.title1, styles.title1Typo]}
          >{`Food & Beverages`}</Text>
        </View>
        <View style={[styles.rightAccessory, styles.header]}>
          <Text style={[styles.title2, styles.titleClr]}>Label</Text>
          <Text style={[styles.title3, styles.titleClr]}>Invite</Text>
          <Image
            style={[styles.iconsaxlinearshoppingcart, styles.houseIconLayout]}
            resizeMode="cover"
            source={require("../../assets/iconsaxlinearshoppingcart.png")}
          />
          <Image
            style={[styles.iconsaxlinearshoppingcart, styles.houseIconLayout]}
            resizeMode="cover"
            source={require("../../assets/magnifyGlass.png")}
          />
          <Image
            style={[styles.iconsaxlinearshoppingcart, styles.houseIconLayout]}
            resizeMode="cover"
            source={require("../../assets/x.png")}
          />
          <Image
            style={[styles.iconsaxlinearshoppingcart, styles.houseIconLayout]}
            resizeMode="cover"
            source={require("../../assets/iconsaxlinearuseradd.png")}
          />
          <Image
            style={[styles.iconsaxlinearshoppingcart, styles.houseIconLayout]}
            resizeMode="cover"
            source={require("../../assets/iconsaxlinearexport.png")}
          />
          <Image
            style={[styles.iconsaxlinearheart, styles.houseIconLayout]}
            resizeMode="cover"
            source={require("../../assets/iconsaxlinearheart.png")}
          />
          <Image
            style={[styles.dotsthreeIcon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../../assets/dotsthree.png")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabPosition: {
    width: 375,
    left: 0,
    position: "absolute",
  },
  pressableShadowBox: {
    backgroundColor: Color.appColorGradient,
    paddingHorizontal: Padding.p_5xl,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    justifyContent: "center",
  },
  title1Typo: {
    fontFamily: FontFamily.typographyBodySmallBold,
    fontWeight: "700",
    color: Color.labelColorDarkPrimary,
  },
  textTypo: {
    fontFamily: FontFamily.typographyBodyMediumLight,
    fontWeight: "300",
  },
  iconLayout1: {
    height: "100%",
    width: "100%",
  },
  labelTypo: {
    fontFamily: FontFamily.typographyBodyMediumRegular,
    lineHeight: 22,
    fontSize: FontSize.typographyHeadingMedium_size,
  },
  parentLayout: {
    width: 235,
    position: "absolute",
  },
  tabsFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  vectorIconLayout: {
    height: 11,
    width: 11,
  },
  houseIconLayout: {
    height: 24,
    width: 24,
  },
  homeindicatorPosition: {
    left: "50%",
    position: "absolute",
  },
  tabsLayout: {
    height: 56,
    left: "50%",
    marginLeft: -187.5,
    width: 375,
  },
  iconLayout: {
    height: 32,
    width: 32,
  },
  servicesTypo: {
    fontFamily: FontFamily.sFProDisplayRegular,
    fontSize: FontSize.typographyBodyXSmallRegular_size,
  },
  planPartyPosition: {
    top: 44,
    position: "absolute",
  },
  titleClr: {
    color: Color.appColorPerfectPink,
    textAlign: "center",
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
  bgIcon: {
    width: 665,
    left: 0,
    top: 0,
    position: "absolute",
    height: 1605,
  },
  vendordescriptionscreenChild: {
    height: 400,
    top: 0,
  },
  vendorDescription: {
    textAlign: "left",
    color: Color.labelColorDarkPrimary,
    lineHeight: 22,
    fontSize: FontSize.typographyHeadingMedium_size,
    fontWeight: "700",
  },
  bestTexasBbq: {
    color: Color.primaryAlmostWhite,
    width: 329,
    marginTop: 15.27,
    lineHeight: 20,
    fontSize: FontSize.typographyBodyMediumBold_size,
    fontWeight: "300",
    textAlign: "left",
  },
  label: {
    textAlign: "center",
    color: Color.labelColorDarkPrimary,
  },
  pressable: {
    borderRadius: Border.br_11xl,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowRadius: 15,
    elevation: 15,
    paddingVertical: Padding.p_xs,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Color.appColorGradient,
    paddingHorizontal: Padding.p_5xl,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    justifyContent: "center",
  },
  btn: {
    marginTop: 24,
    height: 40,
    width: 327,
  },
  flexiblePayments: {
    fontSize: FontSize.typographyBodySmallBold_size,
    lineHeight: 17,
    textAlign: "right",
    color: Color.primaryAlmostGrey,
  },
  foodParent: {
    justifyContent: "space-between",
    alignSelf: "stretch",
    alignItems: "center",
    flexDirection: "row",
  },
  partyRental: {
    alignSelf: "stretch",
  },
  food1: {
    marginTop: 32,
    alignSelf: "stretch",
  },
  foodParty: {
    alignSelf: "stretch",
    marginTop: 24,
  },
  vendorDesc: {
    top: 332,
    borderTopLeftRadius: Border.br_13xl,
    borderTopRightRadius: Border.br_13xl,
    shadowColor: "rgba(27, 27, 27, 0.16)",
    shadowRadius: 16,
    elevation: 16,
    paddingTop: Padding.p_61xl,
    paddingBottom: Padding.p_21xl,
    width: 375,
    left: 0,
    position: "absolute",
  },
  userChild: {
    width: 76,
    height: 76,
    left: 0,
    top: 0,
    position: "absolute",
  },
  allAmericanBbq: {
    fontSize: FontSize.typographyMediumTitle_size,
    lineHeight: 28,
    fontFamily: FontFamily.textLargeBold,
    textAlign: "center",
    color: Color.labelColorDarkPrimary,
    fontWeight: "700",
  },
  name: {
    width: 219,
    alignItems: "center",
    flexDirection: "row",
    left: 0,
    top: 0,
    position: "absolute",
  },
  vectorIcon1: {
    marginLeft: 3.82,
  },
  stars: {
    top: 2,
    alignItems: "center",
    flexDirection: "row",
    left: 0,
  },
  text: {
    top: -2,
    left: 80,
    width: 19,
    height: 19,
    textAlign: "center",
    lineHeight: 20,
    fontSize: FontSize.typographyBodyMediumBold_size,
    fontWeight: "300",
    color: Color.labelColorDarkPrimary,
    position: "absolute",
  },
  starsParent: {
    width: 114,
    height: 16,
  },
  serviced86Parties: {
    marginTop: 1.91,
    color: Color.primaryAlmostGrey,
    lineHeight: 20,
    fontSize: FontSize.typographyBodyMediumBold_size,
    fontWeight: "300",
    textAlign: "left",
  },
  iconsaxlinearshare: {
    borderRadius: 8,
    width: 31,
    height: 31,
    display: "none",
    overflow: "hidden",
  },
  iconsaxlinearexport: {
    overflow: "hidden",
  },
  frameParent: {
    top: 46,
    justifyContent: "space-between",
    flexDirection: "row",
    left: 0,
  },
  nameParent: {
    top: 5,
    left: 92,
    height: 85,
  },
  user: {
    top: 294,
    left: 24,
    height: 90,
    width: 327,
    position: "absolute",
  },
  homeIndicator: {
    marginLeft: -66.5,
    bottom: 6,
    borderRadius: Border.br_81xl,
    width: 134,
    height: 5,
    left: "50%",
    backgroundColor: Color.labelColorDarkPrimary,
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
  },
  houseIcon1: {
    display: "none",
  },
  iconsaxboldhome2: {
    display: "none",
    overflow: "hidden",
  },
  home: {
    fontSize: FontSize.typographyBodyXSmallRegular_size,
    fontFamily: FontFamily.textLargeBold,
    color: Color.primaryAlmostGrey,
    textAlign: "center",
    fontWeight: "700",
  },
  tabbarTab: {
    paddingTop: Padding.p_xs,
    justifyContent: "space-between",
    alignSelf: "stretch",
    alignItems: "center",
    flex: 1,
  },
  inspirations: {
    color: Color.primaryAlmostGrey,
    textAlign: "center",
  },
  planParty: {
    left: 17,
    fontFamily: FontFamily.sFProDisplayRegular,
    fontSize: FontSize.typographyBodyXSmallRegular_size,
    color: Color.primaryAlmostGrey,
    textAlign: "center",
  },
  iconsaxbulkaddcircle: {
    top: -32,
    left: 3,
    width: 64,
    height: 64,
    position: "absolute",
  },
  tabbarTab2: {
    alignSelf: "stretch",
    flex: 1,
  },
  services: {
    fontFamily: FontFamily.sFProDisplayRegular,
    fontSize: FontSize.typographyBodyXSmallRegular_size,
  },
  tabs: {
    marginTop: -42,
    top: "50%",
    borderTopLeftRadius: Border.br_base,
    borderTopRightRadius: Border.br_base,
    paddingHorizontal: Padding.p_5xs,
    paddingVertical: 0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
  },
  tab: {
    top: 1928,
    backgroundColor: Color.gray_800,
    height: 84,
    display: "none",
  },
  leftTitle: {
    fontSize: FontSize.textLargeBold_size,
    letterSpacing: 0,
    lineHeight: 22,
    fontFamily: FontFamily.bodyRegular,
    color: Color.defaultSystemBlueLight,
    display: "none",
    alignItems: "center",
    textAlign: "left",
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
  title1: {
    fontSize: FontSize.typographyHeadingLarge_size,
    lineHeight: 25,
    textAlign: "center",
    color: Color.labelColorDarkPrimary,
  },
  title: {
    left: 163,
    width: 49,
    height: 42,
    top: 7,
    display: "none",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
  },
  title2: {
    display: "none",
    fontFamily: FontFamily.typographyBodyMediumRegular,
    lineHeight: 22,
    fontSize: FontSize.typographyHeadingMedium_size,
  },
  title3: {
    fontSize: FontSize.size_mini,
    fontWeight: "600",
    fontFamily: FontFamily.montserratSemibold,
    marginLeft: 10,
    display: "none",
  },
  iconsaxlinearshoppingcart: {
    marginLeft: 10,
    display: "none",
    overflow: "hidden",
  },
  iconsaxlinearheart: {
    marginLeft: 10,
    overflow: "hidden",
  },
  dotsthreeIcon: {
    marginLeft: 10,
    overflow: "hidden",
  },
  rightAccessory: {
    left: 245,
    paddingLeft: Padding.p_4xs,
    paddingRight: Padding.p_5xl,
    justifyContent: "flex-end",
  },
  topnavigationContent: {
    height: 56,
    left: "50%",
    marginLeft: -187.5,
    width: 375,
  },
  vendordescriptionscreen: {
    overflow: "hidden",
    height: 1605,
    width: "100%",
    flex: 1,
    backgroundColor: Color.labelColorDarkPrimary,
  },
});

export default VendorDescriptionScreen;
