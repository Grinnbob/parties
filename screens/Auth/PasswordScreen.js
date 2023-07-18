import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MidGradientButton from "../../components/MidGradientButton";
import { Color, Padding, FontFamily, FontSize } from "../../GlobalStyles";
import CheckBox from "../../components/CheckBox";
import PasswordInput from "../../components/Input/PasswordInput";
import { Text, VStack, useToast } from "native-base";
import apis from "../../apis";
import loadApp from "../../navigation/loadApp";
import StateTypes from "../../stateManagement/StateTypes";
import useGlobalState from "../../stateManagement/hook";
import { specialChar, upper, numerical } from "../../utils/validation";
import Check from "../../assets/onboard/checkgreen.svg";
import DismissKeyboard from "../../layouts/DismissKeyboard";

const PasswordScreen = ({ route }) => {
  const navigation = useNavigation();
  const toast = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [special, setSpecial] = useState(false);
  const [numeric, setNumeric] = useState(false);
  const [capitalLetter, setCapitalLetter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useGlobalState(
    StateTypes.token.key,
    StateTypes.token.default
  );

  const [user, setUser] = useGlobalState(
    StateTypes.user.key,
    StateTypes.user.default
  );

  const handleSignUp = async () => {
    try {
      const { firstName, lastName, email } = route.params;
      setIsLoading(true);
      const res = await apis.auth.signup({
        firstName,
        lastName,
        email,
        password,
      });
      if (res && res.success === false) {
        toast.show({
          placement: "top",
          description: res.message,
        });
        setIsLoading(false);
      }
      if (res.success) {
        await loadApp(setToken, setUser);
      }
      setIsLoading(false);
    } catch (error) {
      toast.show({
        placement: "top",
        description: error,
      });
    }
  };

  const verifySpecialChar = (password) => {
    setSpecial(specialChar.test(password));
    return specialChar.test(password);
  };

  const verifyChar = (password) => {
    setCapitalLetter(upper.test(password));
    return upper.test(password);
  };

  const verifyNum = (password) => {
    setNumeric(numerical.test(password));
    return numerical.test(password);
  };

  return (
    <DismissKeyboard>
      <View style={styles.passwordscreen}>
        <Image
          style={[styles.background, styles.bgIconPosition]}
          resizeMode="cover"
          source={require("../../assets/bg16.png")}
        />
        <View style={[styles.alertmodalbg, styles.alertmodalbgLayout]} />
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <View style={[styles.leftAccessory, styles.accessoryPosition]}>
              <View style={styles.backLayout}>
                <TouchableOpacity
                  style={styles.vector}
                  activeOpacity={0.2}
                  onPress={() => navigation.pop()}
                >
                  <Image
                    style={styles.icon}
                    resizeMode="cover"
                    source={require("../../assets/vector14.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={[styles.title1, styles.titleTypo]}>
              Create a Password
            </Text>
            <View style={styles.forms}>
              <VStack style={{ marginBottom: 16 }}>
                <PasswordInput
                  placeholder="Password"
                  value={password}
                  variant="underlined"
                  onChangeText={(text) => {
                    setPassword(text);
                    verifySpecialChar(text);
                    verifyChar(text);
                    verifyNum(text);
                  }}
                  returnKeyType="default"
                  blurOnSubmit={true}
                />
              </VStack>
              <VStack style={{ marginBottom: 16 }}>
                <PasswordInput
                  placeholder="Re-enter Password"
                  variant="underlined"
                  value={confirmPassword}
                  onChangeText={(text) => setConfirmPassword(text)}
                  returnKeyType="default"
                  blurOnSubmit={true}
                />
              </VStack>
              <VStack>
                <VStack
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "500",
                      color: capitalLetter ? "#FFFFFF" : "#8A8A8A",
                    }}
                  >
                    At least 1 capital letter
                  </Text>
                  {capitalLetter ? <Check /> : <></>}
                </VStack>
                <VStack
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "500",
                      color: numeric ? "#FFFFFF" : "#8A8A8A",
                    }}
                  >
                    At least 1 numeric value
                  </Text>
                  {numeric ? <Check /> : <></>}
                </VStack>
                <VStack
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "500",
                      color: special ? "#FFFFFF" : "#8A8A8A",
                    }}
                  >
                    At least 1 special character
                  </Text>
                  {special ? <Check /> : <></>}
                </VStack>
                <VStack
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "500",
                      color:
                        password && password === confirmPassword
                          ? "#FFFFFF"
                          : "#8A8A8A",
                    }}
                  >
                    Both passwords match
                  </Text>
                  {password && password === confirmPassword ? <Check /> : <></>}
                </VStack>
              </VStack>
            </View>
          </View>
          <VStack>
            <VStack
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 20,
              }}
            >
              <CheckBox
                onPress={() => setTermsChecked(!termsChecked)}
                checked={termsChecked}
              />
              <VStack
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flexWrap: 1,
                }}
              >
                <Text
                  style={{ fontWeight: "300", color: "#FFFFFF", fontSize: 12 }}
                >
                  {" "}
                  I agree with{" "}
                </Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate("Terms & Conditions", {
                      ...route.params,
                    });
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "400",
                      color: "#FFFFFF",
                      fontSize: 12,
                    }}
                  >
                    Party Favor's terms & conditions
                  </Text>
                </Pressable>
              </VStack>
            </VStack>
            <VStack width="100%" alignItems="center" marginBottom={20}>
              <MidGradientButton
                onPress={handleSignUp}
                isLoading={isLoading}
                disabled={
                  !password ||
                  !confirmPassword ||
                  !termsChecked ||
                  !special ||
                  !numeric ||
                  !capitalLetter ||
                  password !== confirmPassword
                }
                label="Next"
                formPosition="unset"
                formTop="unset"
                formLeft="unset"
                formBackgroundColor="rgba(255, 255, 255, 0.1)"
                formMarginTop={24}
                labelColor="#FFF"
              />
            </VStack>
          </VStack>
        </View>
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  bgIconPosition: {
    top: 0,
    left: 0,
    height: "100%",
  },
  alertmodalbgLayout: {
    width: "100%",
    position: "absolute",
  },
  iconsaxboldlockLayout: {
    height: 21,
    width: 21,
    overflow: "hidden",
    right: 22,
  },
  divider: {
    height: 1,
    width: "95%",
    backgroundColor: Color.primaryGrey,
  },
  formsPosition: {
    width: "100%",
    alignItems: "center",
  },
  emailFlexBox: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  valueFlexBox: {
    marginTop: 16,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  titleTypo: {
    fontWeight: "700",
    color: Color.textMainWhite,
  },
  accessoryPosition: {
    paddingBottom: Padding.p_4xs,
    paddingTop: Padding.p_4xs,
    width: 130,
    flexDirection: "row",
    alignItems: "center",
  },
  backLayout: {
    marginTop: 30,
    marginLeft: 5,
    height: 40,
    width: 40,
  },
  bgIcon: {
    width: 665,
    left: 0,
  },
  alertmodalbg: {
    left: 0,
    top: 0,
    height: "100%",
    overflow: "hidden",
  },
  mediaIconunfilledplacehol: {
    width: 20,
    height: 20,
    overflow: "hidden",
  },
  iAgreeWith: {
    fontWeight: "300",
    fontFamily: FontFamily.typographyBodyMediumLight,
  },
  partyFavorsTerms: {
    fontFamily: FontFamily.typographyBodyMediumRegular,
  },
  label: {
    fontSize: FontSize.typographyBodySmallBold_size,
    lineHeight: 17,
    textAlign: "center",
    color: Color.textMainWhite,
  },
  background: {
    width: "100%",
    height: "100%",
  },
  bgIconPosition: {
    left: 0,
    position: "absolute",
  },
  inlineAlert: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttons: {
    alignItems: "center",
    marginBottom: 20,
  },
  email: {
    paddingVertical: Padding.p_base,
    paddingHorizontal: 0,
    width: 327,
  },
  email1: {
    paddingVertical: Padding.p_base,
    paddingHorizontal: 0,
    width: 327,
  },
  atLeast1: {
    fontSize: FontSize.size_smi,
    color: Color.primaryAlmostGrey,
    fontFamily: FontFamily.typographyBodyMediumRegular,
    textAlign: "left",
  },
  vectorIcon: {
    width: 10,
    height: 7,
  },
  letter: {
    alignSelf: "stretch",
  },
  value: {
    alignSelf: "stretch",
  },
  requirement: {
    paddingRight: Padding.p_5xs,
    marginTop: 24,
    width: 327,
  },
  forms: {
    marginHorizontal: 20,
  },
  title1: {
    fontSize: 28,
    fontFamily: FontFamily.textLargeBold,
    textAlign: "left",
    marginLeft: 20,
    marginVertical: 20,
    lineHeight: 33,
  },
  title2: {
    lineHeight: 24,
    fontFamily: FontFamily.dMSansRegular,
    color: Color.neutralLGrey,
    marginTop: 8,
    display: "none",
    fontSize: FontSize.typographyHeadingMedium_size,
    alignSelf: "stretch",
    textAlign: "left",
  },
  title: {
    width: 327,
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
  icon: {
    maxWidth: "100%",
    maxHeight: "100%",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  vector: {
    left: "20%",
    top: "32.5%",
    right: "32.5%",
    bottom: "32.15%",
    width: "47.5%",
    height: "35.35%",
    position: "absolute",
  },
  leftAccessory: {
    paddingLeft: Padding.p_base,
    paddingRight: Padding.p_4xs,
    left: 0,
  },
  topnavigationContent: {
    height: 56,
  },
  passwordscreen: {
    // backgroundColor: Color.labelColorDarkPrimary,
    overflow: "hidden",
    // height: 812,
    width: "100%",
    flex: 1,
  },
});

export default PasswordScreen;
