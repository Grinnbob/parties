import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MidGradientButton from "../../components/MidGradientButton";
import { useToast } from "native-base";
import {
  Color,
  FontSize,
  Padding,
  Border,
  FontFamily,
} from "../../GlobalStyles";
import apis from "../../apis";
import { PhoneMask } from "../../components/Input/BasicMasks";
import DismissKeyboard from "../../layouts/DismissKeyboard";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [phoneMasked, setPhoneMasked] = useState("");
  const [phone, setPhone] = useState("");

  const handleNext = async () => {
    try {
      setIsLoading(true);
      const resp = await apis.auth.forgotPasswordCodeRequest({ phone: phone });
      console.log("RESP", resp);
      if (resp && resp.success === false) {
        toast.show({
          placement: "top",
          description: resp.message,
        });
        setIsLoading(false);
      }
      setIsLoading(false);
      if (resp && resp.success) {
        navigation.navigate("VerifyScreen", {
          phone: phone,
          phoneMasked: phoneMasked,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.forgotpasswordscreen}>
        <View style={[styles.alertmodalbg, styles.alertmodalbgLayout]} />
        <View style={{ flex: 1, justifyContent: "space-between", padding: 20 }}>
          <View style={{ width: "100%", marginBottom: 30 }}>
            <View style={styles.accessoryPosition}>
              <View style={styles.backLayout}>
                <TouchableOpacity
                  style={styles.vector}
                  activeOpacity={0.2}
                  onPress={() => navigation.navigate("LoginScreen")}
                >
                  <Image
                    style={styles.icon1}
                    resizeMode="cover"
                    source={require("../../assets/vector14.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: 30 }}>
              <Text style={[styles.title1, styles.titleClr]}>
                Forgot Password
              </Text>
              <Text style={[styles.title2, styles.titleLayout]}>
                We’ll text you a link to reset your password
              </Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <PhoneMask
                value={phone}
                onChangeText={(masked, unMasked) => {
                  setPhoneMasked(masked);
                  setPhone(unMasked);
                }}
                returnKeyType="default"
                blurOnSubmit={true}
              />
            </View>
          </View>
          <View
            style={{ width: "100%", alignItems: "center", marginBottom: 30 }}
          >
            <MidGradientButton
              onPress={handleNext}
              isLoading={isLoading}
              // disabled={!phone}
              label="Send"
              formBackgroundColor="rgba(255, 255, 255, 0.1)"
              labelColor="#fff"
            />
          </View>
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
  iconLayout: {
    width: 21,
    display: "none",
  },
  titleClr: {
    color: Color.textMainWhite,
    fontWeight: "700",
  },
  titleLayout: {
    lineHeight: 22,
    fontSize: 16,
  },
  accessoryPosition: {
    paddingBottom: Padding.p_4xs,
    paddingTop: Padding.p_4xs,
    alignItems: "center",
    flexDirection: "row",
  },
  backLayout: {
    marginTop: 20,
    height: 40,
    width: 40,
  },
  alertmodalbg: {
    backgroundColor: Color.labelColorLightPrimary,
    height: "100%",
    overflow: "hidden",
  },
  icon: {
    backgroundColor: Color.dimgray_200,
    height: 21,
  },
  form: {
    borderRadius: Border.br_5xs,
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    width: "90%",
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_base,
    marginTop: 50,
  },
  title1: {
    fontSize: 28,
    fontFamily: FontFamily.textLargeBold,
    textAlign: "left",
  },
  title2: {
    fontWeight: "300",
    fontFamily: FontFamily.typographyBodyMediumLight,
    color: Color.primaryAlmostGrey,
    marginTop: 8,
    textAlign: "left",
  },
  icon: {
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  vector: {
    width: 17,
    height: 12,
    marginTop: 10,
    marginLeft: 5,
  },
  leftAccessory: {},
  topnavigationContent: {
    height: 56,
    marginTop: 30,
  },
  forgotpasswordscreen: {
    backgroundColor: Color.labelColorDarkPrimary,
    overflow: "hidden",
    width: "100%",
    flex: 1,
  },
});

export default ForgotPasswordScreen;
