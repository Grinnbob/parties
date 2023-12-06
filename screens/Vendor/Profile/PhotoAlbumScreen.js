import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import TopNavigationContent from "../../../components/TopNavigationContent";
import {
  Color,
  FontSize,
  FontFamily,
  Border,
  Padding,
} from "../../../GlobalStyles";
import MidGradientButton from "../../../components/MidGradientButton";
import Close from "../../../assets/x.svg";
import CloseCircle from "../../../assets/closecircle.svg";
import Cancel from "../../../assets/cancel.svg";
import apis from "../../../apis";
import useGlobalState from "../../../stateManagement/hook";
import StateTypes from "../../../stateManagement/StateTypes";
import types from "../../../stateManagement/types";
import { FlatList, useToast } from "native-base";
import PlusWhite from "../../../assets/plus.svg";

const PhotoAlbumScreen = ({ route, navigation }) => {
  const toast = useToast();
  const [albumName, setAlbumName] = useState("");
  const [vendorInfo, setVendorInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useGlobalState(
    StateTypes.user.key,
    StateTypes.user.default
  );
  const [searchEditList, setSearchEditList] = useGlobalState(
    types.albumType.searchEditList.key,
    types.albumType.searchEditList.default
  );

  const [selectedPhoto, setSelectedPhoto] = useGlobalState(
    types.albumType.selectedphoto.key,
    types.albumType.selectedphoto.default
  );
  const [selectedOption, setSelectedOption] = useGlobalState(
    types.albumType.albumtype.default,
    types.albumType.albumtype.key
  );

  const handleRemoveTag = async (tag) => {
    const removed = searchEditList.filter((item, i) => item.id !== tag.id);
    setSearchEditList(removed);
  };

  const handleRemoveImage = async (image) => {
    const removed = selectedPhoto.filter(
      (item, i) => item?.node?.image?.uri !== image?.node?.image?.uri
    );
    setSelectedPhoto(removed);
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => handleRemoveTag(item)}
        style={{
          backgroundColor: "#6C1B9E",
          borderRadius: 100,
          height: 26,
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 4,
        }}
      >
        <Text
          style={{
            color: "#FFF",
            fontWeight: "700",
            fontSize: 13,
            lineHeight: 18,
            marginRight: 7,
          }}
        >
          {item.name}
        </Text>
        <Cancel />
      </Pressable>
    );
  };

  const handleCameraRoll = () => {
    navigation.navigate("Camera", { success: true });
  };

  const SelectButton = () => {
    return (
      <Pressable onPress={handleCameraRoll}>
        <Image
          style={styles.cameraplusIcon}
          resizeMode="cover"
          source={require("../../../assets/cameraplus.png")}
        />
      </Pressable>
    );
  };

  const grabVendorInfo = async () => {
    try {
      const res = await apis.vendor.getAll({ userId: user.id });

      setVendorInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = () => {
    navigation.navigate("SearchAlbumModal");
  };

  const handleAlbumPublish = async () => {
    try {
      setIsLoading(true);
      const res = await apis.album.create({
        name: albumName,
        theme: selectedOption,
        vendorId: vendorInfo[0].id,
      });

      for (const el of selectedPhoto) {
        const document = await apis.document.create({
          uri: el?.node?.image?.uri,
          type: selectedOption,
          albumId: res.data.id,
        });
      }

      await apis.joinAlbumKey.createMulti({
        list: searchEditList,
        albumId: res?.data?.id,
      });

      if (res && res.success === false) {
        toast.show({
          placement: "top",
          description: res.message,
        });
        setIsLoading(false);
      }
      if (res && res.success) {
        setIsLoading(false);
        setSelectedPhoto(types.albumType.selectedphoto.default);
        setSearchEditList(types.albumType.searchEditList.default);
        navigation.navigate("Profile", { success: true });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    grabVendorInfo();
  }, [user]);

  return (
    <>
      <ScrollView>
        <View style={styles.photoalbumscreen}>
          <Image
            style={styles.bgIcon}
            resizeMode="cover"
            source={require("../../../assets/bg14.png")}
          />
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View style={styles.photoAlbumParent}>
              <View>
                <TopNavigationContent
                  title={selectedOption}
                  rightAccessoryDisplay="unset"
                  RightComponent={<Close />}
                />
                <View style={styles.title}>
                  <Text style={[styles.title1, styles.titleTypo]}>
                    Photo album
                  </Text>
                  <Text style={styles.title2}>
                    Add some photos here so guest can see your amazing work!
                  </Text>
                </View>
                {selectedPhoto.length < 1 && (
                  <View style={styles.images}>
                    <SelectButton />
                  </View>
                )}
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                {selectedPhoto.map((item, i) => (
                  <Pressable onPress={() => handleRemoveImage(item)}>
                    <View>
                      <CloseCircle
                        style={{
                          position: "absolute",
                          zIndex: 100,
                          top: 10,
                          left: 78,
                        }}
                      />
                      <Image
                        source={{ uri: item.node.image.uri }}
                        style={styles.photo}
                      />
                    </View>
                  </Pressable>
                ))}
              </View>
              <View style={styles.nameThisAlbumParent}>
                <View>
                  <Text style={[styles.title3, styles.titleTypo]}>
                    Name this album
                  </Text>
                  <TextInput
                    style={styles.form}
                    value={albumName}
                    onChangeText={setAlbumName}
                    placeholder={"Name Album"}
                    keyboardType="default"
                    placeholderTextColor="grey"
                    color="#FFF"
                  />
                </View>
                <View style={styles.addKeyWords}>
                  <Text style={[styles.title3, styles.titleTypo]}>
                    Add key words
                  </Text>
                  <View style={[styles.keywords, styles.form1Border]}>
                    {searchEditList && searchEditList.length > 0 ? (
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignItems: "center",
                        }}
                      >
                        <FlatList
                          data={searchEditList}
                          renderItem={renderItem}
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}
                          ListFooterComponent={
                            <TouchableOpacity onPress={handleModal}>
                              <LinearGradient
                                style={[
                                  styles.view1,
                                  styles.viewSpaceBlock,
                                  {
                                    backgroundColor: "#6C1B9E",
                                    borderWidth: 0,
                                    height: 26,
                                    marginLeft: 5,
                                  },
                                ]}
                                locations={[0, 1]}
                                colors={["#6c1b9e", "#ff077e"]}
                                useAngle={true}
                                angle={-90}
                              >
                                <PlusWhite />
                              </LinearGradient>
                            </TouchableOpacity>
                          }
                        />
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.view}
                        onPress={handleModal}
                      >
                        <View style={[styles.view1, styles.viewSpaceBlock]}>
                          <Text style={styles.tapToAdd}>Tap to add</Text>
                          <Image
                            style={[styles.unionIcon, styles.unionIconLayout]}
                            resizeMode="cover"
                            source={require("../../../assets/union.png")}
                          />
                        </View>
                      </TouchableOpacity>
                    )}
                    <View style={styles.view3}>
                      <LinearGradient
                        style={[styles.lineargradient, styles.viewSpaceBlock]}
                        locations={[0, 1]}
                        colors={["#6c1b9e", "#ff077e"]}
                        useAngle={true}
                        angle={-90}
                      >
                        <Image
                          style={styles.unionIconLayout}
                          resizeMode="cover"
                          source={require("../../../assets/union3.png")}
                        />
                      </LinearGradient>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{ width: "100%", alignItems: "center", marginTop: 20 }}
            >
              <MidGradientButton
                onPress={handleAlbumPublish}
                disabled={!albumName}
                label="Publish Album"
                formBackgroundColor="rgba(255, 255, 255, 0.1)"
                formMarginTop="unset"
                labelColor="#FFF"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  formBg: {
    backgroundColor: Color.appColorGradient,
    justifyContent: "center",
  },
  labelLayout: {
    lineHeight: 22,
    fontSize: FontSize.typographyHeadingMedium_size,
  },
  photo: {
    width: 92,
    height: 92,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  addPhoto: {
    width: 92,
    height: 92,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  titleTypo: {
    fontFamily: FontFamily.textLargeBold,
    fontWeight: "700",
    textAlign: "left",
    alignSelf: "stretch",
    color: Color.labelColorDarkPrimary,
  },
  form1Border: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderStyle: "solid",
    backgroundColor: Color.gray_700,
    borderRadius: Border.br_5xs,
    width: "100%",
  },
  viewSpaceBlock: {
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_81xl,
    alignItems: "center",
    flexDirection: "row",
  },
  unionIconLayout: {
    height: 8,
    width: 8,
  },
  bgIcon: {
    top: 0,
    left: 0,
    width: 665,
    height: 927,
    position: "absolute",
  },
  label: {
    textAlign: "center",
    color: Color.labelColorDarkPrimary,
    fontFamily: FontFamily.typographyBodyMediumRegular,
  },
  form: {
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 15,
    elevation: 15,
    shadowOpacity: 1,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    paddingVertical: Padding.p_xs,
    alignItems: "center",
    paddingHorizontal: Padding.p_5xl,
    flexDirection: "row",
    backgroundColor: Color.appColorGradient,
    marginTop: 10,
  },
  title1: {
    fontSize: 20,
    lineHeight: 28,
    textAlign: "left",
  },
  title2: {
    fontSize: 16,
    lineHeight: 21,
    color: "#8A8A8A",
    marginTop: 8,
    textAlign: "left",
    alignSelf: "stretch",
    fontFamily: FontFamily.typographyBodyMediumRegular,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    width: 327,
  },
  cameraplusIcon: {
    width: 56,
    height: 56,
    overflow: "hidden",
  },
  images: {
    height: 200,
    marginTop: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderStyle: "solid",
    backgroundColor: Color.gray_700,
    borderRadius: Border.br_5xs,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title3: {
    textAlign: "left",
    lineHeight: 22,
    fontSize: FontSize.typographyHeadingMedium_size,
  },
  tapToAdd: {
    fontSize: FontSize.typographyBodySmallBold_size,
    lineHeight: 17,
    textAlign: "left",
    color: Color.labelColorDarkPrimary,
    fontFamily: FontFamily.typographyBodyMediumRegular,
  },
  unionIcon: {
    marginLeft: 8,
    display: "none",
  },
  view1: {
    borderColor: "#8a8a8a",
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_81xl,
    borderWidth: 1,
    borderStyle: "solid",
  },
  view: {
    flexDirection: "row",
    marginTop: 5,
  },
  viewadd: {
    flexDirection: "row",
    marginTop: 5,
  },
  lineargradient: {
    marginLeft: 8,
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_81xl,
    alignSelf: "stretch",
    backgroundColor: Color.appColorGradient,
    justifyContent: "center",
  },
  view3: {
    display: "none",
    marginTop: 8,
    flexDirection: "row",
  },
  keywords: {
    height: 92,
    padding: Padding.p_base,
  },
  addKeyWords: {
    marginTop: 24,
  },
  nameThisAlbumParent: {
    marginTop: 32,
  },
  photoAlbumParent: { padding: 20 },
  photoalbumscreen: {
    backgroundColor: Color.labelColorLightPrimary,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default PhotoAlbumScreen;
