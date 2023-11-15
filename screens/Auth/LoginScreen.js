import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Text, useToast, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import {
  FontSize,
  FontFamily,
  Padding,
  Color,
  Border,
} from "../../GlobalStyles";
import MidGradientButton from "../../components/MidGradientButton";
import Email from "../../assets/email.svg";
import apis from "../../apis";
import StateTypes from "../../stateManagement/StateTypes";
import useGlobalState from "../../stateManagement/hook";
import loadApp from "../../navigation/loadApp";
import LabelInput from "../../components/Input/LabelInput";
import PasswordInput from "../../components/Input/PasswordInput";
import DismissKeyboard from "../../layouts/DismissKeyboard";

const LoginScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useGlobalState(
    StateTypes.token.key,
    StateTypes.token.default
  );
  const [user, setUser] = useGlobalState(
    StateTypes.user.key,
    StateTypes.user.default
  );

  const login = async () => {
    try {
      setIsLoading(true);
      console.log("email, password", email, password);
      const res = await apis.auth.signIn({ email, password });
      console.log("RES SIGN IN", res);
      if (res && res.success === false) {
        toast.show({
          placement: "top",
          description: res.message,
        });
        setIsLoading(false);
      }

      if (!res || (res && !res.success)) {
        setIsLoading(false);
        return;
      }
      await loadApp(setToken, setUser);
    } catch (error) {
      console.log(error);
      toast.show({
        description: "Something went wrong. Please try again.",
      });
      setIsLoading(false);
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.loginscreen}>
        <Image
          style={[styles.bgIcon, styles.bgIconPosition]}
          resizeMode="cover"
          source={require("../../assets/bg11.png")}
        />

        {/* <View style={[styles.alertmodaljpgBg, styles.alertmodaljpgBgLayout]} /> */}
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <TouchableOpacity
              style={styles.vector}
              activeOpacity={0.2}
              onPress={() => navigation.navigate("WelcomeScreen")}
            >
              <Image
                style={styles.icon}
                resizeMode="cover"
                source={require("../../assets/vector14.png")}
              />
            </TouchableOpacity>
            <Text style={styles.title}>Sign In</Text>
            <View style={styles.forms}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <VStack my={2} width="100%">
                  <LabelInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    returnKeyType="default"
                    blurOnSubmit={true}
                    label="Email"
                    variant="underlined"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder={"Email"}
                    LeftComponent={<Email />}
                    color="#FFF"
                  />
                </VStack>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <VStack my={2} width="100%">
                  <PasswordInput
                    placeholder="Password"
                    variant="underlined"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                    }}
                    returnKeyType="default"
                    blurOnSubmit={true}
                  />
                </VStack>
              </View>
            </View>
            <TouchableOpacity
              style={styles.forgotPassword}
              activeOpacity={0.2}
              onPress={() => navigation.navigate("ForgotPasswordScreen")}
            >
              <Text style={styles.forgotPassword1}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttons}>
            <MidGradientButton
              onPress={login}
              isLoading={isLoading}
              label="Sign In"
              formPosition="unset"
              formTop="unset"
              formLeft="unset"
              formBackgroundColor="unset"
              formMarginTop="unset"
              labelColor="#fff"
            />
            <Pressable onPress={() => navigation.navigate("SignUpScreen")}>
              <Text style={styles.alreadyHaveAnContainer}>
                <Text style={styles.alreadyHaveAnAccount}>
                  <Text style={styles.alreadyHaveAn}>
                    Already have an account?
                  </Text>
                  <Text style={styles.textTypo}>{` `}</Text>
                </Text>
                <Text style={styles.signIn}>Sign In</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  alertmodaljpgBgLayout: {
    width: "100%",
    position: "absolute",
  },
  bgIconPosition: {
    height: "100%",
  },
  bgIcon: {
    width: "100%",
    display: "none",
    position: "absolute",
  },

  labelTypo: {
    lineHeight: 22,
    fontSize: FontSize.typographyHeadingMedium_size,
    textAlign: "center",
    fontFamily: FontFamily.typographyBodyMediumRegular,
  },
  background: {
    width: "100%",
    height: "100%",
  },

  formBorder: {
    paddingVertical: Padding.p_base,
    paddingHorizontal: 0,
    flexDirection: "row",
    alignItems: "center",
    width: 327,
    paddingLeft: 10,
    color: "#FFF",
  },
  backLayout: {
    marginTop: 20,
    marginLeft: 15,
    width: 40,
    height: 40,
  },
  textTypo: {
    fontFamily: FontFamily.typographyBodySmallBold,
    fontWeight: "700",
  },
  alertmodaljpgBg: {
    height: "100%",
    // overflow: "hidden",
  },
  label: {
    color: Color.dimgray_100,
    textAlign: "center",
    fontFamily: FontFamily.typographyBodyMediumRegular,
  },
  form: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.gray_600,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 15,
    elevation: 15,
    shadowOpacity: 1,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_xs,
    justifyContent: "center",
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    width: 327,
  },
  alreadyHaveAn: {
    fontWeight: "300",
    fontFamily: FontFamily.typographyBodyMediumLight,
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
    marginBottom: 20,
    width: "100%",
  },
  form2: {
    marginTop: 16,
    paddingLeft: 10,
  },
  forms: {
    padding: 20,
  },
  forgotPassword1: {
    fontSize: FontSize.size_smi,
    lineHeight: 17,
    textAlign: "right",
    textShadowColor: "rgba(0, 0, 0, 0.15)",
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 15,
    color: Color.textMainWhite,
    fontFamily: FontFamily.typographyBodyMediumRegular,
  },
  forgotPassword: {
    paddingRight: 25,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: FontFamily.textLargeBold,
    textAlign: "left",
    fontWeight: "700",
    color: Color.textMainWhite,
    padding: 20,
    marginTop: 40,
  },
  icon: {
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  vector: {
    width: 17,
    height: 12,
    marginTop: 55,
    marginLeft: 25,
  },
  loginscreen: {
    overflow: "hidden",
    // height: "100%",
    width: "100%",
    flex: 1,
  },
});

export default LoginScreen;
