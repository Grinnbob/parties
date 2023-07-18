import React, { useMemo } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
} from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const ServiceTypeCard = ({
  img,
  partyDecorations,
  partyDecorationsLeft,
  partyDecorationsTop,
  partyDecorationsHeight,
  partyDecorationsFontSize,
  partyDecorationsLineHeight,
  partyDecorationsFontFamily,
  partyDecorationsWidth,
}) => {
  const partyDecorationsStyle = useMemo(() => {
    return {
      ...getStyleValue("left", partyDecorationsLeft),
      ...getStyleValue("top", partyDecorationsTop),
      ...getStyleValue("height", partyDecorationsHeight),
      ...getStyleValue("fontSize", partyDecorationsFontSize),
      ...getStyleValue("lineHeight", partyDecorationsLineHeight),
      ...getStyleValue("fontFamily", partyDecorationsFontFamily),
      ...getStyleValue("width", partyDecorationsWidth),
    };
  }, [
    partyDecorationsLeft,
    partyDecorationsTop,
    partyDecorationsHeight,
    partyDecorationsFontSize,
    partyDecorationsLineHeight,
    partyDecorationsFontFamily,
    partyDecorationsWidth,
  ]);

  return (
    <View style={styles.img}>
      <Image style={styles.imgIcon} resizeMode="cover" source={img} />
      <Text style={[styles.partyDecorations, partyDecorationsStyle]}>
        {partyDecorations}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  imgIcon: {
    top: 0,
    left: 0,
    width: 156,
    position: "absolute",
    height: 156,
  },
  partyDecorations: {
    top: 100,
    left: 15,
    fontSize: FontSize.typographyHeadingMedium_size,
    lineHeight: 22,
    fontWeight: "700",
    fontFamily: FontFamily.typographyBodySmallBold,
    color: Color.labelColorDarkPrimary,
    textAlign: "left",
    width: 105,
    height: 38,
    position: "absolute",
  },
  img: {
    alignSelf: "stretch",
    height: 156,
  },
});

export default ServiceTypeCard;
