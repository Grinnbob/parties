import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { FontSize, FontFamily, Color } from "../../GlobalStyles";
import { useNavigation } from "@react-navigation/core";

const TABBAR_HEIGHT = 85;

const HostBottomNav = () => {
  const { navigate } = useNavigation();
  const [selected, setSelected] = useState("Dashboard");

  const NavItem = ({ image, selectedImage, isSelected, title, onPress }) => (
    <Pressable onPress={onPress} style={styles.navIconLayout}>
      <Image
        style={[styles.navIcon]}
        resizeMode="cover"
        source={isSelected ? selectedImage : image}
      />
      <Text
        style={
          isSelected
            ? [styles.selectedText, styles.navText]
            : [styles.unselectedText, styles.navText]
        }
      >
        {title}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.navContainer}>
      <NavItem
        image={require("../../assets/iconsaxlinearelement4.png")}
        selectedImage={require("../../assets/dashboardselect2.png")}
        title={"Home"}
        isSelected={selected === "Dashboard"}
        onPress={() => {
          setSelected("Dashboard");
          navigate("Dashboard");
        }}
      />
      <NavItem
        image={require("../../assets/iconsaxlinearbaghappy1.png")}
        selectedImage={require("../../assets/iconsaxlinearbaghappy2.png")}
        title={"Inspirations"}
        isSelected={selected === "Services"}
        onPress={() => {
          setSelected("Services");
          navigate("Services");
        }}
      />
      <Pressable>
        <View style={[styles.betButtonContainer]}>
          <View style={styles.betBtn}>
            <Image
              style={styles.circleBgIcon}
              resizeMode="cover"
              source={require("../../assets/addcircle.png")}
            />
            <Text style={styles.planparty}>Plan Party</Text>
          </View>
        </View>
      </Pressable>
      <NavItem
        image={require("../../assets/iconsaxlinearcalendar1.png")}
        selectedImage={require("../../assets/iconsaxlinearcalendar3.png")}
        title={"Services"}
        isSelected={selected === "Calendar"}
        onPress={() => {
          setSelected("Calendar");
          navigate("Calendar");
        }}
      />
      <NavItem
        image={require("../../assets/iconsaxlinearnotification1.png")}
        selectedImage={require("../../assets/notification.png")}
        title={"My Party"}
        isSelected={selected === "Notifications"}
        onPress={() => {
          setSelected("Notifications");
          navigate("Notifications");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: TABBAR_HEIGHT,
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOpacity: 0.0793816,
    shadowRadius: 10,
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: -6,
    },
  },
  circleBgIcon: {
    width: 93,
    height: 95,
  },
  betButtonContainer: {
    width: 90,
  },
  betBtn: {
    width: 74,
    height: 76,
    bottom: 35,
  },
  navIcon: {
    zIndex: 0,
    height: 20,
    width: 20,
  },
  navIconLayout: {
    alignItems: "center",
    justifyContent: "center",
    width: 69,
    height: 60,
  },
  navText: {
    marginTop: 6,
    fontSize: 10,
    textAlign: "center",
    fontWeight: "400",
  },
  unselectedText: {
    // fontFamily: FontFamily.textBody13Regular,
    color: Color.textInactive,
    fontWeight: "400",
  },
  selectedText: {
    fontWeight: "400",
    // fontFamily: FontFamily.textBody15Semibold,
    color: Color.primaryPink,
    zIndex: 1,
  },
  planparty: {
    fontWeight: "400",
    color: "#8A8A8A",
    fontSize: 10,
    textAlign: "center",
    top: 67,
    left: 20,
    lineHeight: 25,
    justifyContent: "center",
    position: "absolute",
  },
});

export default HostBottomNav;
