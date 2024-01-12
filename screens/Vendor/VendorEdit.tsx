import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Padding, Color } from "../../GlobalStyles";
import apis from "../../apis";
import { Text, useToast } from "native-base";
import useGlobalState from "../../stateManagement/hook";
import StateTypes from "../../stateManagement/StateTypes";
import { GooglePlacesAutocompleteRef } from "react-native-google-places-autocomplete";
import Skeleton from "./components/Skeleton";
import {
  AddBusinessIcon,
  AddPhotoIcon,
  BackIcon,
} from "../../components/Icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import {
  LocationAutocomplete,
  SelectInput,
  TextInput,
} from "../../components/Input";
import layout from "../../utils/layout";
import {
  ProfileCompleteBanner,
  ServicesList,
  SpecialitiesList,
} from "../../components/Moleculs";
import { useRecoilState } from "recoil";
import { KeyItemModel } from "../../models";
import { TextInputWithAI } from "../../components/Moleculs/TextInputWithAI";
import {
  keyListAtom,
  vendorProfileAlbumAtom,
  vendorProfileServiceAtom,
} from "../../stateManagement";

const VendorEdit = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [imageList, setImageList] = useGlobalState(
    StateTypes.imageUploadList.key,
    StateTypes.imageUploadList.default
  );
  const [user, setUser] = useGlobalState(
    StateTypes.user.key,
    StateTypes.user.default
  );
  const [vendor, setVendor] = useGlobalState(
    StateTypes.vendor.key,
    StateTypes.vendor.default
  );
  const [vendorKeyList, setVendorKeyList] = useRecoilState(keyListAtom);
  const [selectedPhoto, setSelectedPhoto] = useGlobalState(
    StateTypes.selectedphoto.key,
    StateTypes.selectedphoto.default
  );

  const currentVendor = vendor[0];

  const toast = useToast();
  const ref = useRef<GooglePlacesAutocompleteRef | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceName, setServiceName] = useState("");

  const [vendorProfileServices, setVendorProfileServices] = useRecoilState(
    vendorProfileServiceAtom
  );
  const [vendorProfileAlbum, setVendorProfileAlbum] = useRecoilState(
    vendorProfileAlbumAtom
  );
  const [serviceInitialType, setServiceInitialType] = useState("");
  const [service, setService] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [phone, setPhone] = useState(currentVendor?.phoneNumber || "");
  const [serviceArea, setServiceArea] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [ein, setEin] = useState(currentVendor?.taxId?.toString() || "");
  const [imageOne, setImageOne] = useState("");
  const [imageTwo, setImageTwo] = useState("");
  const [imageThree, setImageThree] = useState("");
  const [imageFour, setImageFour] = useState("");
  const [avatar, setAvatar] = useState("");
  const [address, setAddress] = useState("");
  const [add, setAdd] = useState("");
  const [state, setState] = useState(currentVendor?.state || "");
  const [city, setCity] = useState(currentVendor?.city || "");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [distance, setDistance] = useState(currentVendor?.distance || "");
  const [vendorType, setVendorType] = useState([]);
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   setImageOne(imageList ? (imageList[0] ? imageList[0] : "") : "");
  //   setImageTwo(imageList ? (imageList[1] ? imageList[1] : "") : "");
  //   setImageThree(imageList ? (imageList[2] ? imageList[2] : "") : "");
  //   setImageFour(imageList ? (imageList[3] ? imageList[3] : "") : "");
  // }, [imageList]);

  useEffect(() => {
    getVendorInfo();
    grabVendor();
  }, [user]);

  useEffect(() => {
    setDistance(serviceArea);
  }, [serviceArea]);

  const getVendorInfo = async () => {
    try {
      if (currentVendor) {
        const res = await apis.vendor.getById(currentVendor?.id);
        if (res && res.data) {
          setServiceName(res.data.name);
          setServiceDescription(res.data.description);
          setEin(res.data.taxId.toString());
          setPhone(res.data.phoneNumber);
          setAvatar(res.data.avatar);
          setCity(res.data.city);
          setState(res.data.state);
          setAdd(res.data.address);
          ref.current?.setAddressText(res?.data?.address);
          setDistance(res.data.distance);
          setImageList(res.data.documents);
          setServiceInitialType(res.data.listOfType[0]?.id);
          setService(res.data.listOfType[0]?.title);
          setVendorKeyList(res.data.listOfKeys);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const grabVendor = async () => {
    try {
      const res = await apis.vendorType.getAll();

      setVendorType(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveKey = async (tag: KeyItemModel) => {
    try {
      await apis.joinVendorKey.deleteById(tag.id);
      const removed = vendorKeyList.filter((item, i) => item.id !== tag.id);
      setVendorKeyList(removed);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyChange = async (keys: KeyItemModel[]) => {
    setVendorKeyList(keys);
  };

  // const handleCamera = async (setter) => {
  //   try {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //     });

  //     if (!result.cancelled) {
  //       // Loop through selected images and update the state for each one
  //       result.assets.forEach((asset) => {
  //         setter(asset.uri);
  //       });
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
    navigation.navigate("CameraEdit", { pararms: "Edit" });
  };

  // const ImageCard = ({ image, setImage }) => {
  //   const handleDeleteImage = async () => {
  //     try {
  //       if (!image) {
  //         handleCamera(setImage);
  //         return;
  //       }

  //       if (!image.id) {
  //         return setImage("");
  //       }

  //       // Delete the image from the backend
  //       const res = await apis.document.deleteById(image.id);

  //       // Update the UI by removing the deleted image from the imageList
  //       setImageList(imageList.filter((img) => img.id !== image.id));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

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
  //           source={{ uri: image && image.link ? image.link : image }}
  //         >
  //           <Pressable onPress={handleDeleteImage}>
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

  const handleNext = async () => {
    try {
      setIsLoading(true);
      const res = await apis.vendor.update({
        id: currentVendor?.id,
        name: serviceName,
        description: serviceDescription,
        phoneNumber: phone,
        taxId: ein,
        userId: user.id,
        views: 0,
        sales: 0.0,
        favorites: 0,
        request: 0,
        completed: 0,
        city: city,
        state: state,
        address: address ? address : add,
        distance: distance,
        point: { type: "Point", coordinates: [long, lat] },
      });

      // console.log("UPDATE", res);

      if (selectedPhoto[0]?.node?.image?.uri) {
        const avatarRes = await apis.vendor.UploadAvatar({
          uri: selectedPhoto[0]?.node?.image?.uri,
          id: currentVendor?.id,
        });
      }
      // const list = [];

      // if (imageOne !== "") list.push(imageOne);
      // if (imageTwo !== "") list.push(imageTwo);
      // if (imageThree !== "") list.push(imageThree);
      // if (imageFour !== "") list.push(imageFour);

      // for (const el of list) {
      //   if (el && !el.id) {
      //     const document = await apis.document.create({
      //       uri: el,
      //       VendorId: currentVendor.id,
      //       type: serviceType ? serviceType : serviceInitialType,
      //     });
      //     console.log("DOC RES", document);
      //   }
      // }

      const key = await apis.joinVendorKey.createEditMulti({
        list: vendorKeyList,
        vendorId: currentVendor?.id,
      });

      if (serviceType && serviceInitialType) {
        const joinVendorType = await apis.joinVendorVendorType.update({
          id: currentVendor?.id,
          vendorTypeId: serviceType,
          prevVendorType: serviceInitialType,
        });

        console.log("JOIN VENDOR", joinVendorType);
      }

      if (res && res.success === false) {
        toast.show({
          placement: "top",
          description: res.message,
        });
        setIsLoading(false);
      }
      setIsLoading(false);
      if (res && res.success) {
        toast.show({
          placement: "top",
          description: "Service information updated successfully!",
        });
        setVendorKeyList(StateTypes.vendorKeyList.default);
        navigation.pop();
      }
    } catch (error) {
      toast.show({
        placement: "top",
        description: error,
      });
    }
  };

  const actualCity = city || currentVendor?.city;
  const actualState = state || currentVendor?.state;

  const serviceAreaOptions = useMemo(() => {
    const getLabel = (miles: number) => {
      return `${miles} miles${actualCity ? ` from ${actualCity}` : ""}${
        actualState ? ` , ${actualState}` : ""
      }`;
    };

    return [
      {
        label: getLabel(20),
        value: "20",
      },
      {
        label: getLabel(30),
        value: "30",
      },
      {
        label: getLabel(40),
        value: "40",
      },
      {
        label: getLabel(50),
        value: "50",
      },
    ];
  }, [actualCity, actualState]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView
        style={{ backgroundColor: "#000", width: "100%" }}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            paddingVertical: 10,
            paddingHorizontal: 0,
          }}
        >
          {loading && <Skeleton />}
          <View>
            <View
              style={[styles.accessoryPosition, { paddingTop: insets.top }]}
            >
              <TouchableOpacity onPress={() => navigation.pop()} hitSlop={20}>
                <BackIcon />
              </TouchableOpacity>
              <Text style={styles.editPageText}>Edit Page</Text>
              <TouchableOpacity
                onPress={handleNext}
                disabled={
                  !avatar ||
                  !serviceName ||
                  !add ||
                  !distance ||
                  !serviceDescription ||
                  // !serviceInitialType ||
                  !ein ||
                  !phone ||
                  phone.length < 10
                }
                hitSlop={20}
              >
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "100%",
                height: 400,
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {selectedPhoto[0]?.node?.image?.uri || avatar ? (
                <ImageBackground
                  source={{
                    uri: selectedPhoto[0]?.node?.image?.uri
                      ? selectedPhoto[0]?.node?.image?.uri
                      : avatar,
                  }}
                />
              ) : (
                <ImageBackground
                  source={require("../../assets/vendorEditHeader.png")}
                  style={{ width: "100%", height: 400 }}
                  imageStyle={{
                    position: "absolute",
                    bottom: 0,
                    resizeMode: "cover",
                    alignSelf: "flex-end",
                  }}
                />
              )}
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  position: "absolute",
                  top: 100,
                }}
              >
                <TouchableOpacity onPress={handleAvatar} style={styles.avatar}>
                  <AddPhotoIcon />
                </TouchableOpacity>
              </View>
            </View>

            <LinearGradient
              // locations={[1, 0]}
              colors={["#FF077E", "transparent"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={styles.bgGradient}
            />

            <TouchableOpacity style={styles.whiteCircle}>
              <AddBusinessIcon />
            </TouchableOpacity>

            <Text style={styles.businessNameText}>Business Name</Text>

            <View style={styles.forms}>
              <Image
                style={[styles.background, styles.bgIconPosition]}
                resizeMode="cover"
                source={require("../../assets/bg7.png")}
              />
              <View style={styles.areaInfo}>
                <Text style={styles.cityText}>
                  {actualCity || "City"}, {actualState || "State"}
                </Text>
                <View style={styles.milesInfo}>
                  <Text style={styles.cityText}>Service Area:</Text>
                  <Text style={styles.areaText}>
                    {" "}
                    {serviceArea ? serviceArea : "00"} miles
                  </Text>
                </View>
              </View>
              <View style={styles.inputsContainer}>
                <TextInput
                  inputProps={{
                    placeholder: "Business Name",
                    keyboardType: "default",
                    onChangeText: setServiceName,
                    value: serviceName,
                  }}
                />
                <ScrollView horizontal={false}>
                  <ScrollView horizontal={true}>
                    <LocationAutocomplete
                      ref={ref}
                      fetchDetails={true}
                      placeholder="Location"
                      styles={{
                        textInputContainer: {
                          width: layout.window.width - 48,
                        },
                      }}
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
                    />
                  </ScrollView>
                </ScrollView>

                <SelectInput
                  selectedValue={
                    serviceArea ? serviceArea : distance.toString()
                  }
                  placeholder="Service Area"
                  options={serviceAreaOptions}
                  onValueChange={(itemValue) => setServiceArea(itemValue)}
                  arrowIconStyle={styles.serviceAreaIcon}
                />

                <ProfileCompleteBanner
                  albumCompleted={!!vendorProfileAlbum.length}
                  businessDescriptionCompleted={!!serviceDescription.length}
                  servicesCompleted={!!vendorProfileServices.length}
                />

                <SpecialitiesList
                  keys={vendorKeyList}
                  onChange={handleKeyChange}
                  onRemove={handleRemoveKey}
                />

                <TextInputWithAI
                  label="Description"
                  inputProps={{
                    value: serviceDescription,
                    onChangeText: (text: string) => setServiceDescription(text),
                    maxLength: 440,
                  }}
                />

                <ServicesList
                  label="Service Packages"
                  services={vendorProfileServices}
                  vendorId={vendor[0].id}
                />

                {/* <Box alignItems="center" mt={3}>
                    <Input
                      w={327}
                      py="0"
                      borderRadius={8}
                      borderColor={"rgba(255, 255, 255, 0.2)"}
                      InputRightElement={
                        <SelectButton image={imageOne} setImage={setImageOne} />
                      }
                      placeholder={
                        imageList
                          ? `Photo (${imageList.length})`
                          : "Service cover image"
                      }
                      placeholderTextColor={"#8A8A8A"}
                      fontSize={14}
                    />
                  </Box> */}
                {/* <HStack style={{ width: "100%", marginLeft: 45 }}>
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
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: Padding.p_base,
    paddingHorizontal: 16,
    zIndex: 10,
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#4D4D4D80",
  },
  backIconLayout: {
    marginLeft: 5,
    height: 40,
    width: 40,
  },
  alertmodalbg: {
    height: "100%",
    overflow: "hidden",
  },
  input: {
    width: layout.window.width - 48,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    color: "#FFF",
    fontSize: 14,
    minHeight: 54,
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
  bgGradient: {
    zIndex: 20,
    top: 200,
    height: 200,
    width: "100%",
    position: "absolute",
  },
  forms: {
    backgroundColor: "black",
    alignItems: "center",
    marginTop: -170,
    zIndex: 30,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
  },
  whiteCircle: {
    width: 76,
    height: 76,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.textMainWhite,
    borderRadius: 100,
    zIndex: 40,
    bottom: 100,
    marginLeft: 24,
  },
  businessNameText: {
    fontSize: 20,
    lineHeight: 28,
    color: Color.textMainWhite,
    fontWeight: "bold",
    zIndex: 40,
    bottom: 172,
    marginLeft: 114,
  },
  areaInfo: {
    flexDirection: "column",
    marginTop: 8,
    marginBottom: 24,
    marginLeft: 4,
  },
  milesInfo: {
    flexDirection: "row",
  },
  inputsContainer: {
    flexDirection: "column",
    gap: 24,
    flex: 1,
    paddingBottom: 48,
  },
  title2: {
    alignSelf: "stretch",
    color: Color.primaryAlmostGrey,
    marginTop: 8,
    marginBottom: 20,
    fontWeight: "300",
  },
  editPageText: {
    color: Color.textMainWhite,
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 25,
    marginLeft: 18,
  },
  saveText: {
    fontSize: 16,
    lineHeight: 22,
    color: Color.primaryPink,
  },
  cityText: {
    fontSize: 16,
    lineHeight: 24,
    color: Color.textMainWhite,
  },
  areaText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    color: Color.textMainWhite,
  },
  serviceAreaIcon: {
    transform: [{ rotate: "270deg" }],
  },
});

export default VendorEdit;
