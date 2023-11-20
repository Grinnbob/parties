import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Padding, Color, FontSize, FontFamily } from "../../GlobalStyles";
import { Text, VStack, useToast } from "native-base";

import apis from "../../apis";
import VerifyCodeInput from "../../components/Input/VerifyCodeInput";
import VerifyCheck from "../../assets/onboard/checkpink.svg";

const VerifyScreen = ({ route, navigation }) => {
  const toast = useToast();
  const [passcode, setPasscode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { phone, phoneMasked } = route.params;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleVerifyCode = async (txt) => {
    setIsLoading(true);
    setShowError(false);
    const res = await apis.auth.forgotPasswordCodeVerify({
      phone,
      passcode: txt,
    });
    if (res && res.success === false) {
      toast.show({
        placement: "top",
        description: res.message,
      });
      setIsLoading(false);
    }
    // setIsLoading(false);
    if (res.success) {
      setIsVerified(true);
      setTimeout(() => {
        navigation.navigate("AccountSettingScreen", { id: res.user });
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
          justifyContent: "space-between",
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
        {isKeyboardVisible && (
          <VStack alignSelf="center">
            <Text
              color="#89939E"
              fontSize={14}
              fontWeight={"400"}
              onPress={() => {
                if (!isLoading) onResendPress();
              }}
            >
              Didn’t recieve a text message?
            </Text>
          </VStack>
        )}
      </VStack>
    );
  };
  const Verified = () => {
    return (
      <VStack
        style={{
          flex: 1,
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <VerifyCheck />
      </VStack>
    );
  };

  return (
    <View style={styles.verifyscreen}>
      <Image
        style={[styles.background, styles.bgIconPosition]}
        resizeMode="cover"
        source={require("../../assets/bg16.png")}
      />
      {/* <View style={[styles.alertmodalbg, styles.alertmodalbgLayout]} /> */}
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View>
          <TouchableOpacity
            style={styles.leftAccessory}
            onPress={() => navigation.goBack()}
          >
            <Image
              style={styles.backIconLayout}
              resizeMode="cover"
              source={require("../../assets/back.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.title}>
          <VStack py="5" pt="35">
            <Text fontSize={30} fontWeight={"700"} color={"white"}>
              {isVerified ? "Verification Successful" : "Verify Your Account"}
            </Text>
            <Text style={[styles.title2, styles.titleLayout]}>
              <Text
                style={styles.enterTheVerification}
              >{`Enter the verification code sent to`}</Text>
            </Text>
            <Text style={styles.text4Clr}>{phoneMasked}</Text>
          </VStack>
        </View>
        {isVerified ? Verified() : EnterPasscode()}
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
  background: {
    width: "100%",
    height: "100%",
  },
  bgIconPosition: {
    left: 0,
    position: "absolute",
  },
  backIconLayout: {
    marginTop: 40,
    height: 40,
    width: 40,
  },
  text4Clr: {
    color: Color.primaryPink,
    fontFamily: FontFamily.typographyBodyMediumRegular,
    fontWeight: "400",
  },
  alertmodalbg: {
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
  title1: {
    fontSize: 28,
    textAlign: "left",
    fontWeight: "700",
    color: Color.labelColorDarkPrimary,
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
  title: {
    marginLeft: 19,
  },
  leftAccessory: {
    paddingLeft: Padding.p_base,
    paddingRight: Padding.p_4xs,
    // left: 0,
  },
  verifyscreen: {
    width: "100%",
    overflow: "hidden",
    flex: 1,
  },
});

export default VerifyScreen;
