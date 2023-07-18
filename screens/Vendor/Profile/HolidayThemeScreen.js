import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import {
  Padding,
  FontFamily,
  Color,
  FontSize,
  Border,
} from "../../../GlobalStyles";
import GradientSelection from "./component/GradientSelection";
import useGlobalState from "../../../stateManagement/hook";
import types from "../../../stateManagement/types";

const selections = [
  { id: 1, title: "Latest Post" },
  { id: 2, title: "New Years Eve Party" },
  { id: 3, title: "Christmas" },
  { id: 4, title: "Thanksgiving" },
  { id: 5, title: "Valentine's Day" },
  { id: 6, title: "Memorial Day" },
  { id: 7, title: "Independence Day" },
  { id: 8, title: "Labor Day" },
  { id: 9, title: "Martin Luther King Jr.Day" },
];

const HolidayThemeScreen = ({ route, navigation }) => {
  const [selected, setSelected] = useState("");
  const [selectedOption, setSelectedOption] = useGlobalState(
    types.albumType.albumtype.default,
    types.albumType.albumtype.key
  );

  const handlePressOut = (select) => {
    if (select) {
      setSelected(select.id);
      setSelectedOption(select.title);
      setTimeout(() => {
        navigation.navigate("Photo");
      }, 1000);
    }
  };

  return (
    <View style={styles.holidaythemscreene}>
      <Image
        style={[styles.bgIcon, styles.bgIconPosition]}
        resizeMode="cover"
        source={require("../../../assets/bg16.png")}
      />
      <View style={styles.topnavigationContentPosition}>
        <View style={[styles.leftAccessory1, styles.accessoryPosition]}>
          <Pressable
            onPress={() => navigation.navigate("Calendar", { screen: "Album" })}
          >
            <Image
              style={styles.backIcon1Layout}
              resizeMode="cover"
              source={require("../../../assets/back.png")}
            />
          </Pressable>
        </View>
        <View style={[styles.accessoryPosition]}>
          <Text style={[styles.title6, styles.titleTypo1]}>
            {route.params.title}
          </Text>
        </View>
      </View>
      <View style={styles.title}>
        <Text style={styles.title1}>
          Which kind of Holiday Party are you looking for?
        </Text>
      </View>

      <View style={[styles.container, styles.bgIconPosition]}>
        {selections.map((select, i) => (
          <GradientSelection
            key={i}
            title={select.title}
            onPress={() => handlePressOut(select)}
            enable={selected === select.id}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bgIconPosition: {
    left: 0,
    position: "absolute",
  },
  topnavigationContentPosition: {
    width: "100%",
    flexDirection: "row",
    marginTop: 30,
  },
  container: {
    marginTop: 200,
  },
  titleTypo1: {
    fontFamily: FontFamily.typographyBodySmallBold,
    fontWeight: "700",
    color: Color.labelColorDarkPrimary,
  },
  accessoryPosition: {
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon1Layout: {
    height: 40,
    width: 40,
    marginLeft: 5,
  },
  bgIcon: {
    top: 0,
    width: "100%",
    height: 891,
  },
  title1: {
    textAlign: "center",
    color: Color.labelColorDarkPrimary,
    fontFamily: FontFamily.typographyBodyMediumRegular,
    fontSize: FontSize.size_mini,
  },
  title: {
    borderColor: "#232323",
    paddingHorizontal: 0,
    paddingVertical: Padding.p_5xl,
    justifyContent: "center",
    alignItems: "center",
    width: 375,
    borderBottomWidth: 1,
    borderStyle: "solid",
    left: 0,
  },
  iconsaxlinearhambergermenu: {
    marginLeft: 5,
  },
  backIcon: {
    width: 17,
    height: 12,
    marginLeft: 5,
    display: "none",
  },
  leftAccessory: {
    paddingLeft: Padding.p_5xl,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: Padding.p_4xs,
    paddingRight: Padding.p_4xs,
    paddingTop: Padding.p_4xs,
  },
  leftAccessory1: {
    paddingLeft: Padding.p_base,
    paddingBottom: Padding.p_4xs,
    paddingRight: Padding.p_4xs,
    paddingTop: Padding.p_4xs,
    left: 0,
  },
  title6: {
    fontSize: 18,
    lineHeight: 25,
    textAlign: "center",
  },
  holidaythemscreene: {
    backgroundColor: Color.labelColorLightPrimary,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    flex: 1,
  },
});

export default HolidayThemeScreen;
