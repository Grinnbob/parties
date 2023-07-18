import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  ImageBackground,
  View,
  Pressable,
} from "react-native";
import {
  Padding,
  Border,
  Color,
  FontFamily,
  FontSize,
} from "../../GlobalStyles";

const Services = () => {
  return (
    <View style={styles.albumtypescreen}>
      {/* <Image
        style={styles.bgIcon}
        resizeMode="cover"
        source={require("../../../assets/bg15.png")}
      /> */}
      <View style={[styles.alertmodalbg, styles.alertmodalbgLayout]} />
      <View style={styles.topnavigationContent}>
        <Pressable
          style={[styles.leftAccessory]}
          onPress={() => navigation.pop()}
        >
          <Image
            style={styles.backIconLayout}
            resizeMode="cover"
            source={require("../../assets/back.png")}
          />
        </Pressable>
        <View>
          <Text>Last 30 Days</Text>
        </View>
      </View>
      <View style={{ padding: 22 }}>
        <Text style={styles.title1}>Services</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backIconLayout: {
    marginLeft: 5,
    height: 40,
    width: 40,
  },
  leftAccessory: {
    paddingLeft: Padding.p_base,
    alignItems: "center",
  },
  title1: {
    fontSize: 28,
    lineHeight: 29,
    fontWeight: "700",
    fontFamily: FontFamily.typographyBodySmallBold,
    color: Color.labelColorDarkPrimary,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  topnavigationContent: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 40,
  },
  bgIcon: {
    top: 0,
    width: 665,
    height: 905,
    left: 0,
    position: "absolute",
  },
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  albumtypescreen: {
    backgroundColor: Color.labelColorDarkPrimary,
    width: "100%",
    overflow: "hidden",
    flex: 1,
  },
  alertmodalbg: {
    backgroundColor: Color.labelColorLightPrimary,
    left: 0,
    top: 0,
    height: "100%",
    overflow: "hidden",
  },
  alertmodalbgLayout: {
    width: "100%",
    position: "absolute",
  },
});

export default Services;
