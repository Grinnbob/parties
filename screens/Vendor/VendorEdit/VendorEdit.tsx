import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import apis from "../../../apis";
import { Text, useToast } from "native-base";
import useGlobalState from "../../../stateManagement/hook";
import StateTypes from "../../../stateManagement/StateTypes";
import { GooglePlacesAutocompleteRef } from "react-native-google-places-autocomplete";
import Skeleton from "../components/Skeleton";
import {
  AddBusinessIcon,
  AddPhotoIcon,
  BackIcon,
  PlusCircle,
} from "../../../components/Icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import {
  LocationAutocomplete,
  SelectInput,
  TextInput,
} from "../../../components/Input";
import layout from "../../../utils/layout";
import {
  ProfileCompleteBanner,
  ServicesList,
  SpecialitiesList,
} from "../../../components/Moleculs";
import { useRecoilState } from "recoil";
import { KeyItemModel } from "../../../models";
import { TextInputWithAI } from "../../../components/Moleculs/TextInputWithAI";
import {
  keyListAtom,
  vendorSelectedMediaAtom,
  vendorProfileServiceAtom,
  VendorSelectedMediaEnum,
} from "../../../stateManagement";
import { styles } from "./styles";
import FastImage from "react-native-fast-image";

const VendorEdit = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [user] = useGlobalState(StateTypes.user.key, StateTypes.user.default);
  const [vendor] = useGlobalState(
    StateTypes.vendor.key,
    StateTypes.vendor.default
  );
  const [vendorKeyList, setVendorKeyList] = useRecoilState(keyListAtom);

  const currentVendor = vendor[0];

  const toast = useToast();
  const ref = useRef<GooglePlacesAutocompleteRef | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceName, setServiceName] = useState("");

  const [vendorProfileServices] = useRecoilState(vendorProfileServiceAtom);
  const [vendorSelectedMedia] = useRecoilState(vendorSelectedMediaAtom);
  const newAvatarUrl =
    vendorSelectedMedia[VendorSelectedMediaEnum.PROFILE_AVATAR]?.[0].node.image
      .uri;
  const newProfileBgUrl =
    vendorSelectedMedia[VendorSelectedMediaEnum.PROFILE_BG]?.[0].node.image.uri;
  const [serviceArea, setServiceArea] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const [address, setAddress] = useState("");
  const [add, setAdd] = useState("");
  const [state, setState] = useState(currentVendor?.state || "");
  const [city, setCity] = useState(currentVendor?.city || "");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [distance, setDistance] = useState(currentVendor?.distance || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVendorInfo();
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
          setAvatar(res.data.avatar);
          setCity(res.data.city);
          setState(res.data.state);
          setAdd(res.data.address);
          ref.current?.setAddressText(res?.data?.address);
          setDistance(res.data.distance);
          setVendorKeyList(res.data.listOfKeys);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

  const changeAvatar = () => {
    navigation.navigate("CameraEdit", {
      key: VendorSelectedMediaEnum.PROFILE_AVATAR,
    });
  };

  const changeProfileBg = () => {
    navigation.navigate("CameraEdit", {
      key: VendorSelectedMediaEnum.PROFILE_BG,
    });
  };

  const handleNext = async () => {
    try {
      setIsLoading(true);
      const res = await apis.vendor.update({
        id: currentVendor?.id,
        name: serviceName,
        description: serviceDescription,
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

      if (newAvatarUrl) {
        const avatarRes = await apis.vendor.UploadAvatar({
          uri: newAvatarUrl,
          id: currentVendor?.id,
        });
      }

      await apis.joinVendorKey.createEditMulti({
        list: vendorKeyList,
        vendorId: currentVendor?.id,
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
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <View style={styles.mainContainer}>
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
                  !serviceDescription
                }
                hitSlop={20}
              >
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.profileBg}>
              <ImageBackground
                source={
                  newProfileBgUrl
                    ? {
                        uri: newProfileBgUrl,
                      }
                    : require("../../../assets/vendorEditHeader.png")
                }
                style={styles.profileBgImageContainer}
                imageStyle={styles.profileBgImage}
              />
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  position: "absolute",
                  top: 100,
                }}
              >
                <TouchableOpacity
                  onPress={changeProfileBg}
                  style={styles.avatar}
                >
                  <AddPhotoIcon />
                </TouchableOpacity>
              </View>
            </View>

            <LinearGradient
              colors={["#FF077E", "transparent"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={styles.bgGradient}
            />

            {avatar || newAvatarUrl ? (
              <TouchableOpacity
                style={styles.avatarTouchable}
                onPress={changeAvatar}
              >
                {newAvatarUrl ? (
                  <Image
                    source={{ uri: newAvatarUrl }}
                    style={styles.avatarBg}
                  />
                ) : (
                  <FastImage
                    source={{
                      uri: avatar,
                    }}
                    style={styles.avatarBg}
                  />
                )}

                <PlusCircle style={styles.avatarPlusIcon} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.whiteCircle}
                onPress={changeAvatar}
              >
                <AddBusinessIcon />
              </TouchableOpacity>
            )}

            <Text style={styles.businessNameText}>Business Name</Text>

            <View style={styles.forms}>
              <Image
                style={[styles.background, styles.bgIconPosition]}
                resizeMode="cover"
                source={require("../../../assets/bg7.png")}
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
                  albumCompleted={!!vendorSelectedMedia.length}
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
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VendorEdit;
