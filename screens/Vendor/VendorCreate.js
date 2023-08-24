import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Pressable,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MidGradientButton from "../../components/MidGradientButton";
import { Padding, FontFamily, Color } from "../../GlobalStyles";
import ProfileImage from "../../assets/onboard/add.svg";
import apis from "../../apis";
import { AntDesign } from "@expo/vector-icons";
import { HStack, Select, VStack, Text, useToast } from "native-base";
import { PhoneMask } from "../../components/Input/BasicMasks";
import useGlobalState from "../../stateManagement/hook";
import StateTypes from "../../stateManagement/StateTypes";
import Add from "../../assets/addpencil.svg";
import X from "../../assets/x.svg";
import Back from "../../assets/back.svg";
import Cancel from "../../assets/cancel.svg";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Config from "react-native-config";
import SearchModal from "../../components/Modal/SearchModal";
import loadApp from "../../navigation/loadApp";

const VendorCreate = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [serviceDescription, setServiceDescriprion] = useState("");
  const [ein, setEin] = useState("");
  const [imageOne, setImageOne] = useState("");
  const [imageTwo, setImageTwo] = useState("");
  const [imageThree, setImageThree] = useState("");
  const [imageFour, setImageFour] = useState("");
  const [avatar, setAvatar] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [lat, setLat] = useState(0);
  const [distance, setDistance] = useState(0);
  const [long, setLong] = useState(0);
  const [vendorType, setVendorType] = useState([]);
  // const [imageList, setImageList] = useGlobalState(
  //   StateTypes.vendorImageList.key,
  //   StateTypes.vendorImageList.default
  // );
  const [user, setUser] = useGlobalState(
    StateTypes.user.key,
    StateTypes.user.default
  );
  const [token, setToken] = useGlobalState(
    StateTypes.token.key,
    StateTypes.token.default
  );
  const [vendorCreateList, setVendorCreateList] = useGlobalState(
    StateTypes.vendorCreateList.key,
    StateTypes.vendorCreateList.default
  );
  const [selectedPhoto, setSelectedPhoto] = useGlobalState(
    StateTypes.selectedphoto.key,
    StateTypes.selectedphoto.default
  );

  useEffect(() => {
    setDistance(serviceArea);
  }, [serviceArea]);

  // useEffect(() => {
  //   setImageOne(imageList[0] ? imageList[0] : "");
  //   setImageTwo(imageList[1] ? imageList[1] : "");
  //   setImageThree(imageList[2] ? imageList[2] : "");
  //   setImageFour(imageList[3] ? imageList[3] : "");
  // }, [imageList]);

  // const handleCamera = async (setter) => {
  //   try {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //     });
  //     if (result.canceled) return;
  //     // console.log("results", result.assets[0]);

  //     if (!result.canceled) {
  //       setter(result.assets[0].uri);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleAvatar = async () => {
  //   try {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //     });
  //     if (result.canceled) return;

  //     if (!result.canceled) {
  //       setAvatar(result.assets[0].uri);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleAvatar = () => {
    navigation.navigate("VerifyCameraRoll", {
      params: "verify",
    });
  };

  const AvatarImage = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleAvatar();
        }}
        style={styles.avatar}
      >
        {selectedPhoto.length === 0 ? (
          <>
            <ProfileImage />
            <Text style={{ color: "#FFF", fontSize: 16, marginVertical: 20 }}>
              Profile Image
            </Text>
          </>
        ) : (
          <>
            <ImageBackground
              style={{
                width: 110,
                height: 110,
              }}
              imageStyle={{ borderRadius: 100 }}
              source={{
                uri: selectedPhoto[0]?.node?.image?.uri,
              }}
            >
              <Pressable
                onPress={() => {
                  handleAvatar();
                }}
                style={{ position: "absolute" }}
              >
                <Add style={{ top: 95, left: 43 }} />
              </Pressable>
            </ImageBackground>
            <Text style={{ color: "#FFF", fontSize: 16, marginVertical: 20 }}>
              Profile Image
            </Text>
          </>
        )}
      </TouchableOpacity>
    );
  };

  const grabVendor = async () => {
    try {
      const res = await apis.vendorType.getAll();

      setVendorType(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveTag = async (tag) => {
    try {
      const removed = vendorCreateList.filter((item, i) => item.id !== tag.id);
      setVendorCreateList(removed);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    grabVendor();
  }, [user]);

  // const ImageCard = ({ image, setImage }) => {
  //   return (
  //     <TouchableOpacity
  //       onPress={() => {
  //         if (image !== "") return setImage("");
  //         handleCamera(setImage);
  //       }}
  //       style={styles.addPhoto}
  //     >
  //       {image === "" ? (
  //         <View style={{ alignItems: "center" }}>
  //           <Plus />
  //         </View>
  //       ) : (
  //         <ImageBackground
  //           style={styles.photo}
  //           imageStyle={{ borderRadius: 8 }}
  //           source={{ uri: image }}
  //         >
  //           <Pressable
  //             onPress={() => {
  //               if (image) return setImage("");
  //               handleCamera(setImage);
  //             }}
  //           >
  //             <Close style={{ bottom: 35, left: 35 }} />
  //           </Pressable>
  //         </ImageBackground>
  //       )}
  //     </TouchableOpacity>
  //   );
  // };

  // const SelectButton = ({ image, setImage }) => {
  //   return (
  //     <Button
  //       size="xs"
  //       w={79}
  //       h={37}
  //       borderRadius={8}
  //       backgroundColor={"#6C1B9E"}
  //       margin={2}
  //       onPress={() => {
  //         if (image !== "") return setImage("");
  //         handleCamera(setImage);
  //       }}
  //     >
  //       <Text
  //         fontWeight="300"
  //         fontSize={14}
  //         lineHeight={21}
  //         style={{ color: "#FFF" }}
  //       >
  //         Select
  //       </Text>
  //     </Button>
  //   );
  // };

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

  const handleNext = async () => {
    try {
      setIsLoading(true);
      const res = await apis.vendor.create({
        name: serviceName,
        description: serviceDescription,
        phoneNumber: phone,
        taxId: ein,
        UserId: user.id,
        views: 0,
        sales: 0.0,
        favorites: 0,
        request: 0,
        completed: 0,
        distance: distance,
        city: city,
        state: state,
        address: address,
        point: { type: "Point", coordinates: [long, lat] },
      });

      if (selectedPhoto[0]?.node?.image?.uri) {
        const avatarRes = await apis.vendor.UploadAvatar({
          uri: selectedPhoto[0]?.node?.image?.uri,
          id: res?.data?.id,
        });
        console.log("AVATAR RES", avatarRes);
      }
      // const list = [];

      // if (imageOne !== "") list.push(imageOne);
      // if (imageTwo !== "") list.push(imageTwo);
      // if (imageThree !== "") list.push(imageThree);
      // if (imageFour !== "") list.push(imageFour);

      // for (const el of list) {
      //   const document = await apis.document.create({
      //     uri: el,
      //     VendorId: res?.data?.id,
      //     type: serviceType,
      //   });
      // }

      const key = await apis.joinVendorKey.createMulti({
        list: vendorCreateList,
        VendorId: res?.data?.id,
      });

      const joinVendorType = await apis.joinVendorVendorType.create({
        VendorId: res?.data?.id,
        VendorTypeId: serviceType,
      });
      if (res && res.success === false) {
        toast.show({
          placement: "top",
          description: res.message,
        });
        setIsLoading(false);
      }
      setIsLoading(false);
      if (res && res.success) {
        setVendorCreateList(StateTypes.vendorCreateList.default);
        setSelectedPhoto(StateTypes.selectedphoto.default);
        await loadApp(setToken, setUser);
      }
    } catch (error) {
      toast.show({
        placement: "top",
        description: error,
      });
    }
  };

  const handleModal = () => {
    setModalVisible(true);
  };

  const logout = async () => {
    await apis.device.deleteById(setToken);
  };

  return (
    <>
      <SearchModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          style={{ backgroundColor: "#000" }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.signupscreen}>
            <Image
              style={[styles.background, styles.bgIconPosition]}
              resizeMode="cover"
              source={require("../../assets/bg16.png")}
            />
            <View style={[styles.alertmodalbg, styles.alertmodalbgLayout]} />
            <View
              style={{ flex: 1, justifyContent: "space-between", padding: 10 }}
            >
              <View>
                <View style={styles.accessoryPosition}>
                  <TouchableOpacity onPress={logout} hitSlop={20}>
                    <Back />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={logout} hitSlop={20}>
                    <X />
                  </TouchableOpacity>
                </View>
                <View style={styles.titlePosition}>
                  <Text style={styles.title1}>Service Information</Text>
                  <Text style={[styles.title2, styles.titleLayout]}>
                    Complete your business profile page to {"\n"}inform people
                    of the services that you offer.
                  </Text>
                </View>
                <View style={{ width: "100%", alignItems: "center" }}>
                  <AvatarImage />
                </View>

                <View style={styles.forms}>
                  <TextInput
                    style={styles.form}
                    value={serviceName}
                    onChangeText={setServiceName}
                    placeholder="Service Name"
                    keyboardType="default"
                    placeholderTextColor="#8a8a8a"
                  />
                  <Select
                    selectedValue={serviceType}
                    accessibilityLabel="Choose Service"
                    placeholder="Choose Service"
                    dropdownCloseIcon={
                      <AntDesign
                        name="down"
                        size={15}
                        style={{ right: 20, color: "#FF077E" }}
                      />
                    }
                    dropdownOpenIcon={
                      <AntDesign
                        name="down"
                        size={15}
                        style={{ right: 20, color: "#FF077E" }}
                      />
                    }
                    borderColor="rgba(255, 255, 255, 0.2)"
                    borderWidth={1}
                    borderRadius={8}
                    variant="unstyled"
                    width={327}
                    fontSize={13}
                    marginBottom={2}
                    marginTop={2}
                    color={"#FFF"}
                    onValueChange={(itemValue) => setServiceType(itemValue)}
                  >
                    {vendorType.map((vendor, i) => {
                      return (
                        <Select.Item label={vendor.title} value={vendor.id} />
                      );
                    })}
                  </Select>
                  <GooglePlacesAutocomplete
                    placeholder="Location"
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                      setAddress(details.formatted_address);
                      setLat(details?.geometry?.location?.lat);
                      setLong(details?.geometry?.location?.lng);
                      setCity(
                        details?.address_components.find((addressComponent) =>
                          addressComponent.types.includes("locality")
                        )?.short_name ?? "N/A"
                      );
                      setState(
                        details?.address_components.find((addressComponent) =>
                          addressComponent.types.includes(
                            "administrative_area_level_1"
                          )
                        )?.short_name ?? "N/A"
                      );
                    }}
                    query={{
                      key: Config.GOOGLE_MAP_KEY,
                      language: "en",
                    }}
                    textInputProps={{
                      placeholderTextColor: "#8a8a8a",
                    }}
                    styles={{
                      textInputContainer: {
                        width: 327,
                        borderWidth: 1,
                        borderRadius: 8,
                        borderColor: "rgba(255, 255, 255, 0.2)",
                        height: 48,
                        overflow: "hidden",
                        fontSize: 14,
                      },
                      textInput: {
                        marginLeft: 0,
                        marginRight: 0,
                        height: 46,
                        backgroundColor: "transparent",
                        borderRadius: 8,
                        paddingLeft: 13,
                        paddingRight: 13,
                        fontSize: 14,
                        color: "#FFF",
                      },
                      container: {
                        width: 327,
                        fontSize: 14,
                      },
                      description: {
                        fontSize: 14,
                      },
                    }}
                  />

                  <Select
                    selectedValue={serviceArea}
                    accessibilityLabel="Service Area"
                    placeholder="Service Area"
                    dropdownCloseIcon={
                      <AntDesign
                        name="down"
                        size={15}
                        style={{ right: 20, color: "#FF077E" }}
                      />
                    }
                    dropdownOpenIcon={
                      <AntDesign
                        name="down"
                        size={15}
                        style={{ right: 20, color: "#FF077E" }}
                      />
                    }
                    borderColor="rgba(255, 255, 255, 0.2)"
                    borderWidth={1}
                    borderRadius={8}
                    variant="unstyled"
                    width={327}
                    marginBottom={2}
                    marginTop={2}
                    fontSize={13}
                    color={"#FFF"}
                    onValueChange={(itemValue) => setServiceArea(itemValue)}
                  >
                    <Select.Item
                      label={`20 miles from ${city ? city : "--"}, ${
                        state ? state : "--"
                      }`}
                      value="20"
                    />
                    <Select.Item
                      label={`30 miles from ${city ? city : "--"}, ${
                        state ? state : "--"
                      }`}
                      value="30"
                    />
                    <Select.Item
                      label={`50 miles from ${city ? city : "--"}, ${
                        state ? state : "--"
                      }`}
                      value="50"
                    />
                  </Select>
                  <TextInput
                    style={styles.textarea}
                    placeholder="Service Description"
                    keyboardType="default"
                    placeholderTextColor="#8a8a8a"
                    multiline={true}
                    maxLength={440}
                    onChangeText={(text) => setServiceDescriprion(text)}
                  />
                  <Pressable onPress={handleModal}>
                    {vendorCreateList && vendorCreateList.length > 0 ? (
                      <View style={styles.form}>
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            alignItems: "center",
                          }}
                        >
                          <FlatList
                            data={vendorCreateList}
                            renderItem={renderItem}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                          />
                        </View>
                      </View>
                    ) : (
                      <View style={styles.form}>
                        <Text color={"#8a8a8a"}>
                          Please enter 5 of your specialty keywords
                        </Text>
                      </View>
                    )}
                  </Pressable>
                  {/* <VStack width="90%" marginBottom={5}>
                    <Text style={styles.subtext}>
                      Please seperate them by a comma
                    </Text>
                  </VStack>
                  <Box alignItems="center">
                    <Input
                      w={327}
                      py="0"
                      borderRadius={8}
                      borderColor={"rgba(255, 255, 255, 0.2)"}
                      InputRightElement={
                        <SelectButton image={imageOne} setImage={setImageOne} />
                      }
                      placeholder="Service cover image"
                      placeholderTextColor={"#8A8A8A"}
                      fontSize={14}
                    />
                  </Box>
                  <HStack style={{ width: "100%", marginLeft: 45 }}>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      {imageOne && (
                        <ImageCard image={imageOne} setImage={setImageOne} />
                      )}
                      {imageOne && (
                        <ImageCard image={imageTwo} setImage={setImageTwo} />
                      )}
                      {imageOne && imageTwo && (
                        <ImageCard
                          image={imageThree}
                          setImage={setImageThree}
                        />
                      )}
                      {imageOne && imageTwo && imageThree && (
                        <ImageCard image={imageFour} setImage={setImageFour} />
                      )}
                    </ScrollView>
                  </HStack> */}
                  <TextInput
                    style={styles.form}
                    value={ein}
                    onChangeText={setEin}
                    maxLength={9}
                    placeholder="TAX ID/ EIN"
                    returnKeyType={"next"}
                    keyboardType={"phone-pad"}
                    placeholderTextColor="#8a8a8a"
                    marginTop={20}
                  />
                  <PhoneMask
                    value={phone}
                    onChangeText={(masked) => {
                      setPhone(masked);
                    }}
                    returnKeyType={"next"}
                    keyboardType={"phone-pad"}
                    blurOnSubmit={true}
                    style={styles.form}
                    placeholder={"Telephone Number"}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <MidGradientButton
                onPress={handleNext}
                isLoading={isLoading}
                label="Create your profile page"
                formPosition="unset"
                disabled={
                  !selectedPhoto[0]?.node?.image?.uri ||
                  !serviceName ||
                  !serviceArea ||
                  !serviceDescription ||
                  !serviceType ||
                  !ein ||
                  !phone ||
                  phone.length < 10
                }
                formTop="unset"
                formLeft="unset"
                formBackgroundColor="rgba(255, 255, 255, 0.1)"
                formMarginTop="unset"
                labelColor="#FFF"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  alertmodalbgLayout: {
    width: "100%",
    position: "absolute",
  },
  titlePosition: {
    width: "100%",
    marginLeft: 15,
    marginVertical: 30,
  },
  titleLayout: {
    lineHeight: 22,
    fontSize: 16,
  },
  background: {
    width: "100%",
    height: "100%",
  },
  bgIconPosition: {
    left: 0,
    position: "absolute",
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
  photo: {
    width: 92,
    height: 92,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  avatar: {
    width: 98,
    height: 98,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    marginVertical: 30,
  },
  accessoryPosition: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: Padding.p_4xs,
    marginTop: 40,
    marginHorizontal: 20,
  },
  backIconLayout: {
    marginLeft: 5,
    height: 40,
    width: 40,
  },
  alertmodalbg: {
    left: 0,
    top: 0,
    height: "100%",
    overflow: "hidden",
  },
  form: {
    width: 327,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    color: "#FFF",
    fontSize: 14,
  },
  textarea: {
    width: 327,
    height: 100,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    paddingTop: 12,
    color: "#FFF",
  },
  forms: {
    alignItems: "center",
    marginTop: 20,
  },
  title1: {
    fontSize: 28,
    lineHeight: 33,
    fontWeight: "700",
    color: Color.labelColorDarkPrimary,
  },
  title2: {
    alignSelf: "stretch",
    color: Color.primaryAlmostGrey,
    marginTop: 8,
    marginBottom: 20,
    fontWeight: "300",
  },
  subtext: {
    fontSize: 12,
    color: "#8A8A8A",
    fontWeight: "300",
    marginLeft: 20,
  },
  signupscreen: {
    // backgroundColor: Color.labelColorDarkPrimary,
    width: "100%",
    overflow: "hidden",
    flex: 1,
  },
});

export default VendorCreate;
