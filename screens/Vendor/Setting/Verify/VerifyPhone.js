import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Padding,
  Border,
  Color,
  FontSize,
  FontFamily,
} from "../../../../GlobalStyles";
import { Text, VStack } from "native-base";

import apis from "../../../../apis";
import VerifyCodeInput from "../../../../components/Input/VerifyCodeInput";
import VerifyCheck from "../../../../assets/gradientwhitecheck.svg";
import TopNavigationContent from "../../../../components/TopNavigationContent";
import { Divider, useToast } from "native-base";
import types from "../../../../stateManagement/types";
import StateTypes from "../../../../stateManagement/StateTypes";
import useGlobalState from "../../../../stateManagement/hook";

function formatPhoneNumber(value) {
  var cleaned = ("" + value).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return null;
}

export default ({ route, navigation }) => {
  const toast = useToast();
  const { phone, phoneMasked, userInfo } = route.params;
  const [passcode, setPasscode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showError, setShowError] = useState(false);
  const [user, setUser] = useGlobalState(
    StateTypes.user.key,
    StateTypes.user.default
  );
  const [phoneNumber, setPhoneNumber] = useGlobalState(
    types.hostType.phone.key,
    types.hostType.phone.default
  );

  const handleUpdateUser = async () => {
    try {
      const res = await apis.user.update(
        userInfo
          ? {
              id: user.id,
              firstName: userInfo.firstName,
              lastName: userInfo.lastName,
            }
          : {
              id: user.id,
              phoneNumber: phone,
            }
      );

      if (res && res.success === false) {
        toast.show({
          placement: "top",
          description: res.message,
        });
        setIsLoading(false);
      }
      if (res.success) {
        setPhoneNumber(types.hostType.phone.default);
        setPasscode("");
        setIsVerified(false);
      }
    } catch (error) {
      toast.show({
        placement: "top",
        description: error,
      });
    }
  };

  const handleVerifyCode = async (txt) => {
    setIsLoading(true);
    setShowError(false);
    const res = await apis.auth.passcodeVerify({
      phone,
      passcode: txt,
    });
    console.log("RES", res);
    setIsLoading(false);
    if (res.success) {
      setIsVerified(true);
      setIsLoading(false);
      handleUpdateUser();
      setTimeout(() => {
        navigation.navigate("SuccessPassword");
      }, 1000);
      return;
    }
    setShowError(true);
  };

  const onResendPress = async () => {
    setIsLoading(true);
    const res = await apis.auth.passcodeRequest({ phone: phone });
    setIsLoading(false);
  };
  const EnterPasscode = () => {
    return (
      <VStack
        style={{
          flex: 1,
          padding: 20,
        }}
      >
        <VStack alignSelf={"center"}>
          <VerifyCodeInput
            codeLength={6}
            value={passcode}
            onChangeText={(text) => {
              console.log("code", /^[0-9]{0,6}$/.test(text));
              if (/^[0-9]{0,6}$/.test(text) && !isLoading) {
                setPasscode(text);
                if (text.length === 6) {
                  handleVerifyCode(text);
                }
              }
            }}
          />
          {showError && <Text color={"#f00"}>Invalid passcode</Text>}
          {isLoading && <ActivityIndicator size={"large"} />}
        </VStack>
        {isVerified && Verified()}
        <VStack alignSelf="center" mt={10}>
          <Text
            color="#8A8A8A"
            fontSize={14}
            fontWeight={"300"}
            onPress={() => {
              if (!isLoading) onResendPress();
            }}
          >
            Didn’t recieve a text message?
          </Text>
        </VStack>
      </VStack>
    );
  };
  const Verified = () => {
    return (
      <VStack
        style={{
          alignItems: "center",
        }}
      >
        <VerifyCheck />
      </VStack>
    );
  };

  return (
    <View style={styles.verifyscreen}>
      <View style={[styles.alertmodalbg, styles.alertmodalbgLayout]} />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <VStack py="5" pt="35">
          <TopNavigationContent
            title={"Verify Your Account"}
            backStyle={{ marginLeft: 20 }}
            LeftComponent={() => navigation.navigate("EnterPhone")}
          />
          <Divider backgroundColor={"rgba(255, 255, 255, 0.2)"}></Divider>
          <VStack ml={5}>
            <Text style={[styles.title2, styles.titleLayout]}>
              <Text
                style={styles.enterTheVerification}
              >{`Enter the verification code sent to`}</Text>
            </Text>
            <Text style={styles.text4Clr}>{formatPhoneNumber(phone)}</Text>
          </VStack>
        </VStack>
        {EnterPasscode()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  alertmodalbgLayout: {
    width: "100%",
    position: "absolute",
  },
  titleLayout: {
    lineHeight: 22,
    fontSize: FontSize.typographyHeadingMedium_size,
  },
  text4Clr: {
    color: Color.primaryPink,
    fontFamily: FontFamily.typographyBodyMediumRegular,
    fontWeight: "400",
  },
  alertmodalbg: {
    backgroundColor: Color.labelColorLightPrimary,

    height: "100%",
    overflow: "hidden",
  },
  text: {
    fontSize: FontSize.size_13xl,
    lineHeight: 42,
    fontFamily: FontFamily.sFProDisplayRegular,
    textAlign: "center",
    color: Color.labelColorDarkPrimary,
  },
  code: {
    paddingHorizontal: Padding.p_base,
    flexDirection: "row",
    width: "100%",
    marginTop: 50,
  },
  enterTheVerification: {
    fontWeight: "300",
    color: Color.primaryAlmostGrey,
  },
  title2: {
    alignSelf: "stretch",
    marginTop: 8,
    textAlign: "left",
  },
  verifyscreen: {
    backgroundColor: Color.labelColorDarkPrimary,
    width: "100%",
    overflow: "hidden",
    flex: 1,
  },
});
