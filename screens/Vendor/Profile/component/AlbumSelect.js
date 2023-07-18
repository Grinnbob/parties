import * as React from "react";
import { ImageBackground, StyleSheet, Text, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  Padding,
  FontFamily,
  Color,
  FontSize,
  Border,
} from "../../../../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const AlbumSelect = ({ title, asset }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("AlbumNavigator", {
          screen: "Holiday",
          params: {
            title: title,
          },
        })
      }
    >
      <ImageBackground
        style={styles.boxcontainer}
        resizeMode="cover"
        source={asset}
      >
        <Text style={[styles.favorites, styles.title1FlexBox]}>{title}</Text>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title1FlexBox: {
    textAlign: "center",
    color: Color.labelColorDarkPrimary,
  },
  bgIcon: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  favorites: {
    marginTop: 8,
    fontFamily: FontFamily.typographyBodySmallBold,
    fontWeight: "700",
    fontSize: FontSize.textLargeBold_size,
    textAlign: "center",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  boxcontainer: {
    borderRadius: 16,
    minWidth: 155,
    height: 155,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
});

export default AlbumSelect;
