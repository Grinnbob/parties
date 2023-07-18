import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MidGradientButton from "../../components/MidGradientButton";
import { FontFamily, Color } from "../../GlobalStyles";
import GradientButton from "../../components/Onboard/GradientButton";
import apis from "../../apis";
import StateTypes from "../../stateManagement/StateTypes";
import useGlobalState from "../../stateManagement/hook";
import DismissKeyboard from "../../layouts/DismissKeyboard";

const selections = [
  { id: 1, title: "I’am a party host!" },
  { id: 2, title: "I Provide Party Services" },
];

const OnboardScreen = ({ route }) => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useGlobalState(
    StateTypes.user.key,
    StateTypes.user.default
  );

  const handlePress = (select) => {
    setSelected(select.id);
  };

  const handleNext = async () => {
    try {
      setIsLoading(true);
      if (selected === 1) {
        navigation.navigate("OnboardSelectScreen");
      } else {
        const res = await apis.user.update({
          id: route?.params?.id || user.id,
          role: "vendor",
        });
        console.log("RES", res);
        setIsLoading(false);
        if (res && res.success) {
          navigation.navigate("VendorCreate");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.onboardscreen}>
        <View style={[styles.alertmodalbg, styles.bgIconPosition]} />
        <View style={{ flex: 1, justifyContent: "space-around" }}>
          <View>
            <View style={styles.title}>
              <Text
                style={styles.title1}
              >{`Welcome to ${"\n"}Party Favor!`}</Text>
              <Text style={[styles.title2, styles.title2Typo]}>
                Let’s quickly choose your role to get to start!
              </Text>
            </View>
            <View style={styles.switcher}>
              {selections.map((item, i) => (
                <GradientButton
                  key={i}
                  title={item.title}
                  enable={selected === item.id}
                  onPress={() => handlePress(item)}
                />
              ))}
            </View>
          </View>
          <View style={{ width: "100%", alignItems: "center" }}>
            <MidGradientButton
              onPress={handleNext}
              isLoading={isLoading}
              disabled={!selected}
              label="Ok!"
              formBackgroundColor="unset"
              formMarginTop="unset"
              labelColor="#fff"
            />
          </View>
        </View>
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  bgIconPosition: {
    position: "absolute",
    height: "100%",
  },
  title2Typo: {
    fontFamily: FontFamily.typographyBodyMediumLight,
    fontWeight: "300",
  },
  alertmodalbg: {
    backgroundColor: Color.labelColorLightPrimary,
    width: "100%",
    overflow: "hidden",
  },
  title1: {
    fontSize: 28,
    fontFamily: FontFamily.textLargeBold,
    textAlign: "center",
    color: Color.labelColorDarkPrimary,
    fontWeight: "700",
  },
  title2: {
    color: Color.primaryAlmostGrey,
    marginTop: 24,
    lineHeight: 22,
    fontSize: 16,
    fontFamily: FontFamily.typographyBodyMediumLight,
    fontWeight: "300",
    textAlign: "center",
  },
  title: {
    marginTop: 0,
    alignItems: "center",
  },
  switcher: {
    alignItems: "center",
    margin: 40,
  },
  onboardscreen: {
    backgroundColor: Color.labelColorDarkPrimary,
    flex: 1,
    width: "100%",
    overflow: "hidden",
    height: "100%",
  },
});

export default OnboardScreen;
