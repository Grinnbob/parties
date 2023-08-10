import React, { useEffect, useMemo, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import apis from "../apis";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const SearchServiceCard = ({
  cardsMarginTop,
  imgBg,
  manuelsRentals,
  btnShadowOffset,
  service,
  price,
  vendor,
}) => {
  const { navigate } = useNavigation();
  const [backgroundLink, setBackgroundLink] = useState("");
  const cardsStyle = useMemo(() => {
    return {
      ...getStyleValue("marginTop", cardsMarginTop),
    };
  }, [cardsMarginTop]);

  const btnStyle = useMemo(() => {
    return {
      ...getStyleValue("shadowOffset", btnShadowOffset),
    };
  }, [btnShadowOffset]);

  const getBackground = async () => {
    try {
      const res = await apis.document.getAll({
        VendorId: vendor?.id,
      });

      setBackgroundLink(res.data[0].link);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBackground();
  }, []);

  return (
    <View style={[styles.cards, cardsStyle]}>
      {backgroundLink ? (
        <ImageBackground
          style={styles.imgBgIcon}
          imageStyle={{ borderRadius: 18 }}
          resizeMode="cover"
          source={{ uri: backgroundLink }}
        />
      ) : (
        <View
          style={{
            backgroundColor: "grey",
            width: "100%",
            height: 134,
            borderRadius: 18,
          }}
        ></View>
      )}

      {/* <View
        style={{
          backgroundColor: "grey",
          width: "100%",
          height: 134,
          borderRadius: 18,
        }}
      ></View> */}
      {/* <View style={styles.priceWrapper}>
          <View style={[styles.price]}>
            <Text style={[styles.food, styles.miFlexBox]}>{service}</Text>
            <Text
              style={
                ([styles.food, styles.miFlexBox],
                { marginLeft: 4, color: "#FFF" })
              }
            >
              {price}
            </Text>
          </View>
        </View> */}
      {/* </ImageBackground> */}
      <View style={[styles.bottomSection, styles.btnFlexBox]}>
        <View style={styles.manuelsRentalsParent}>
          <Text style={[styles.manuelsRentals, styles.miFlexBox]}>
            {manuelsRentals}
          </Text>
          {/* <View style={[styles.rateDistance, styles.btnFlexBox]}>
            <Text style={[styles.mi, styles.miFlexBox]}>12.8 mi</Text>
            <View style={styles.stars}>
              <Image
                style={styles.vectorIconLayout}
                resizeMode="cover"
                source={require("../assets/vector4.png")}
              />
              <Image
                style={[styles.vectorIcon1, styles.vectorIconLayout]}
                resizeMode="cover"
                source={require("../assets/vector5.png")}
              />
              <Image
                style={[styles.vectorIcon1, styles.vectorIconLayout]}
                resizeMode="cover"
                source={require("../assets/vector6.png")}
              />
              <Image
                style={[styles.vectorIcon1, styles.vectorIconLayout]}
                resizeMode="cover"
                source={require("../assets/vector7.png")}
              />
              <Image
                style={[styles.vectorIcon1, styles.vectorIconLayout]}
                resizeMode="cover"
                source={require("../assets/vector8.png")}
              />
            </View>
          </View> */}
        </View>
        <LinearGradient
          style={[styles.btn, styles.btnFlexBox, btnStyle]}
          locations={[0, 1]}
          colors={["#6c1b9e", "#ff077e"]}
          useAngle={true}
          angle={-90}
        >
          <Pressable onPress={() => navigate("VendorInfo", { params: vendor })}>
            <Text style={styles.viewServices}>View Services</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  miFlexBox: {
    textAlign: "left",
    color: Color.labelColorDarkPrimary,
  },
  btnFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  vectorIconLayout: {
    height: 14,
    width: 14,
  },
  food: {
    textAlign: "left",
    lineHeight: 17,
    fontSize: FontSize.typographyBodySmallBold_size,
  },
  price: {
    flexDirection: "row",
  },
  priceWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.70)",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  imgBgIcon: {
    borderRadius: 18,
    height: 134,
    padding: 8,
  },
  manuelsRentals: {
    fontSize: FontSize.typographyBodyMediumBold_size,
    lineHeight: 20,
    fontFamily: FontFamily.typographyBodyMediumRegular,
    textAlign: "left",
  },
  mi: {
    fontWeight: "300",
    fontFamily: FontFamily.typographyBodyMediumLight,
    lineHeight: 17,
    fontSize: FontSize.typographyBodySmallBold_size,
  },
  vectorIcon1: {
    marginLeft: 2.7,
  },
  stars: {
    marginLeft: 8,
    flexDirection: "row",
  },
  rateDistance: {
    marginTop: 4,
  },
  manuelsRentalsParent: {
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_4xs,
    alignSelf: "stretch",
  },
  viewServices: {
    textAlign: "center",
    color: Color.labelColorDarkPrimary,
    fontFamily: FontFamily.typographyBodyMediumRegular,
    fontSize: FontSize.typographyBodySmallBold_size,
  },
  btn: {
    borderRadius: 30,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 15,
    elevation: 15,
    shadowOpacity: 1,
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: Padding.p_5xs,
    backgroundColor: Color.appColorGradient,
    justifyContent: "center",
  },
  bottomSection: {
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginTop: 10,
  },
  cards: {
    borderRadius: 24,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    overflow: "hidden",
    padding: 10,
    alignSelf: "stretch",
    marginBottom: 15,
  },
});

export default SearchServiceCard;
