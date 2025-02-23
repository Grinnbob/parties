import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  ActivityIndicator,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FontFamily, Border, FontSize, Color } from "../../GlobalStyles";

export default ({
  title,
  enable,
  onPress = () => {},
  handlePressIn = () => {},
  loading,
}) => {
  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      style={[
        styles.button,
        {
          borderWidth: !enable ? 1 : 0,
          borderColor: !enable ? "rgba(255, 255, 255, 0.2)" : "transparent",
        },
      ]}
    >
      <LinearGradient
        style={[
          styles.vendor,
          styles.shadowGradient,
          {
            paddingVertical: enable ? 3 : 0,
            paddingHorizontal: enable ? 3 : 0,
            width: enable ? 333 : 327,
            borderRadius: 22,
          },
        ]}
        locations={[0, 1]}
        colors={
          enable
            ? ["rgba(108, 27, 158, 1)", "rgba(255, 7, 126, 1)"]
            : ["transparent", "transparent"]
        }
        useAngle={true}
        angle={-90}
      >
        <View
          style={{
            backgroundColor: enable ? "#000" : "transparent",
            borderRadius: 20,
          }}
        >
          <LinearGradient
            style={[styles.vendor, styles.vendorShadowBox]}
            locations={[0, 1]}
            colors={
              enable
                ? ["rgba(108, 27, 158, 0.2)", "rgba(255, 7, 126, 0.2)"]
                : ["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.1)"]
            }
            useAngle={true}
            angle={-90}
          >
            <Text style={[styles.iamAParty, styles.partyTypo]}>{title}</Text>
            {loading && (
              <ActivityIndicator
                color={Color.textMainWhite}
                size={16}
                style={styles.activityIndicator}
              />
            )}
          </LinearGradient>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  vendorShadowBox: {
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 40,
    flexDirection: "row",
    width: 327,
    shadowOpacity: 1,
    elevation: 16,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowColor: "rgba(27, 27, 27, 0.16)",
    borderRadius: 20,
    alignItems: "center",
  },
  shadowGradient: {
    justifyContent: "center",

    flexDirection: "row",

    shadowOpacity: 1,
    elevation: 16,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowColor: "rgba(27, 27, 27, 0.16)",

    alignItems: "center",
  },
  partyTypo: {
    textTransform: "uppercase",
    letterSpacing: 2,
    lineHeight: 22,
    fontSize: FontSize.typographyHeadingMedium_size,
    textAlign: "center",
    color: Color.labelColorDarkPrimary,
  },
  iamAParty: {
    fontFamily: FontFamily.typographyBodySmallBold,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  vendor: {
    backgroundColor: Color.appColorGradient,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  activityIndicator: {
    position: "absolute",
    bottom: 16,
  },
});
