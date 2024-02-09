import * as React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MidGradientButton from "../../../components/MidGradientButton";
import { FontSize, Padding, FontFamily, Color } from "../../../GlobalStyles";
import ReadySell from "../../../assets/readysell.svg";
import Store from "../../../assets/Storefront.svg";
import Check from "../../../assets/onboard/checkgreen.svg";
import { HStack } from "native-base";
import loadApp from "../../../navigation/loadApp";
import StateTypes from "../../../stateManagement/StateTypes";
import useGlobalState from "../../../stateManagement/hook";
import Close from "../../../assets/x.svg";

const VendorReadySell = ({ route }) => {
  const navigation = useNavigation();
  const [token, setToken] = useGlobalState(
    StateTypes.token.key,
    StateTypes.token.default
  );
  const [user, setUser] = useGlobalState(
    StateTypes.user.key,
    StateTypes.user.default
  );

  const onNext = async () => {
    await loadApp(setToken, setUser);
  };

  return (
    <View style={styles.signupscreen}>
      <ImageBackground
        style={[styles.background, styles.bgIconPosition]}
        resizeMode="cover"
        source={require("../../../assets/bg16.png")}
      />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View>
          <HStack
            justifyContent="flex-end"
            paddingRight={5}
            marginBottom={45}
            marginTop={10}
          />
          <View style={[styles.titlePosition]}>
            <ReadySell />
          </View>
          <View style={styles.titlePosition}>
            <Text style={styles.title1}>You are ready to sell!</Text>
            <Text style={[styles.title2, styles.titleLayout]}>
              You have successfully created {"\n"} your service profile page!
            </Text>
          </View>
          <HStack style={{ justifyContent: "center" }}>
            <View style={styles.formsicon}>
              <Store />
              <Check style={{ marginTop: 27 }} />
            </View>
            <View style={styles.forms}>
              <Text style={styles.formbold}>What's Next</Text>
              <Text style={styles.formgrey}>Find upcoming parties</Text>
            </View>
          </HStack>
        </View>
      </View>
      <View style={{ width: "100%", alignItems: "center", marginBottom: 30 }}>
        <MidGradientButton
          onPress={onNext}
          label="Add service package"
          formPosition="Next"
          formTop="unset"
          formLeft="unset"
          formBackgroundColor="rgba(255, 255, 255, 0.1)"
          formMarginTop="unset"
          labelColor="#FFF"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  alertmodalbgLayout: {
    width: "100%",
    position: "absolute",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  bgIconPosition: {
    left: 0,
    position: "absolute",
  },
  titlePosition: {
    width: "100%",
    alignItems: "center",
  },
  titleLayout: {
    lineHeight: 22,
    fontSize: FontSize.typographyHeadingMedium_size,
  },
  header: {
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
  alertmodalbg: {
    backgroundColor: Color.primarySoBlack,
    left: 0,
    top: 0,
    height: "100%",
    overflow: "hidden",
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: Color.primaryAlmostGrey,
  },
  form: {
    marginTop: 10,
    marginBottom: 20,
    color: "#FFF",
  },
  formgrey: {
    marginTop: 10,
    marginBottom: 20,
    color: "#8A8A8A",
  },
  formbold: {
    marginTop: 10,
    marginBottom: 20,
    color: "#FFF",
    fontWeight: "700",
  },
  forms: {
    alignItems: "flex-start",
    padding: 10,
  },
  formsicon: {
    alignItems: "center",
    padding: 10,
  },
  title1: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "700",
    color: Color.labelColorDarkPrimary,
    marginTop: 30,
  },
  title2: {
    alignSelf: "stretch",
    marginTop: 8,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: FontFamily.typographyBodyMediumLight,
    fontWeight: "400",
    fontSize: 15,
    color: "#8A8A8A",
  },
  leftAccessory: {
    paddingLeft: 10,
    paddingRight: Padding.p_4xs,
  },
  signupscreen: {
    backgroundColor: Color.labelColorLightPrimary,
    width: "100%",
    overflow: "hidden",
    flex: 1,
  },
});

export default VendorReadySell;
