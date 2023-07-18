import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";

const AccountUpdatedModel = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.alert, styles.alertFlexBox]}>
      <View style={[styles.content, styles.alertFlexBox]}>
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/icon.png")}
        />
        <View style={[styles.titleParent, styles.alertFlexBox]}>
          <Text style={styles.title}>Account Updated!</Text>
          <Text
            style={styles.title1}
          >{`Keep in mind you can always edit your information under account settings. `}</Text>
        </View>
      </View>
      <View style={styles.iconsaxlinearclosecircle}>
        <TouchableOpacity
          style={styles.vector}
          activeOpacity={0.2}
          onPress={() => navigation.navigate("WelcomeScreen")}
        >
          <Image
            style={[styles.icon1, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/vector1.png")}
          />
        </TouchableOpacity>
        <Image
          style={[styles.vectorIcon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/vector2.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  alertFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  icon: {
    width: 43,
    height: 39,
  },
  title: {
    fontSize: FontSize.typographyHeadingMedium_size,
    lineHeight: 22,
    fontWeight: "700",
    fontFamily: FontFamily.typographyBodySmallBold,
    color: Color.primarySoBlack,
    width: "100%",
    textAlign: "center",
  },
  title1: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "300",
    fontFamily: FontFamily.typographyBodyMediumLight,
    color: "#8A8A8A",
    width: 235,
    marginTop: 8,
    textAlign: "center",
  },
  titleParent: {
    marginTop: 24,
  },
  content: {
    alignSelf: "stretch",
    zIndex: 0,
  },
  icon1: {
    height: "100%",
    width: "100%",
    opacity: 0.2,
  },
  vector: {
    left: "5.21%",
    top: "5.21%",
    right: "5.21%",
    bottom: "5.21%",
    width: "89.58%",
    height: "89.58%",
    position: "absolute",
  },
  vectorIcon: {
    height: "29.82%",
    width: "29.82%",
    top: "35.09%",
    right: "35.09%",
    bottom: "35.09%",
    left: "35.09%",
    position: "absolute",
  },
  iconsaxlinearclosecircle: {
    top: 8,
    left: 295,
    width: 24,
    height: 24,
    zIndex: 1,
    overflow: "hidden",
    position: "absolute",
  },
  alert: {
    borderRadius: 20,
    backgroundColor: Color.labelColorDarkPrimary,
    shadowColor: "rgba(27, 27, 27, 0.16)",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 16,
    elevation: 16,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 1,
    width: 327,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_13xl,
  },
});

export default AccountUpdatedModel;
