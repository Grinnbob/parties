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
        const res = await apis.user.update({
          id: route?.params?.id || user.id,
          role: "host",
        });
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
        <Image
          style={styles.background}
          resizeMode="cover"
          source={require("../../assets/bg16.png")}
        />
        <View style={[styles.alertmodalbg, styles.bgIconPosition]} />
        <View style={{ height: 120 }} />
        <View style={styles.title}>
          <Text style={styles.title1}>{`Welcome to ${"\n"}Party Favor!`}</Text>
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
              handlePressIn={() => handlePress(item)}
              onPress={handleNext}
            />
          ))}
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
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});

export default OnboardScreen;
