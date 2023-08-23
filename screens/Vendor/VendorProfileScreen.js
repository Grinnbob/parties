import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Share,
} from "react-native";
import { Pressable, Box } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import {
  FontSize,
  Color,
  FontFamily,
  Padding,
  Border,
} from "../../GlobalStyles";
import apis from "../../apis";
import useGlobalState from "../../stateManagement/hook";
import StateTypes from "../../stateManagement/StateTypes";
import { useNavigation } from "@react-navigation/core";
import GradientBar from "./components/GradientBar";

const renderItem = ({ item }) => {
  return (
    <View style={[styles.partyRentals, styles.foodComboSpaceBlock]}>
      <Text style={[styles.foodBeverage, styles.textLayout]}>{item.name}</Text>
    </View>
  );
};

const VendorProfileScreen = ({ route }) => {
  const { navigate, toggleDrawer } = useNavigation();
  const [vendor, setVendor] = useGlobalState(
    StateTypes.vendor.key,
    StateTypes.vendor.default
  );
  const [album, setAlbum] = useState([]);
  const [service, setService] = useState([]);
  const [backgroundLink, setBackgroundLink] = useState("");
  const [percent, setPercent] = useState(0);
  const [media, setMedia] = useState(false);
  const [busDescription, setBusDescription] = useState(false);
  const [addService, setAddService] = useState(false);
  const [key, setKey] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Check out my profile on the app PartyFavor",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const getService = async () => {
    try {
      const res = await apis.service.getAll({ VendorId: vendor[0]?.id });

      if (res && res.data) {
        setService(res.data);
      }
      if (res.length > 0) {
        setAddService(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAlbum = async () => {
    try {
      const res = await apis.album.getAll({ VendorId: vendor[0]?.id });

      if (res && res.data) {
        setAlbum(res.data);
      }
      if (res.length > 0) {
        setMedia(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("VENDOR", vendor);
  }, [vendor]);
  const getVendorInfo = async () => {
    try {
      const res = await apis.vendor.getById(vendor[0].id);
      console.log("RES", res.data);
      if (res && res.data) {
        setKey(res.data.listOfKeys);
        setBackgroundLink(res.data.avatar);
        setServiceName(res.data.name);
        setServiceDescription(res.data.description);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getAlbum();
      getService();
      getVendorInfo();
      if (vendor && vendor[0]?.description) {
        setBusDescription(true);
      }
    }, [vendor])
  );

  useEffect(() => {
    if (busDescription && !media && !addService) {
      setPercent(20);
    } else if (
      (!media && busDescription && addService) ||
      (media && busDescription && !addService)
    ) {
      setPercent(50);
    } else if (media && busDescription && addService) {
      setPercent(100);
    } else {
      setPercent(0);
    }
  }, [busDescription, media, addService]);

  return (
    <ScrollView
      style={{ backgroundColor: "#000", minHeight: "100%" }}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.vendorprofilescreen, styles.progressIconLayout]}>
        <Image
          style={[styles.bgIcon]}
          resizeMode="cover"
          source={require("../../assets/bg18.png")}
        />
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
                <Pressable onPress={toggleDrawer} hitSlop={20}>
                  <Image
                    style={styles.xIconLayout}
                    resizeMode="cover"
                    source={require("../../assets/iconsaxlinearhambergermenu1.png")}
                  />
                </Pressable>
                <View
                  style={{
                    width: 20,
                    height: 20,
                  }}
                ></View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Pressable onPress={() => navigate("Edit")}>
                  <Image
                    style={[styles.pencilIcon1, styles.iconSpaceBlock]}
                    resizeMode="cover"
                    source={require("../../assets/pencil1.png")}
                  />
                </Pressable>
                <Pressable onPress={onShare}>
                  <Image
                    style={[styles.pencilIcon1, styles.iconSpaceBlock]}
                    resizeMode="cover"
                    source={require("../../assets/sharenetwork.png")}
                  />
                </Pressable>
              </View>
            </View>
          </View>

          <View style={{ alignItems: "center" }}>
            <Text style={[styles.titlemain, styles.descriptionTypo]}>
              {serviceName}
            </Text>
          </View>
        </ImageBackground>
        <LinearGradient
          style={styles.vendorDesc}
          locations={[0, 1]}
          colors={["#000", "rgba(0, 0, 0, 0)"]}
          useAngle={true}
          angle={180}
        >
          <View style={styles.title}>
            <Text style={[styles.title1, styles.titleTypo]}>
              Welcome to your new Party Favor Business Service Page
            </Text>
            <View style={styles.title2}>
              <Text style={[styles.title3, styles.labelLayout]}>
                Your page is {percent}% complete
              </Text>
              {percent > 0 && <GradientBar value={`${percent}%`} />}
            </View>
          </View>
          <View style={styles.createProfile}>
            <View>
              <View style={styles.title4}>
                <Image
                  style={[
                    styles.iconsaxlinearpersonalcard,
                    styles.iconsaxlinearexportLayout,
                  ]}
                  resizeMode="cover"
                  source={require("../../assets/iconsaxlinearpersonalcard.png")}
                />
                <Text style={[styles.createYourProfile1, styles.labelLayout]}>
                  Create Your Profile
                </Text>
              </View>
              <View style={styles.list}>
                {busDescription ? (
                  <View style={styles.title4}>
                    <Image
                      style={[styles.checkIcon, styles.iconLayout]}
                      resizeMode="cover"
                      source={require("../../assets/check3.png")}
                    />
                    <Text style={styles.iProvideFoodTypo}>
                      Edit Your Business Description
                    </Text>
                  </View>
                ) : (
                  <View style={styles.title4}>
                    <Image
                      style={[styles.checkIcon, styles.iconLayout]}
                      resizeMode="cover"
                      source={require("../../assets/check4.png")}
                    />
                    <Text style={styles.iProvideFoodTypo}>
                      Edit Your Business Description
                    </Text>
                  </View>
                )}
                {media ? (
                  <View style={styles.view1}>
                    <Image
                      style={[styles.checkIcon, styles.iconLayout]}
                      resizeMode="cover"
                      source={require("../../assets/check3.png")}
                    />
                    <Text style={styles.iProvideFoodTypo}>
                      Add Media of your past work
                    </Text>
                  </View>
                ) : (
                  <View style={styles.view1}>
                    <Image
                      style={[styles.checkIcon, styles.iconLayout]}
                      resizeMode="cover"
                      source={require("../../assets/check4.png")}
                    />
                    <Text style={styles.iProvideFoodTypo}>
                      Add Media of your past work
                    </Text>
                  </View>
                )}
                {addService ? (
                  <View style={styles.view1}>
                    <Image
                      style={[styles.checkIcon, styles.iconLayout]}
                      resizeMode="cover"
                      source={require("../../assets/check3.png")}
                    />
                    <Text style={styles.iProvideFoodTypo}>
                      Add + Price your service
                    </Text>
                  </View>
                ) : (
                  <View style={styles.view1}>
                    <Image
                      style={[styles.checkIcon, styles.iconLayout]}
                      resizeMode="cover"
                      source={require("../../assets/check4.png")}
                    />
                    <Text style={styles.iProvideFoodTypo}>
                      Add + Price your service
                    </Text>
                  </View>
                )}
              </View>
            </View>
            {/* <View style={styles.buttons}>
              <LinearGradient
                style={[styles.connect, styles.btnShadowBox]}
                locations={[0, 1]}
                colors={["rgba(108, 27, 158, 0.1)", "rgba(255, 7, 126, 0.1)"]}
                useAngle={true}
                angle={-90}
              >
                <Text style={[styles.connectYourStripe, styles.uploadNowTypo]}>
                  Connect Your Stripe Account + Get Paid
                </Text>
              </LinearGradient>
              <View style={[styles.reviewAccept, styles.btnShadowBox]}>
                <Text
                  style={[styles.connectYourStripe, styles.uploadNowTypo]}
                >{`Review & Accept Jobs`}</Text>
              </View>
            </View> */}
          </View>
          <View style={[styles.desc, styles.descBorder]}>
            <Text style={[styles.description, styles.descriptionTypo]}>
              Description
            </Text>
            <Text style={[styles.iProvideFood, styles.iProvideFoodTypo]}>
              {serviceDescription}
            </Text>
          </View>
          <View style={styles.vendorSpecialties}>
            <View style={styles.title5}>
              <Text style={[styles.description, styles.descriptionTypo]}>
                Type of Business
              </Text>
              <TouchableOpacity>
                <Image
                  style={styles.pencilIcon}
                  resizeMode="cover"
                  source={require("../../assets/pencil.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.links}>
              <FlatList
                data={key}
                renderItem={renderItem}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
          <View style={styles.list}>
            <View style={[styles.reviews, styles.descBorder]}>
              <View style={styles.title5}>
                <Text
                  style={[styles.description, styles.descriptionTypo]}
                >{`Photos & Videos`}</Text>
                <TouchableOpacity onPress={() => navigate("Album")}>
                  <View style={styles.parentBorder}>
                    <Image
                      style={styles.cameraIcon}
                      resizeMode="cover"
                      source={require("../../assets/camera.png")}
                    />
                    <Text
                      style={[styles.uploadNow, styles.uploadNowTypo]}
                      numberOfLines={1}
                    >
                      Upload now
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.images}>
                <FlatList
                  data={album}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        flexDirection: "column",
                      }}
                    >
                      <Text
                        style={[styles.youHaventUpload, styles.youClr]}
                        numberOfLines={2}
                        ellipsizeMode={"tail"}
                      >
                        {item.name}
                      </Text>
                      <TouchableOpacity>
                        <Image
                          source={{ uri: item.Documents[0]?.link }}
                          style={{
                            width: 50,
                            height: 50,
                            marginVertical: 4,
                            marginHorizontal: 9,
                            borderRadius: 8,
                          }}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  ListEmptyComponent={
                    <Text style={[styles.youHaventUpload, styles.youClr]}>
                      You haven’t upload any photos or videos
                    </Text>
                  }
                />
              </View>
            </View>
            <View style={[styles.servicePackage, styles.descBorder]}>
              <TouchableOpacity
                onPress={() =>
                  navigate("AlbumNavigator", {
                    screen: "Service",
                    params: {
                      vendorId: vendor[0]?.id,
                    },
                  })
                }
              >
                <View style={[styles.unionParent, styles.parentBorderService]}>
                  <Image
                    style={styles.unionIcon}
                    resizeMode="cover"
                    source={require("../../assets/union7.png")}
                  />
                  <Text
                    style={[styles.uploadNow, styles.uploadNowTypo]}
                    numberOfLines={1}
                  >
                    Service package
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.links}>
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={service}
                  renderItem={({ item }) => (
                    <>
                      <Pressable
                        style={{
                          width: 200,
                          height: 120,
                          borderRadius: 16,
                          borderWidth: 1,
                          borderColor: "#FFF",
                          marginRight: 10,
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
                              width: 80,
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
                              width: 118,
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
                      You haven’t add any service
                    </Text>
                  }
                />
              </View>
            </View>
          </View>
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
  uploadNowTypo: {
    lineHeight: 20,
    fontSize: FontSize.typographyBodyMediumBold_size,
    textAlign: "left",
    color: Color.labelColorDarkPrimary,
  },
  titleTypo: {
    fontFamily: FontFamily.typographyBodySmallBold,
    fontWeight: "700",
  },
  labelLayout: {
    lineHeight: 22,
    fontSize: FontSize.typographyHeadingMedium_size,
    color: Color.labelColorDarkPrimary,
  },
  iconsaxlinearexportLayout: {
    height: 24,
    width: 24,
  },
  iconLayout: {
    height: 32,
    width: 32,
  },
  btnShadowBox: {
    paddingVertical: Padding.p_xs,
    width: "100%",
    elevation: 15,
    shadowRadius: 15,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    borderRadius: 30,
    justifyContent: "center",
    paddingHorizontal: Padding.p_5xl,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  xIconLayout: {
    height: 24,
    width: 24,
  },
  descBorder: {
    paddingVertical: Padding.p_5xl,
    paddingHorizontal: 0,
    borderTopWidth: 1,
    borderColor: "#232323",
    borderStyle: "solid",
  },
  descriptionTypo: {
    fontFamily: FontFamily.textLargeBold,
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
  },
  parentBorder: {
    paddingHorizontal: Padding.p_3xs,
    backgroundColor: "rgba(255, 7, 126, 0.2)",
    width: "100%",
    marginBottom: 10,
    borderRadius: Border.br_5xs,
    paddingVertical: Padding.p_5xs,
    borderWidth: 1,
    borderColor: "#ff077e",
    borderStyle: "solid",
    flexDirection: "row",
    alignItems: "center",
  },
  parentBorderService: {
    paddingHorizontal: Padding.p_3xs,
    backgroundColor: "rgba(255, 7, 126, 0.2)",
    width: "50%",
    marginBottom: 10,
    borderRadius: Border.br_5xs,
    paddingVertical: Padding.p_5xs,
    borderWidth: 1,
    borderColor: "#ff077e",
    borderStyle: "solid",
    flexDirection: "row",
    alignItems: "center",
  },
  vectorIconLayout: {
    height: 11,
    width: 11,
  },
  accessoryPosition: {
    paddingBottom: Padding.p_4xs,
    paddingTop: Padding.p_4xs,
    flexDirection: "row",
    alignItems: "center",
  },
  iconSpaceBlock: {
    marginLeft: 10,
    overflow: "hidden",
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
  foodServicesParty: {
    display: "none",
    width: "100%",
    textAlign: "left",
    color: Color.labelColorDarkPrimary,
    fontFamily: FontFamily.sFProDisplayRegular,
  },
  title1: {
    fontSize: FontSize.typographyHeadingLarge_size,
    lineHeight: 25,
    marginTop: 24,
    width: "100%",
    textAlign: "left",
    color: Color.labelColorDarkPrimary,
  },
  title3: {
    fontFamily: FontFamily.typographyBodyMediumRegular,
    width: "100%",
    textAlign: "left",
  },
  progressIcon: {
    maxWidth: "100%",
    height: 8,
    marginTop: 16,
    alignSelf: "stretch",
    overflow: "hidden",
  },
  title2: {
    alignItems: "center",
    alignSelf: "stretch",
    marginTop: 24,
  },
  title: {
    paddingBottom: Padding.p_base,
  },
  iconsaxlinearpersonalcard: {
    overflow: "hidden",
  },
  createYourProfile1: {
    marginLeft: 8,
    fontFamily: FontFamily.typographyBodySmallBold,
    fontWeight: "700",
    textAlign: "left",
  },
  title4: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkIcon: {
    overflow: "hidden",
  },
  view1: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  list: {
    marginTop: 24,
  },
  connectYourStripe: {
    fontFamily: FontFamily.typographyBodyMediumRegular,
    textAlign: "left",
    color: Color.labelColorDarkPrimary,
  },
  connect: {
    borderWidth: 1,
    borderStyle: "solid",
    paddingVertical: Padding.p_xs,
    elevation: 15,
    shadowRadius: 15,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    borderRadius: Border.br_11xl,
    borderColor: "#ff077e",
    backgroundColor: Color.appColorGradient,
  },
  reviewAccept: {
    borderColor: "#8a8a8a",
    borderWidth: 1,
    borderStyle: "solid",
    paddingVertical: Padding.p_xs,
    elevation: 15,
    shadowRadius: 15,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    borderRadius: Border.br_11xl,
    marginTop: 16,
  },
  buttons: {
    marginTop: 24,
  },
  createProfile: {
    marginTop: 24,
    paddingBottom: Padding.p_base,
  },
  description: {
    lineHeight: 24,
    fontSize: FontSize.typographyHeadingMedium_size,
    fontFamily: FontFamily.textLargeBold,
    textAlign: "left",
  },
  iProvideFood: {
    width: 329,
    marginTop: 16,
  },
  desc: {
    borderBottomWidth: 1,
    paddingVertical: Padding.p_5xl,
    paddingHorizontal: 0,
    borderTopWidth: 1,
    borderColor: "#232323",
    marginTop: 24,
  },
  pencilIcon: {
    width: 18,
    height: 18,
  },
  title5: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    width: "100%",
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
  links: {
    width: "100%",
    marginTop: 15.27,
    flexDirection: "row",
    alignItems: "center",
  },
  vendorSpecialties: {
    alignSelf: "stretch",
    marginTop: 24,
    paddingBottom: Padding.p_base,
    justifyContent: "center",
  },
  label: {
    textAlign: "center",
    fontFamily: FontFamily.typographyBodyMediumRegular,
  },
  btn: {
    height: 40,
    paddingVertical: Padding.p_xs,
    elevation: 15,
    shadowRadius: 15,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    borderRadius: Border.br_11xl,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    display: "none",
    width: 327,
    backgroundColor: Color.appColorGradient,
  },
  cameraIcon: {
    width: 15,
    height: 14,
  },
  uploadNow: {
    marginLeft: 8,
    fontFamily: FontFamily.typographyBodyMediumRegular,
    textAlign: "left",
    color: Color.labelColorDarkPrimary,
  },
  youHaventUpload: {
    lineHeight: 17,
    fontSize: 12,
    color: Color.primaryAlmostGrey,
    fontWeight: "300",
    textAlign: "center",
  },
  images: {
    flexDirection: "row",
    alignSelf: "stretch",
    marginTop: 24,
  },
  reviews: {
    paddingVertical: Padding.p_5xl,
    paddingHorizontal: 0,
    borderTopWidth: 1,
    borderColor: "#232323",
    width: "100%",
  },
  youHaventAdd: {
    lineHeight: 17,
    fontSize: FontSize.typographyBodySmallBold_size,
    color: Color.primaryAlmostGrey,
    fontFamily: FontFamily.typographyBodyMediumLight,
    fontWeight: "300",
  },
  unionIcon: {
    width: 9,
    height: 9,
  },
  unionParent: {
    justifyContent: "center",
  },
  servicePackage: {
    borderBottomWidth: 1,
    paddingVertical: Padding.p_5xl,
    paddingHorizontal: 0,
    borderTopWidth: 1,
    borderColor: "#232323",
    width: "100%",
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
    fontSize: 10,
    lineHeight: 14,
    marginLeft: 8,
    fontFamily: FontFamily.typographyBodyMediumRegular,
  },
  iconsaxlinearexport: {
    marginLeft: 3.82,
    display: "none",
    overflow: "hidden",
  },
  user: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 20,
  },
  backIcon: {
    width: 19,
    marginLeft: 5,
    height: 14,
  },
  pencilIcon1: {
    height: 32,
    width: 32,
  },
  rightAccessory: {
    justifyContent: "flex-end",
  },
  topnavigationContent: {
    height: 56,
  },
  vendorprofilescreen: {
    height: "100%",
    overflow: "hidden",
    flex: 1,
  },
});

export default VendorProfileScreen;
