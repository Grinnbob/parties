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
import useGlobalState from "../../stateManagement/hook";
import types from "../../stateManagement/types";
import StateTypes from "../../stateManagement/StateTypes";
import { PhoneMask } from "../../components/Input/BasicMasks";
import DismissKeyboard from "../../layouts/DismissKeyboard";

const EnterPhone = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [phoneMasked, setPhoneMasked] = useState("");
  const [token, setToken] = useGlobalState(
    StateTypes.token.key,
    StateTypes.token.default
  );

  const [phone, setPhone] = useGlobalState(
    types.updateTypes.phone.key,
    types.updateTypes.phone.default
  );

  const handleNext = async () => {
    try {
      setIsLoading(true);
      const res = await apis.auth.passcodeRequest({ phone: phone });
      console.log("RES", res);
      setIsLoading(false);
      if (res && res.success === false) {
        toast.show({
          placement: "top",
          description: res.message,
        });
        setIsLoading(false);
      }
      if (res && res.success) {
        setPhone(types.updateTypes.phone.default);
        navigation.navigate("Verify", { phone, phoneMasked });
      }
    } catch (error) {
      toast.show({
        placement: "top",
        description: error,
      });
    }
  };

  const handleBack = async () => {
    await apis.device.deleteById(setToken);
  };

  return (
    <DismissKeyboard>
      <View style={styles.forgotpasswordscreen}>
        <Image
          style={[styles.background, styles.bgIconPosition]}
          resizeMode="cover"
          source={require("../../assets/bg16.png")}
        />
        <View style={[styles.alertmodalbg, styles.alertmodalbgLayout]} />
        <View style={{ flex: 1, justifyContent: "space-between", padding: 20 }}>
          <View style={{ width: "100%", marginBottom: 30 }}>
            <View style={styles.header}>
              <View style={styles.backLayout}>
                <TouchableOpacity
                  style={styles.vector}
                  activeOpacity={0.2}
                  onPress={handleBack}
                >
                  <Image
                    style={styles.icon1}
                    resizeMode="cover"
                    source={require("../../assets/vector14.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginVertical: 35 }}>
              <Text style={[styles.title1, styles.titleClr]}>
                Verify your Account
              </Text>
              <Text style={[styles.title2, styles.titleLayout]}>
                Enter your phone number to receive a {"\n"}verification code via
                SMS
              </Text>
            </View>
            <PhoneMask
              value={phone}
              onChangeText={(masked, unMasked) => {
                setPhoneMasked(masked);
                setPhone(unMasked);
              }}
              returnKeyType="done"
              blurOnSubmit={true}
              keyboardType="numeric"
            />
          </View>
          <View
            style={{ width: "100%", alignItems: "center", marginBottom: 30 }}
          >
            <MidGradientButton
              onPress={handleNext}
              isLoading={isLoading}
              disabled={!phone || phone.length < 10}
              label="Next"
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
  header: {
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
    height: "100%",
    overflow: "hidden",
  },
  icon: {
    backgroundColor: Color.dimgray_200,
    height: 21,
  },
  background: {
    width: "100%",
    height: "100%",
  },
  bgIconPosition: {
    left: 0,
    position: "absolute",
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
    // backgroundColor: Color.labelColorDarkPrimary,
    overflow: "hidden",
    width: "100%",
    flex: 1,
  },
});

export default EnterPhone;
