import React, { useMemo } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
} from "react-native";
import { Border, FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const InspirationCard = ({
  propMarginLeft,
  propOpacity,
  img,
  whiteAndSparkleMasquerade,
  whiteAndSparkleMasqueradeHeight,
}) => {
  const view2Style = useMemo(() => {
    return {
      ...getStyleValue("marginLeft", propMarginLeft),
      ...getStyleValue("opacity", propOpacity),
    };
  }, [propMarginLeft, propOpacity]);

  const whiteAndSparkleStyle = useMemo(() => {
    return {
      ...getStyleValue("height", whiteAndSparkleMasqueradeHeight),
    };
  }, [whiteAndSparkleMasqueradeHeight]);

  return (
    <View style={[styles.view, view2Style]}>
      <Image style={styles.imgIcon} resizeMode="cover" source={img} />
      <View style={styles.detail}>
        <Text style={[styles.whiteAndSparkle, whiteAndSparkleStyle]}>
          {whiteAndSparkleMasquerade}
        </Text>
        <View style={styles.detail1}>
          <View style={styles.stRow}>
            <View style={styles.dateFlexBox}>
              <Image
                style={styles.iconsaxlinearcalendar}
                resizeMode="cover"
                source={require("../assets/iconsaxlinearcalendar.png")}
              />
              <Text style={styles.jan302023}>Jan 30 2023</Text>
            </View>
            <View style={styles.dateFlexBox}>
              <Image
                style={styles.iconsaxlinearcalendar}
                resizeMode="cover"
                source={require("../assets/iconsaxlinearclock.png")}
              />
              <Text style={styles.jan302023}>8:00 PM</Text>
            </View>
          </View>
          <View style={[styles.ndRow, styles.dateFlexBox]}>
            <View style={styles.dateFlexBox}>
              <Image
                style={styles.iconsaxlinearcalendar}
                resizeMode="cover"
                source={require("../assets/iconsaxlinearcalendar.png")}
              />
              <Text style={styles.jan302023}>Huntington Beach. CA</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dateFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  imgIcon: {
    borderRadius: Border.br_5xs,
    maxWidth: "100%",
    height: 150,
    width: "100%",
    overflow: "hidden",
    alignSelf: "stretch",
  },
  whiteAndSparkle: {
    fontSize: FontSize.typographyHeadingMedium_size,
    lineHeight: 19,
    fontWeight: "700",
    fontFamily: FontFamily.textLargeBold,
    color: Color.labelColorDarkPrimary,
    height: 38,
    textAlign: "left",
    alignSelf: "stretch",
  },
  iconsaxlinearcalendar: {
    width: 16,
    height: 16,
    overflow: "hidden",
  },
  jan302023: {
    fontSize: FontSize.typographyBodySmallBold_size,
    lineHeight: 14,
    fontFamily: FontFamily.sFProDisplayRegular,
    color: Color.primaryAlmostGrey,
    marginLeft: 8,
    textAlign: "left",
  },
  stRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  ndRow: {
    width: 311,
    marginTop: 8,
  },
  detail1: {
    marginTop: 8,
    alignSelf: "stretch",
  },
  detail: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_5xs,
    marginTop: 8,
    alignSelf: "stretch",
  },
  view: {
    borderRadius: Border.br_base,
    backgroundColor: Color.gray_700,
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 1,
    width: 256,
    height: 292,
    padding: Padding.p_base,
    marginLeft: 16,
  },
});

export default InspirationCard;
