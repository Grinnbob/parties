import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import InspirationCard from "../../components/InspirationCard";
import { useNavigation } from "@react-navigation/core";
import {
  Color,
  FontFamily,
  FontSize,
  Padding,
  Border,
} from "../../GlobalStyles";
import { HStack, Select } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import useGlobalState from "../../stateManagement/hook";
import StateTypes from "../../stateManagement/StateTypes";
import apis from "../../apis";

const VendorHomeScreen = () => {
  const { navigate, toggleDrawer } = useNavigation();

  const [user, setUser] = useGlobalState(
    StateTypes.user.key,
    StateTypes.user.default
  );
  const [vendorInfo, setVendorInfo] = useState([]);
  const [notification, setNotification] = useState(0);
  const [filter, setFilter] = useState("Last 30 days");

  useEffect(() => {
    grabVendorInfo();
    grabNotification();
  }, [user]);

  const grabVendorInfo = async () => {
    const res = await apis.vendor.getAll({ UserId: user.id });
    setVendorInfo(res.data);
  };

  const grabNotification = async () => {
    const res = await apis.notificationControl.getAll({ UserId: user.id });
    if (res && res.success) {
      setNotification(res.length);
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: "#000" }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View style={[styles.vendorhomescreen, styles.iconLayout]}>
        <Image
          style={[styles.background, styles.bgIconPosition]}
          resizeMode="cover"
          source={require("../../assets/bg4.png")}
        />
        <View style={[styles.alertmodalbg, styles.alertmodalbgLayout]} />
        <View style={styles.topnavigationContent}>
          <View style={styles.leftAccessory}>
            <TouchableOpacity
              style={styles.magnifyingglass}
              activeOpacity={0.2}
              onPress={toggleDrawer}
            >
              <Image
                style={styles.xIconLayout}
                resizeMode="cover"
                source={require("../../assets/iconsaxlinearhambergermenu1.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.title1}>
            <Text style={styles.title2}>
              <Text style={styles.textTypo}>{`PARTY `}</Text>
              <Text style={styles.notifications2}>FAVOR</Text>
            </Text>
          </View>
          <View style={styles.rightAccessory}>
            <TouchableOpacity
              style={styles.xIconLayout}
              activeOpacity={0.2}
              onPress={() => navigate("Help")}
            >
              <Image
                style={[styles.icon, styles.iconLayout]}
                resizeMode="cover"
                source={require("../../assets/magnifyGlass.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[styles.welcomeBackChristopher, styles.sales1Layout]}>
          Welcome Back{" "}
          {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}
        </Text>

        <View style={styles.containerParent}>
          <View style={styles.container}>
            <View style={[styles.sectionTitle, styles.titleFlexBox]}>
              <Text style={[styles.hereIsWhats, styles.hereIsWhatsLayout]}>
                Here is what’s been going on
              </Text>
              <HStack>
                <Select
                  selectedValue={filter}
                  accessibilityLabel="Filter"
                  placeholder={filter}
                  placeholderTextColor="#FFF"
                  dropdownCloseIcon={
                    <Image
                      style={styles.iconsaxlineararrowsquaredown}
                      resizeMode="cover"
                      source={require("../../assets/iconsaxlineararrowsquaredown.png")}
                    />
                  }
                  dropdownOpenIcon={
                    <Image
                      style={styles.iconsaxlineararrowsquaredown}
                      resizeMode="cover"
                      source={require("../../assets/iconsaxlineararrowsquaredown.png")}
                    />
                  }
                  width={125}
                  variant="unstyled"
                  color={"#FFF"}
                  onValueChange={(itemValue) => setFilter(itemValue)}
                >
                  <Select.Item label="Last 30 days" value="30days" />
                  <Select.Item label="Last 5 days" value="5days" />
                  <Select.Item label="Yesterday" value="yesterday" />
                  <Select.Item label="Today" value="today" />
                </Select>
              </HStack>
            </View>
            <View style={[styles.notifications, styles.salesBorder]}>
              <Image
                style={[styles.iconsaxlinearheart, styles.xIconLayout]}
                resizeMode="cover"
                source={require("../../assets/iconsaxlinearheart1.png")}
              />
              <View style={styles.notificationsWrapper}>
                <Text style={[styles.notifications1, styles.sales1Layout]}>
                  <Text style={styles.textTypo}>{notification} </Text>
                  <Text style={styles.notifications2}>Notifications</Text>
                </Text>
              </View>
            </View>
            <View style={styles.salesRequest}>
              <View style={[styles.sales, styles.salesBorder]}>
                <Image
                  style={[styles.iconsaxlinearheart, styles.xIconLayout]}
                  resizeMode="cover"
                  source={require("../../assets/iconsaxlinearcoin.png")}
                />
                <View style={styles.parent}>
                  <Text style={[styles.text1, styles.textbold]}>
                    $ {vendorInfo?.sales || 0}
                  </Text>
                  <Text style={[styles.sales1, styles.text1Layout]}>Sales</Text>
                </View>
              </View>
              <View style={[styles.request, styles.salesBorder]}>
                <Image
                  style={[styles.iconsaxlinearheart, styles.xIconLayout]}
                  resizeMode="cover"
                  source={require("../../assets/iconsaxlinearmessagenotif.png")}
                />
                <View style={styles.parent}>
                  <Text style={[styles.text1, styles.textbold]}>
                    {vendorInfo?.request || 0}
                  </Text>
                  <Text style={[styles.sales1, styles.text1Layout]}>
                    Request
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.salesRequest}>
              <View style={[styles.sales, styles.salesBorder]}>
                <Image
                  style={[styles.iconsaxlinearheart, styles.xIconLayout]}
                  resizeMode="cover"
                  source={require("../../assets/iconsaxlinearclipboardtick.png")}
                />
                <View style={styles.parent}>
                  <Text style={[styles.text1, styles.textbold]}>
                    {vendorInfo?.completed || 0}
                  </Text>
                  <Text style={[styles.sales1, styles.text1Layout]}>
                    Event Completed
                  </Text>
                </View>
              </View>
              <View style={[styles.request, styles.salesBorder]}>
                <Image
                  style={[styles.iconsaxlinearheart, styles.xIconLayout]}
                  resizeMode="cover"
                  source={require("../../assets/iconsaxlineareye1.png")}
                />
                <View style={styles.parent}>
                  <Text style={[styles.text1, styles.textbold]}>
                    {vendorInfo?.views || 0}
                  </Text>
                  <Text style={[styles.sales1, styles.text1Layout]}>
                    Page Views
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.notifications, styles.salesBorder]}>
              <Image
                style={[styles.iconsaxlinearheart, styles.xIconLayout]}
                resizeMode="cover"
                source={require("../../assets/iconsaxlinearheart1.png")}
              />
              <View style={styles.notificationsWrapper}>
                <Text style={[styles.notifications1, styles.sales1Layout]}>
                  <Text style={styles.textTypo}>
                    {vendorInfo?.favorites || 0}{" "}
                  </Text>
                  <Text style={styles.notifications2}>
                    People Favorited your Business
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.yourParties}>
            <View style={[styles.title, styles.titleFlexBox]}>
              <Text style={[styles.trendingPartyInspiration, styles.textTypo]}>
                Trending Party Inspiration
              </Text>
              <Pressable onPress={() => navigation.navigate("AlbumTypeScreen")}>
                <Text style={[styles.viewAll, styles.viewAllTypo]}>
                  View all
                </Text>
              </Pressable>
            </View>
            <View style={styles.parent}>
              <View style={styles.container2}>
                <InspirationCard
                  propMarginLeft="unset"
                  propOpacity={0.5}
                  img={require("../../assets/img.png")}
                  whiteAndSparkleMasquerade="Sonny’s First Ever Birthday Extravaganza!"
                  whiteAndSparkleMasqueradeHeight="unset"
                />
                <InspirationCard
                  img={require("../../assets/img1.png")}
                  whiteAndSparkleMasquerade="White and Sparkle Masquerade Party!!!"
                />
                <InspirationCard
                  propMarginLeft={16}
                  propOpacity={0.5}
                  img={require("../../assets/img2.png")}
                  whiteAndSparkleMasquerade={`Pool Party
Mermaid`}
                  whiteAndSparkleMasqueradeHeight={38}
                />
              </View>
              <Image
                style={styles.progressIcon}
                resizeMode="cover"
                source={require("../../assets/progress.png")}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    width: "100%",
    overflow: "hidden",
  },
  titleFlexBox: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  hereIsWhatsLayout: {
    lineHeight: 21,
    color: Color.labelColorDarkPrimary,
  },
  viewAllTypo: {
    textAlign: "right",
    fontFamily: FontFamily.sFProDisplayRegular,
    fontSize: FontSize.typographyBodyMediumBold_size,
  },
  salesBorder: {
    paddingVertical: Padding.p_5xl,
    paddingHorizontal: Padding.p_base,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderStyle: "solid",
    backgroundColor: Color.gray_700,
    borderRadius: Border.br_base,
  },
  xIconLayout: {
    height: 24,
    width: 24,
  },
  background: {
    width: "100%",
    height: "100%",
  },
  bgIconPosition: {
    left: 0,
    position: "absolute",
  },
  sales1Layout: {
    lineHeight: 24,
    fontSize: FontSize.typographyHeadingMedium_size,
  },
  text1Layout: {
    color: "#8A8A8A",
  },
  textTypo: {
    fontFamily: FontFamily.textLargeBold,
    fontWeight: "700",
  },
  hereIsWhats: {
    textAlign: "left",
    color: Color.labelColorDarkPrimary,
    fontFamily: FontFamily.sFProDisplayRegular,
    fontSize: FontSize.typographyBodyMediumBold_size,
    lineHeight: 21,
  },
  textbold: {
    fontWeight: "700",
    fontSize: 28,
  },
  iconsaxlineararrowsquaredown: {
    width: 21,
    height: 21,
    overflow: "hidden",
  },
  last30Days: {
    flexDirection: "row",
  },
  sectionTitle: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_5xs,
    alignItems: "center",
  },
  iconsaxlinearheart: {
    overflow: "hidden",
  },
  notifications2: {
    fontFamily: FontFamily.sFProDisplayRegular,
  },
  notifications1: {
    textAlign: "left",
    color: Color.labelColorDarkPrimary,
    alignSelf: "stretch",
  },
  notificationsWrapper: {
    marginLeft: 16,
    flex: 1,
  },
  notifications: {
    marginTop: 16,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  text1: {
    fontSize: FontSize.typographyLargeTitle_size,
    lineHeight: 42,
    fontFamily: FontFamily.textLargeBold,
    fontWeight: "700",
    color: Color.labelColorDarkPrimary,
  },
  sales1: {
    color: Color.primaryAlmostGrey,
    lineHeight: 24,
    fontSize: FontSize.typographyHeadingMedium_size,
    fontFamily: FontFamily.sFProDisplayRegular,
  },
  parent: {
    marginTop: 16,
  },
  sales: {
    justifyContent: "center",
    flex: 1,
  },
  request: {
    justifyContent: "center",
    marginLeft: 16,
    flex: 1,
  },
  salesRequest: {
    marginTop: 16,
    flexDirection: "row",
  },
  container: {
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: 0,
    width: "100%",
    alignItems: "center",
  },
  trendingPartyInspiration: {
    fontSize: 18,
    lineHeight: 22,
    color: Color.labelColorDarkPrimary,
  },
  viewAll: {
    lineHeight: 17,
    color: "#FF077E",
  },
  title: {
    alignItems: "flex-end",
  },
  container2: {
    justifyContent: "center",
    width: 327,
    flexDirection: "row",
    alignItems: "center",
  },
  progressIcon: {
    height: 8,
    marginTop: 24,
    width: 327,
  },
  yourParties: {
    marginTop: 32,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    padding: 20,
  },
  containerParent: {
    alignItems: "center",
  },
  welcomeBackChristopher: {
    marginLeft: 20,
    marginVertical: 30,
    textAlign: "left",
    color: Color.labelColorDarkPrimary,
    fontFamily: FontFamily.sFProDisplayRegular,
  },
  leftAccessory: {
    paddingLeft: Padding.p_5xl,
    paddingRight: Padding.p_4xs,
  },
  title2: {
    fontSize: FontSize.size_2xl,
    letterSpacing: 3,
    textAlign: "center",
    color: Color.labelColorDarkPrimary,
  },
  title1: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: "100%",
    overflow: "hidden",
  },
  rightAccessory: {
    paddingLeft: Padding.p_4xs,
    paddingRight: Padding.p_5xl,
    justifyContent: "center",
  },
  topnavigationContent: {
    marginTop: 50,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  vendorhomescreen: {
    overflow: "hidden",
    flex: 1,
  },
  alertmodalbg: {
    left: 0,
    top: 0,
    height: "100%",
    overflow: "hidden",
  },
  alertmodalbgLayout: {
    width: "100%",
    position: "absolute",
  },
});

export default VendorHomeScreen;
