import * as React from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MidGradientButton from "../../components/MidGradientButton";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import Layout from "../../utils/layout";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ImageBackground
        style={styles.bgPosition}
        resizeMode="cover"
        source={require("../../assets/rectangle-2.png")}
      >
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View style={{ height: 1 }}></View>
          <View>
            <Text style={styles.title}>
              <Text style={styles.party}>PARTY</Text>
              <Text style={styles.text2}>{` `}</Text>
              <Text style={styles.favor}>FAVOR</Text>
            </Text>
          </View>
          <View style={styles.buttons}>
            <MidGradientButton
              onPress={() => navigation.navigate("SignUpScreen")}
              label="Sign Up"
              formPosition="unset"
              formTop="unset"
              formLeft="unset"
              formBackgroundColor="unset"
              formMarginTop="unset"
              labelColor="#fff"
            />
            <TouchableOpacity
              style={styles.alreadyHaveAnContainer}
              activeOpacity={0.2}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.text}>
                <Text style={styles.alreadyHaveAnAccount}>
                  <Text style={styles.alreadyHaveAn}>
                    Already have an account?
                  </Text>
                  <Text style={styles.text1}>{` `}</Text>
                </Text>
                <Text style={styles.signIn}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  bgPosition: {
    width: Layout.window.width,
    height: Layout.window.height,
  },
  leftFlexBox: {
    display: "none",
    alignItems: "center",
  },
  alreadyHaveAn: {
    fontWeight: "300",
    fontFamily: FontFamily.typographyBodyMediumLight,
  },
  text1: {
    fontFamily: FontFamily.typographyBodySmallBold,
    fontWeight: "700",
  },
  alreadyHaveAnAccount: {
    color: Color.textMainWhite,
  },
  signIn: {
    color: Color.crimson,
    fontFamily: FontFamily.typographyBodyMediumRegular,
  },
  text: {
    fontSize: FontSize.typographyBodySmallBold_size,
    textAlign: "center",
  },
  alreadyHaveAnContainer: {
    marginTop: 24,
  },
  buttons: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 100,
  },
  party: {
    fontFamily: FontFamily.textLargeBold,
    fontWeight: "700",
  },
  text2: {
    fontWeight: "500",
    fontFamily: FontFamily.sFProDisplayMedium,
  },
  favor: {
    fontFamily: FontFamily.sFProDisplayRegular,
  },
  title: {
    fontSize: 31,
    letterSpacing: 4,
    color: Color.textMainWhite,
    textAlign: "center",
  },
});

export default WelcomeScreen;
