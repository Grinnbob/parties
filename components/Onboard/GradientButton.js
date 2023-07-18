import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FontFamily, Border, FontSize, Color } from "../../GlobalStyles";

export default ({ title, enable, onPress = () => {} }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          borderWidth: !enable ? 1 : 0,
          borderColor: !enable ? "rgba(255, 255, 255, 0.2)" : "transparent",
        },
      ]}
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
      </LinearGradient>
    </TouchableOpacity>
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
    borderRadius: Border.br_base,
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
    borderRadius: 15,
    marginBottom: 10,
    marginTop: 10,
  },
});
