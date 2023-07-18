import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Pressable, VStack, Text } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import {
  FontSize,
  Color,
  FontFamily,
  Padding,
  Border,
} from "../../GlobalStyles";
import apis from "../../apis";
import MidGradientButton from "../../components/MidGradientButton";
import Heart from "../../assets/heart.svg";
import Dots from "../../assets/DotsThree.svg";
import Export from "../../assets/export.svg";

const VendorProfileScreen = ({ route, navigation }) => {
  const [vendorProfile, setVendorProfile] = useState();
  const [service, setService] = useState([]);
  const [food, setFood] = useState([]);
  const [partyRental, setPartyRental] = useState([]);
  const [bartend, setBartend] = useState([]);
  const [backgroundLink, setBackgroundLink] = useState("");

  const handleCall = () => {
    Linking.openURL(`tel:${vendorProfile.phoneNumber}`);
  };

  const getService = async () => {
    const res = await apis.service.getAll({ VendorId: vendorProfile?.id });
    console.log("RES", res);
    setService(res.data);
  };

  const getBackground = async () => {
    try {
      const res = await apis.document.getAll({
        VendorId: vendorProfile?.id,
      });

      setBackgroundLink(res.data[0].link);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (route) {
      setVendorProfile(route?.params?.params);
    }
  }, [route]);

  useEffect(() => {
    if (vendorProfile && vendorProfile?.id) {
      getService();
      getBackground();
    }
  }, [vendorProfile]);

  return (
    <ScrollView
      style={{ backgroundColor: "#000", minHeight: "100%" }}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.vendorprofilescreen, styles.progressIconLayout]}>
        <ImageBackground
          style={[
            styles.vendorprofilescreenChild,
            styles.topnavigationContentLayout,
          ]}
          resizeMode="cover"
          source={{ uri: backgroundLink }}
        >
          <View
            style={{
              height: 300,
              width: "100%",
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 50,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Pressable onPress={() => navigation.pop()}>
                  <Image
                    style={styles.backIcon}
                    resizeMode="cover"
                    source={require("../../assets/back3.png")}
                  />
                </Pressable>
                <View
                  style={{
                    width: 20,
                    height: 20,
                  }}
                ></View>
              </View>
              {/* <View style={{ flexDirection: "row" }}>
                <Pressable
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Heart />
                </Pressable>
                <Pressable
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 10,
                  }}
                >
                  <Dots />
                </Pressable>
              </View> */}
            </View>
          </View>

          <View style={{ alignItems: "center" }}>
            <Text style={[styles.titlemain, styles.descriptionTypo]}>
              {vendorProfile?.name}
            </Text>
          </View>
        </ImageBackground>
        <LinearGradient
          style={styles.vendorDesc}
          locations={[0, 1]}
          colors={["#000", "#000"]}
          useAngle={true}
          angle={180}
        >
          {/* <View style={styles.user}>
            <View style={styles.title4}>
              <View style={styles.starsParent}>
                <View style={styles.stars}>
                  <Image
                    style={styles.vectorIconLayout}
                    resizeMode="cover"
                    source={require("../../assets/vector9.png")}
                  />
                  <Image
                    style={[styles.vectorIcon1, styles.vectorIconLayout]}
                    resizeMode="cover"
                    source={require("../../assets/vector10.png")}
                  />
                  <Image
                    style={[styles.vectorIcon1, styles.vectorIconLayout]}
                    resizeMode="cover"
                    source={require("../../assets/vector11.png")}
                  />
                  <Image
                    style={[styles.vectorIcon1, styles.vectorIconLayout]}
                    resizeMode="cover"
                    source={require("../../assets/vector12.png")}
                  />
                  <Image
                    style={[styles.vectorIcon1, styles.vectorIconLayout]}
                    resizeMode="cover"
                    source={require("../../assets/vector13.png")}
                  />
                </View>
                <Text style={[styles.text, styles.textLayout]}>4.1</Text>
              </View>
              <Text style={[styles.totalServiced0, styles.youClr]}>
                Serviced {count} parties
              </Text>
            </View>
            <Export />
          </View> */}

          <View style={[styles.desc, styles.descBorder]}>
            <Text style={[styles.description, styles.descriptionTypo]}>
              Vendor Description
            </Text>
            <Text style={[styles.iProvideFood, styles.iProvideFoodTypo]}>
              {vendorProfile?.description}
            </Text>
          </View>
          <View
            style={{ width: "100%", alignItems: "center", marginBottom: 20 }}
          >
            <MidGradientButton
              onPress={handleCall}
              label="Call"
              formBackgroundColor="rgba(255, 255, 255, 0.1)"
              formMarginTop="unset"
              labelColor="#FFF"
            />
          </View>
          <FlatList
            horizontal={false}
            data={service}
            ListHeaderComponent={
              <VStack
                flexDirection={"row"}
                justifyContent={"space-between"}
                paddingVertical={14}
              >
                <Text color="#FFF" fontSize={16} fontWeight={"700"}>
                  Service Package
                </Text>
                <Text color="#8A8A8A" fontSize={12} fontWeight={"300"}>
                  Flexible Payments
                </Text>
              </VStack>
            }
            renderItem={({ item }) => (
              <>
                <Pressable
                  style={{
                    width: "100%",
                    height: 150,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: "#FFF",
                    marginRight: 10,
                    marginBottom: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#323232",
                        borderTopLeftRadius: 16,
                        height: 45,
                        width: "40%",
                        paddingLeft: 15,
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFF",
                          fontSize: 10,
                          paddingTop: 5,
                        }}
                      >
                        Starting at
                      </Text>
                      <Text style={{ color: "#FFF", fontSize: 10 }}>
                        ${item.price}/ {item.rate}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: "#FF077E",
                        borderTopRightRadius: 16,
                        height: 45,
                        width: "60%",
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFF",
                          paddingTop: 5,
                          paddingLeft: 5,
                          fontWeight: "700",
                        }}
                        numberOfLines={2}
                        ellipsizeMode={"tail"}
                      >
                        {item.name}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      color: "#FFF",
                      marginTop: 5,
                      marginLeft: 25,
                    }}
                    numberOfLines={2}
                    ellipsizeMode={"tail"}
                  >
                    {item.description}
                  </Text>
                </Pressable>
              </>
            )}
            ListEmptyComponent={
              <Text style={[styles.youHaventAdd, styles.youClr]}>
                No service available
              </Text>
            }
          />
          {/* <FlatList
            horizontal={false}
            data={partyRental}
            ListHeaderComponent={
              <VStack
                flexDirection={"row"}
                justifyContent={"space-between"}
                paddingVertical={14}
              >
                <Text color="#FFF" fontSize={16} fontWeight={"700"}>
                  Party Rentals
                </Text>
                <Text color="#8A8A8A" fontSize={12} fontWeight={"300"}>
                  Flexible Payments
                </Text>
              </VStack>
            }
            renderItem={({ item }) => (
              <>
                <Pressable
                  style={{
                    width: "100%",
                    height: 150,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: "#FFF",
                    marginRight: 10,
                    marginBottom: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#323232",
                        borderTopLeftRadius: 16,
                        height: 45,
                        width: "40%",
                        paddingLeft: 15,
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFF",
                          fontSize: 10,
                          paddingTop: 5,
                        }}
                      >
                        Starting at
                      </Text>
                      <Text style={{ color: "#FFF", fontSize: 10 }}>
                        ${item.price}/ {item.rate}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: "#FF077E",
                        borderTopRightRadius: 16,
                        height: 45,
                        width: "60%",
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFF",
                          paddingTop: 5,
                          paddingLeft: 5,
                          fontWeight: "700",
                        }}
                        numberOfLines={2}
                        ellipsizeMode={"tail"}
                      >
                        {item.name}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      color: "#FFF",
                      marginTop: 5,
                      marginLeft: 25,
                    }}
                    numberOfLines={2}
                    ellipsizeMode={"tail"}
                  >
                    {item.description}
                  </Text>
                </Pressable>
              </>
            )}
            ListEmptyComponent={
              <Text style={[styles.youHaventAdd, styles.youClr]}>
                No service available
              </Text>
            }
          /> */}
          {/* <FlatList
            horizontal={false}
            data={bartend}
            ListHeaderComponent={
              <VStack
                flexDirection={"row"}
                justifyContent={"space-between"}
                paddingVertical={14}
              >
                <Text color="#FFF" fontSize={16} fontWeight={"700"}>
                  Bartend
                </Text>
                <Text color="#8A8A8A" fontSize={12} fontWeight={"300"}>
                  Flexible Payments
                </Text>
              </VStack>
            }
            renderItem={({ item }) => (
              <>
                <Pressable
                  style={{
                    width: "100%",
                    height: 150,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: "#FFF",
                    marginRight: 10,
                    marginBottom: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#323232",
                        borderTopLeftRadius: 16,
                        height: 45,
                        width: "40%",
                        paddingLeft: 15,
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFF",
                          fontSize: 10,
                          paddingTop: 5,
                        }}
                      >
                        Starting at
                      </Text>
                      <Text style={{ color: "#FFF", fontSize: 10 }}>
                        ${item.price}/ {item.rate}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: "#FF077E",
                        borderTopRightRadius: 16,
                        height: 45,
                        width: "60%",
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFF",
                          paddingTop: 5,
                          paddingLeft: 5,
                          fontWeight: "700",
                        }}
                        numberOfLines={2}
                        ellipsizeMode={"tail"}
                      >
                        {item.name}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      color: "#FFF",
                      marginTop: 5,
                      marginLeft: 25,
                    }}
                    numberOfLines={2}
                    ellipsizeMode={"tail"}
                  >
                    {item.description}
                  </Text>
                </Pressable>
              </>
            )}
            ListEmptyComponent={
              <Text style={[styles.youHaventAdd, styles.youClr]}>
                No service available
              </Text>
            }
          /> */}
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  progressIconLayout: {
    width: "100%",
    overflow: "hidden",
  },
  topnavigationContentLayout: {
    width: "100%",
    position: "absolute",
  },
  descBorder: {
    paddingVertical: Padding.p_5xl,
  },
  descriptionTypo: {
    fontWeight: "700",
    color: Color.labelColorDarkPrimary,
  },
  iProvideFoodTypo: {
    color: "#CDCCCD",
    fontFamily: FontFamily.typographyBodyMediumLight,
    fontWeight: "300",
    textAlign: "left",
    lineHeight: 20,
    fontSize: 14,
  },
  textLayout: {
    lineHeight: 21,
    color: Color.labelColorDarkPrimary,
  },
  foodComboSpaceBlock: {
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_xs,
    backgroundColor: "rgba(255, 7, 126, 0.5)",
    borderRadius: Border.br_81xl,
    flexDirection: "row",
    alignItems: "center",
  },
  youClr: {
    color: Color.primaryAlmostGrey,
    marginTop: 10,
  },
  vectorIconLayout: {
    height: 11,
    width: 11,
  },
  bgIcon: {
    width: "100%",
    height: "100%",
    left: 0,
    position: "absolute",
  },
  vendorprofilescreenChild: {
    height: 400,
    left: 0,
    top: 0,
  },
  title: {
    paddingBottom: Padding.p_base,
  },
  title4: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginRight: 95,
  },
  description: {
    lineHeight: 24,
    fontSize: 16,
    textAlign: "left",
  },
  iProvideFood: {
    width: 329,
    marginTop: 16,
  },
  desc: {
    paddingVertical: Padding.p_5xl,
    marginTop: 24,
  },
  foodBeverage: {
    fontFamily: FontFamily.typographyBodyMediumLight,
    fontWeight: "300",
    lineHeight: 21,
    textAlign: "left",
    fontSize: FontSize.typographyBodyMediumBold_size,
  },
  partyRentals: {
    marginLeft: 8,
  },
  label: {
    textAlign: "center",
    fontFamily: FontFamily.typographyBodyMediumRegular,
  },
  vendorDesc: {
    marginTop: 340,
    borderTopLeftRadius: Border.br_13xl,
    borderTopRightRadius: Border.br_13xl,
    shadowColor: "rgba(27, 27, 27, 0.16)",
    shadowRadius: 16,
    // elevation: 16,
    paddingTop: Padding.p_61xl,
    paddingBottom: Padding.p_5xl,
    backgroundColor: Color.appColorGradient,
    paddingHorizontal: Padding.p_5xl,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    width: "100%",
    zIndex: 10,
  },
  titlemain: {
    fontSize: 20,
    lineHeight: 28,
    textAlign: "center",
  },
  vectorIcon1: {
    marginLeft: 3.82,
  },
  stars: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    top: -3,
    left: 80,
    fontSize: 14,
    textAlign: "center",
    fontFamily: FontFamily.sFProDisplayRegular,
    position: "absolute",
  },
  starsParent: {
    width: 114,
    height: 16,
  },
  totalServiced0: {
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 14,
    color: "#8A8A8A",
  },
  user: {
    width: "100%",
    alignItems: "flex-start",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  backIcon: {
    width: 19,
    marginLeft: 5,
    height: 14,
  },
  vendorprofilescreen: {
    height: "100%",
    overflow: "hidden",
    flex: 1,
  },
});

export default VendorProfileScreen;
