import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { VStack, Input, Divider, Text, useToast } from "native-base";
import LabelInput from "../../components/Input/LabelInput";
import { useNavigation } from "@react-navigation/native";
import MidGradientButton from "../../components/MidGradientButton";
import { FontSize, Padding, FontFamily, Color } from "../../GlobalStyles";
import { email as validateEmail } from "../../utils/validation";

import Email from "../../assets/email.svg";
import Person from "../../assets/onboard/profilecircle.svg";
import apis from "../../apis";
import DismissKeyboard from "../../layouts/DismissKeyboard";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [emailInUse, setEmailInUse] = useState(false);
  const [emailFree, setEmailFree] = useState(false);
  const [lastName, setLastName] = useState("");
  const [showValidationError, setShowValidationError] = useState(false);

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      navigation.navigate("PasswordScreen", {
        firstName,
        lastName,
        email,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const onDebounce = async (txt) => {
    if (!validateEmail.test(txt)) {
      if (txt.length > 0) setShowValidationError(true);
      return;
    }
    try {
      setIsLoading(true);
      const res = await apis.auth.checkEmail(txt);
      if (!res.success) {
        setEmailInUse(true);
      } else {
        setEmailFree(true);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.signupscreen}>
        {/* <View style={[styles.alertmodalbg, styles.alertmodalbgLayout]} /> */}
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <View style={[styles.leftAccessory, styles.accessoryPosition]}>
              <TouchableOpacity
                onPress={() => navigation.navigate("WelcomeScreen")}
              >
                <Image
                  style={styles.backIconLayout}
                  resizeMode="cover"
                  source={require("../../assets/back.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.titlePosition}>
              <Text style={styles.title1}>Welcome</Text>
              <Text style={[styles.title2, styles.titleLayout]}>
                Create an account for exclusive access to {"\n"}party planning!
              </Text>
            </View>
            <VStack px={4}>
              <VStack>
                <Input
                  mb={1}
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
                  returnKeyType="default"
                  variant="ghost"
                  blurOnSubmit={true}
                  placeholder="First Name"
                  placeholderTextColor="#8A8A8A"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  _input={{
                    marginLeft: 5,
                    fontSize: 14,
                    fontWeight: "700",
                    color: "#FFF",
                  }}
                  leftElement={<Person />}
                />
                <VStack width={"100%"} alignItems={"flex-end"}>
                  <Divider width={"86%"} background="#8A8A8A" />
                </VStack>
                <LabelInput
                  value={lastName}
                  mb={1}
                  onChangeText={(text) => setLastName(text)}
                  returnKeyType="default"
                  blurOnSubmit={true}
                  variant="underlined"
                  placeholder="Last Name"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  LeftComponent={
                    <View style={{ width: 22, height: 18 }}></View>
                  }
                />
                <LabelInput
                  value={email}
                  variant="underlined"
                  onDebounce={onDebounce}
                  delay={1000}
                  mb={3}
                  errorText={
                    showValidationError
                      ? "must be a valid email"
                      : emailInUse
                      ? "email already in use"
                      : null
                  }
                  onChangeText={(text) => {
                    if (emailInUse) setEmailInUse(false);
                    if (emailFree) setEmailFree(false);
                    if (showValidationError) setShowValidationError(false);
                    setEmail(text);
                  }}
                  LeftComponent={<Email />}
                  returnKeyType="default"
                  blurOnSubmit={true}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {email && firstName && lastName ? (
                  <VStack width={"100%"}>
                    <Text
                      fontSize={12}
                      lineHeight={18}
                      color={"#8A8A8A"}
                      marginTop={3}
                    >
                      Your privacy is important to us, we will never sell,{" "}
                      {"\n"}
                      giveaway or solicite you with spam of any kind.
                    </Text>
                  </VStack>
                ) : (
                  <></>
                )}
              </VStack>
            </VStack>
          </View>
        </View>
        <View style={{ width: "100%", alignItems: "center", marginBottom: 30 }}>
          <MidGradientButton
            onPress={handleSignUp}
            isLoading={isLoading}
            disabled={!firstName || !lastName || !emailFree}
            label="Next"
            formPosition="unset"
            formTop="unset"
            formLeft="unset"
            formBackgroundColor="rgba(255, 255, 255, 0.1)"
            formMarginTop="unset"
            labelColor="#FFF"
          />
          <Pressable onPress={() => navigation.navigate("LoginScreen")}>
            <View style={styles.buttons}>
              <Text style={styles.alreadyHaveAnContainer}>
                <Text style={styles.alreadyHaveAnAccount}>
                  <Text style={styles.title2Typo}>
                    Already have an account?
                  </Text>
                  <Text style={styles.textTypo}>{` `}</Text>
                </Text>
                <Text style={styles.signIn}>Sign In</Text>
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  alertmodalbgLayout: {
    width: "100%",
    position: "absolute",
  },
  titlePosition: {
    width: "100%",
    marginLeft: 15,
    marginVertical: 30,
  },
  titleLayout: {
    lineHeight: 22,
    fontSize: FontSize.typographyHeadingMedium_size,
  },
  accessoryPosition: {
    paddingBottom: Padding.p_4xs,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  backIconLayout: {
    marginLeft: 5,
    height: 40,
    width: 40,
  },
  textTypo: {
    fontFamily: FontFamily.typographyBodySmallBold,
    fontWeight: "700",
  },
  alertmodalbg: {
    left: 0,
    top: 0,
    height: "100%",
    overflow: "hidden",
  },
  title2Typo: {
    fontFamily: FontFamily.typographyBodyMediumLight,
    fontWeight: "300",
  },
  alreadyHaveAnAccount: {
    color: Color.textMainWhite,
  },
  signIn: {
    color: Color.crimson,
    fontFamily: FontFamily.typographyBodyMediumRegular,
  },
  alreadyHaveAnContainer: {
    fontSize: FontSize.typographyBodySmallBold_size,
    marginTop: 24,
    textAlign: "center",
  },
  buttons: {
    alignItems: "center",
  },
  title1: {
    fontSize: 28,
    fontFamily: FontFamily.textLargeBold,
    textAlign: "left",
    fontWeight: "700",
    color: Color.textMainWhite,
    lineHeight: 33,
  },
  title2: {
    alignSelf: "stretch",
    color: Color.primaryAlmostGrey,
    marginTop: 8,
    marginBottom: 20,
    textAlign: "left",
    fontFamily: FontFamily.typographyBodyMediumLight,
    fontWeight: "300",
  },
  leftAccessory: {
    paddingLeft: 10,
    paddingRight: Padding.p_4xs,
  },
  signupscreen: {
    // backgroundColor: Color.labelColorLightPrimary,
    width: "100%",
    overflow: "hidden",
    flex: 1,
  },
});

export default SignUpScreen;
