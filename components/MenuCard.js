import React, { useMemo } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
} from "react-native";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const MenuCard = ({ propMarginTop, icon, title, propWidth, propAlignSelf }) => {
  const viewStyle = useMemo(() => {
    return {
      ...getStyleValue("marginTop", propMarginTop),
      ...getStyleValue("width", propWidth),
      ...getStyleValue("alignSelf", propAlignSelf),
    };
  }, [propMarginTop, propWidth, propAlignSelf]);

  return (
    <View style={[styles.view, viewStyle]}>
      <Image
        style={styles.iconsaxlinearbaghappy}
        resizeMode="cover"
        source={icon}
      />
      <Text style={styles.yourJobs}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconsaxlinearbaghappy: {
    width: 20,
    height: 20,
    overflow: "hidden",
  },
  yourJobs: {
    fontSize: FontSize.typographyHeadingMedium_size,
    lineHeight: 22,
    fontFamily: FontFamily.typographyBodyMediumRegular,
    color: Color.labelColorDarkPrimary,
    textAlign: "left",
    marginLeft: 16,
  },
  view: {
    width: 327,
    flexDirection: "row",
    paddingHorizontal: 0,
    paddingVertical: Padding.p_base,
    alignItems: "center",
  },
});

export default MenuCard;
