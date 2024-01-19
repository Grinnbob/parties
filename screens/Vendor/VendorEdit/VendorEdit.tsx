import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import apis from "../../../apis";
import { Text, useToast } from "native-base";
import useGlobalState from "../../../stateManagement/hook";
import StateTypes from "../../../stateManagement/StateTypes";
import { GooglePlacesAutocompleteRef } from "react-native-google-places-autocomplete";
import Skeleton from "./Skeleton";
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
  MAX_SPECIALITIES_KEY_COUNT,
  ProfileCompleteBanner,
  ServicesList,
  SpecialitiesList,
} from "../../../components/Moleculs";
import { useRecoilState } from "recoil";
import { KeyItemModel, ServiceModel } from "../../../models";
import { TextInputWithAI } from "../../../components/Moleculs/TextInputWithAI";
import {
  keyListAtom,
  selectedMediaAtom,
  vendorProfileServiceAtom,
  SelectedMediaEnum,
} from "../../../stateManagement";
import { styles } from "./styles";
import FastImage from "react-native-fast-image";
import cloneDeep from "lodash/cloneDeep";
import { Color } from "../../../GlobalStyles";

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

  const [vendorProfileServices, setVendorServices] = useRecoilState(
    vendorProfileServiceAtom
  );
  const [selectedMedia] = useRecoilState(selectedMediaAtom);
  const newAvatarUrl =
    selectedMedia[SelectedMediaEnum.VENDOR_PROFILE_AVATAR]?.[0].node.image.uri;
  const newProfileBgUrl =
    selectedMedia[SelectedMediaEnum.VENDOR_PROFILE_BG]?.[0].node.image.uri;
  const [serviceDescription, setServiceDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const [profileBackground, setProfileBackground] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState(currentVendor?.state || "");
  const [city, setCity] = useState(currentVendor?.city || "");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [distance, setDistance] = useState(currentVendor?.distance || "");
  const [loading, setLoading] = useState(true);
  const [isAiDescriptionLoading, setIsAiDescriptionLoading] = useState(false);

  const handleServiceDeleted = useCallback(
    (service: ServiceModel) => {
      const index = vendorProfileServices.findIndex(
        (item) => item.id === service.id
      );
      if (index >= 0) {
        const newServices = [...vendorProfileServices];
        newServices.splice(index, 1);
        setVendorServices(newServices);
      }
    },
    [vendorProfileServices]
  );

  const handleEditServiced = useCallback(
    (service: ServiceModel) => {
      const index = vendorProfileServices.findIndex(
        (item) => item.id === service.id
      );
      if (index >= 0) {
        const newServices = cloneDeep(vendorProfileServices);
        newServices[index] = service;
        setVendorServices(newServices);
      } else {
        setVendorServices([...vendorProfileServices, service]);
      }
    },
    [vendorProfileServices]
  );

  useEffect(() => {
    getVendorInfo();
  }, [user]);

  const getVendorInfo = async () => {
    try {
      if (currentVendor) {
        const res = await apis.vendor.getById(currentVendor?.id);
        if (res && res.data) {
          setServiceName(res.data.name);
          setServiceDescription(res.data.description);
          setAvatar(res.data.avatar);
          setProfileBackground(res.data.background);
          setCity(res.data.city);
          setState(res.data.state);
          setAddress(res.data.address);
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
    navigation.push("CameraEdit", {
      key: SelectedMediaEnum.VENDOR_PROFILE_AVATAR,
    });
  };

  const changeProfileBg = () => {
    navigation.push("CameraEdit", {
      key: SelectedMediaEnum.VENDOR_PROFILE_BG,
    });
  };

  const handleNext = async () => {
    try {
      let errorMessage = "";
      if (!avatar && !newAvatarUrl) {
        errorMessage = "Please add your avatar";
      } else if (!profileBackground && !newProfileBgUrl) {
        errorMessage = "Please add profile background";
      } else if (!serviceName) {
        errorMessage = "Please add Business Name";
      } else if (!address) {
        errorMessage = "Please add Address";
      } else if (!distance) {
        errorMessage = "Please select Service Area";
      } else if (vendorKeyList.length < MAX_SPECIALITIES_KEY_COUNT) {
        errorMessage = "Please add at least 5 Specialities";
      } else if (!serviceDescription) {
        errorMessage = "Please add Description";
      }

      if (errorMessage) {
        toast.show({
          placement: "top",
          description: errorMessage,
        });
        return;
      }

      setIsLoading(true);
      const data: Record<string, unknown> = {
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
        address: address,
        distance: distance,
        point: { type: "Point", coordinates: [long, lat] },
      };

      if (newAvatarUrl) {
        const avatarResponse = await apis.vendor.uploadAvatar({
          uri: newAvatarUrl,
          id: currentVendor?.id,
        });
        console.log("avatarResponse", avatarResponse);
        FastImage.preload([
          {
            uri: avatarResponse.updated.avatar,
          },
        ]);
        console.log("avatarRes", avatarResponse);
      }

      if (newProfileBgUrl) {
        const profileBackGroundResponse =
          await apis.vendor.uploadProfileBackground({
            uri: newProfileBgUrl,
            id: currentVendor?.id,
          });
        FastImage.preload([
          {
            uri: profileBackGroundResponse.updated.background,
          },
        ]);
        console.log("profileBackGroundResponse", profileBackGroundResponse);
      }

      const res = await apis.vendor.update(data);

      console.log("aaaaaabasdsadasd", res);
      await apis.joinVendorKey.createEditMulti({
        list: vendorKeyList,
        vendorId: currentVendor?.id,
      });

      if (res && res.success === false) {
        toast.show({
          placement: "top",
          description: res.message,
        });
      }
      setIsLoading(false);
      if (res && res.success) {
        toast.show({
          placement: "top",
          description: "Information updated successfully!",
        });
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

  const generateAiDescription = useCallback(async () => {
    try {
      if (vendorKeyList.length < MAX_SPECIALITIES_KEY_COUNT) {
        toast.show({
          placement: "top",
          description: `Please enter at ${MAX_SPECIALITIES_KEY_COUNT} Specialities`,
        });
        return;
      }
      setIsAiDescriptionLoading(true);
      const response = await apis.vendor.generateAiDescription({
        id: currentVendor.id,
        keys: vendorKeyList.map((item) => item.name),
      });
      console.log("generateAiDescription", response.data.choices);
      if (response.success && !!response.data.choices?.[0]?.message?.content) {
        setServiceDescription(response.data.choices?.[0]?.message?.content);
      } else {
        toast.show({
          placement: "top",
          description: "AI not available now",
        });
      }
    } finally {
      setIsAiDescriptionLoading(false);
    }
  }, [currentVendor, vendorKeyList, toast]);

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
          <View style={loading ? { opacity: 0 } : undefined}>
            <View
              style={[
                styles.accessoryPosition,
                { paddingTop: insets.top ? insets.top : 16 },
              ]}
            >
              <TouchableOpacity onPress={() => navigation.pop()} hitSlop={20}>
                <BackIcon />
              </TouchableOpacity>
              <Text style={styles.editPageText}>Edit Page</Text>
              <TouchableOpacity onPress={handleNext} hitSlop={20}>
                {isLoading ? (
                  <ActivityIndicator size={16} color={Color.primaryPink} />
                ) : (
                  <Text style={styles.saveText}>Save</Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.profileBg}>
              {newProfileBgUrl ? (
                <ImageBackground
                  source={{
                    uri: newProfileBgUrl,
                  }}
                  style={styles.profileBgImageContainer}
                  imageStyle={styles.profileBgImage}
                />
              ) : (
                <FastImage
                  source={{
                    uri: profileBackground,
                  }}
                  style={styles.profileBgImageContainer}
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

            <Text style={styles.businessNameText}>
              {serviceName || "Business Name"}
            </Text>

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
                    {distance ? distance : "00"} miles
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
                    maxLength: 45,
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
                      value={address}
                      textInputProps={{
                        onChangeText: setAddress,
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
                  selectedValue={distance}
                  placeholder="Service Area"
                  options={serviceAreaOptions}
                  onValueChange={(itemValue) => setDistance(itemValue)}
                  arrowIconStyle={styles.serviceAreaIcon}
                />

                <ProfileCompleteBanner
                  albumCompleted={false}
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
                  isLoading={isAiDescriptionLoading}
                  onGeneratePress={generateAiDescription}
                />

                <ServicesList
                  label="Service Packages"
                  services={vendorProfileServices}
                  vendorId={vendor[0].id}
                  onDelete={handleServiceDeleted}
                  onEdit={handleEditServiced}
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
