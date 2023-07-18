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

const BottomNavContainer = () => {
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
        title={"Dashboard"}
        isSelected={selected === "Dashboard"}
        onPress={() => {
          setSelected("Dashboard");
          navigate("Dashboard");
        }}
      />
      <NavItem
        image={require("../../assets/iconsaxlinearbaghappy1.png")}
        selectedImage={require("../../assets/iconsaxlinearbaghappy2.png")}
        title={"Services"}
        isSelected={selected === "Services"}
        onPress={() => {
          setSelected("Services");
          navigate("Services");
        }}
      />
      <NavItem
        image={require("../../assets/iconsaxlineardocumenttext2.png")}
        selectedImage={require("../../assets/iconsaxlineardocumenttext1.png")}
        title={"Quotes"}
        isSelected={selected === "Quotes"}
        onPress={() => {
          setSelected("Quotes");
          navigate("Quotes");
        }}
      />
      <NavItem
        image={require("../../assets/iconsaxlinearcalendar1.png")}
        selectedImage={require("../../assets/iconsaxlinearcalendar3.png")}
        title={"Calendar"}
        isSelected={selected === "Calendar"}
        onPress={() => {
          setSelected("Calendar");
          navigate("Calendar");
        }}
      />
      <NavItem
        image={require("../../assets/iconsaxlinearnotification1.png")}
        selectedImage={require("../../assets/notification.png")}
        title={"Notifications"}
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
    fontSize: FontSize.textCaption10Regular_size,
    textAlign: "center",
    fontWeight: "400",
  },
  unselectedText: {
    fontFamily: FontFamily.textBody13Regular,
    color: Color.textInactive,
  },
  selectedText: {
    fontWeight: "400",
    fontFamily: FontFamily.textBody15Semibold,
    color: Color.primaryPink,
    zIndex: 1,
  },
});

export default BottomNavContainer;
