import React, { useState } from "react";
import { Image, StyleSheet, View, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MidGradientButton from "../../components/MidGradientButton";
import { Padding, FontFamily, FontSize, Color } from "../../GlobalStyles";
import AccountModal from "../../components/AccountModal";
import apis from "../../apis";
import PasswordInput from "../../components/Input/PasswordInput";
import { VStack, useToast } from "native-base";
import Check from "../../assets/onboard/checkgreen.svg";
import { specialChar, upper, numerical } from "../../utils/validation";

const AccountSettingScreen = ({ route }) => {
  const toast = useToast();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [special, setSpecial] = useState(false);
  const [numeric, setNumeric] = useState(false);
  const [capitalLetter, setCapitalLetter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleReset = async () => {
    setIsLoading(true);
    const res = await apis.auth.forgotPassword({
      id: route?.params?.id,
      currentPassword: currentPassword,
      newPassword: password,
    });
    console.log("RES", res);
    if (res && res.success === false) {
      toast.show({
        placement: "top",
        description: res.message,
      });
      setIsLoading(false);
    }
    if (res && res.success) {
      console.log(res.message);
      setModalVisible(true);
      setIsLoading(false);
      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
    }
    setIsLoading(false);
  };

  return (
    <>
      <AccountModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View style={styles.accountsettingscreen}>
        <View style={[styles.alertmodalbg, styles.titlePosition]} />
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <View style={styles.topnavigationContent}>
              <View style={styles.leftAccessory}>
                <Image
                  style={styles.backIconLayout}
                  resizeMode="cover"
                  source={require("../../assets/back.png")}
                />
              </View>
              <View style={styles.title2}>
                <Text style={styles.title3}>Account Setting</Text>
              </View>
              <View style={{ width: 65, height: 65 }}></View>
            </View>
            <Text style={[styles.title1, styles.titleTypo]}>
              Change your password
            </Text>
            <View style={{ padding: 20 }}>
              <VStack my={2} width="100%">
                <PasswordInput
                  placeholder="Existing Password"
                  variant="underlined"
                  value={currentPassword}
                  onChangeText={(text) => setCurrentPassword(text)}
                  returnKeyType="default"
                  blurOnSubmit={true}
                />
              </VStack>
              <VStack my={2} width="100%">
                <PasswordInput
                  placeholder="New Password"
                  variant="underlined"
                  value={password}
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
              <VStack my={2} width="100%">
                <PasswordInput
                  placeholder="Re-enter Password"
                  variant="underlined"
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                  }}
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
                    marginBottom: 15,
                    marginTop: 20,
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
                    marginBottom: 15,
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
                    marginBottom: 15,
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
                    marginBottom: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "500",
                      color: password?.length >= 8 ? "#FFFFFF" : "#8A8A8A",
                    }}
                  >
                    Password length must be 8 characters at least
                  </Text>
                  {password?.length >= 8 ? <Check /> : <></>}
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
          <View style={styles.buttons}>
            <MidGradientButton
              onPress={handleReset}
              isLoading={isLoading}
              label="Next"
              formBackgroundColor="rgba(255, 255, 255, 0.1)"
              formMarginTop="unset"
              labelColor="#FFF"
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titlePosition: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  passwordFlexBox: {
    paddingVertical: Padding.p_base,
    width: "90%",
    flexDirection: "row",
  },
  passwordIconBox: {
    paddingVertical: Padding.p_base,
    width: "90%",
    flexDirection: "row",
    paddingLeft: 20,
  },
  iconsaxboldlockLayout: {
    height: 21,
    width: 21,
    overflow: "hidden",
  },
  iconlockLayout: {
    height: 21,
    width: 21,
    overflow: "hidden",
    left: 10,
  },
  iconViewLayout: {
    height: 21,
    width: 21,
    overflow: "hidden",
    right: 10,
  },
  titleTypo: {
    fontFamily: FontFamily.typographyBodyMediumRegular,
    lineHeight: 22,
    fontSize: FontSize.typographyHeadingMedium_size,
  },
  backIconLayout: {
    marginTop: 20,
    marginLeft: 5,
    height: 40,
    width: 40,
  },
  divider: {
    height: 1,
    width: "94%",
    backgroundColor: "#4D4D4D",
  },
  alertmodalbg: {
    backgroundColor: Color.primarySoBlack,
  },
  label: {
    fontWeight: "300",
    fontFamily: FontFamily.typographyBodyMediumLight,
    color: Color.primaryAlmostGrey,
    marginLeft: 16,
    textAlign: "left",
    lineHeight: 22,
    fontSize: FontSize.typographyHeadingMedium_size,
  },
  buttons: {
    alignItems: "center",
    width: "100%",
    marginBottom: 30,
  },
  forms: {
    width: "100%",
    alignItems: "center",
    marginTop: 80,
  },
  title1: {
    alignSelf: "stretch",
    color: Color.labelColorDarkPrimary,
    textAlign: "left",
    marginTop: 30,
    marginLeft: 20,
  },
  title: {
    // marginTop: 90,
    marginLeft: 10,
  },
  leftAccessory: {
    paddingLeft: Padding.p_base,
    paddingRight: Padding.p_4xs,
  },
  title3: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "700",
    fontFamily: FontFamily.typographyBodySmallBold,
    textAlign: "center",
    color: Color.labelColorDarkPrimary,
  },
  title2: {
    // width: "100%",
    paddingTop: 20,
    justifyContent: "center",
  },
  topnavigationContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "rgba(77, 77, 77, 0.5)",
    borderBottomWidth: 1,
    borderStyle: "solid",
    marginTop: 40,
  },
  accountsettingscreen: {
    backgroundColor: Color.labelColorLightPrimary,
    width: "100%",
    overflow: "hidden",
    flex: 1,
  },
});

export default AccountSettingScreen;
