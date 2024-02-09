import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Share,
  ImageBackground,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import apis from "../../../apis";
import { useNavigation } from "@react-navigation/core";
import FastImage from "react-native-fast-image";
import { GradientButton, IconBg } from "../../../components/Atoms";
import {
  serviceTypesAtom,
  vendorProfileAlbumAtom,
  vendorProfileAtom,
  vendorProfileServiceAtom,
} from "../../../stateManagement";
import { useRecoilState } from "recoil";
import { styles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PencilIcon, ShareNetworkIcon } from "../../../components/Icons";
import { Color } from "../../../GlobalStyles";
import { ServicesList, SpecialitiesList } from "../../../components/Moleculs";
import { useServiceGroups } from "../../../hooks/useServiceGroups";
import { Skeleton } from "./Skeleton";
import { PastProjectsList } from "../../../components/Moleculs/PastProjectsList";

export const VendorProfileScreen = ({ route }) => {
  const insets = useSafeAreaInsets();

  const { navigate, push, toggleDrawer } = useNavigation();
  const [serviceTypes, setServiceTypes] = useRecoilState(serviceTypesAtom);
  const [vendorProfile, setVendorProfile] = useRecoilState(vendorProfileAtom);
  const [services, setServices] = useRecoilState(vendorProfileServiceAtom);
  const [album, setAlbum] = useRecoilState(vendorProfileAlbumAtom);
  const [isLoading, setIsLoading] = useState(true);

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

  const getServiceTypes = async () => {
    try {
      if (serviceTypes.isFetched) {
        return;
      }
      const res = await apis.serviceType.getAll();

      setServiceTypes({
        isFetched: true,
        data: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAlbum = async () => {
    try {
      if (album.isFetched) {
        return;
      }
      const res = await apis.album.getAll({ vendorId: vendorProfile.id });

      if (res && res.data) {
        setAlbum({
          isFetched: true,
          data: res.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getServices = async () => {
    try {
      if (services.isFetched) {
        return;
      }
      const res = await apis.service.getAll({ vendorId: vendorProfile.id });
      if (res && res.data) {
        setServices(() => {
          return {
            isFetched: true,
            data: res.data,
          };
        });
      }
    } catch (error) {
      console.log("getServicesError", error);
    }
  };

  useEffect(() => {
    if (!vendorProfile?.id) {
      return;
    }
    Promise.allSettled([getAlbum(), getServiceTypes(), getServices()]).then(
      () => {
        setIsLoading(false);
      }
    );
  }, [vendorProfile]);

  const { serviceGroups } = useServiceGroups(services.data);

  return (
    <ScrollView
      style={styles.scrollView}
      keyboardShouldPersistTaps="handled"
      bounces={false}
    >
      <View style={styles.mainContainer}>
        <View
          style={[
            styles.header,
            {
              paddingTop: insets.top ? insets.top : 16,
            },
          ]}
        >
          <IconBg style={styles.headerIcon}>
            <TouchableOpacity onPress={toggleDrawer} hitSlop={20}>
              <Image
                resizeMode="cover"
                source={require("../../../assets/iconsaxlinearhambergermenu1.png")}
              />
            </TouchableOpacity>
          </IconBg>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <TouchableOpacity onPress={() => push("Edit")}>
              <IconBg style={styles.headerIcon}>
                <PencilIcon width={24} color={Color.textMainWhite} />
              </IconBg>
            </TouchableOpacity>
            <TouchableOpacity onPress={onShare}>
              <IconBg style={styles.headerIcon}>
                <ShareNetworkIcon
                  width={24}
                  style={{ marginRight: 2 }}
                  color={Color.textMainWhite}
                />
              </IconBg>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.profileBackground}>
          <FastImage
            source={{
              uri: vendorProfile?.background || "",
            }}
            style={styles.profileBgImageContainer}
          />
        </View>
        <LinearGradient
          colors={["#FF077E", "transparent"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.bgGradient}
        />
        <View style={styles.avatarContainer}>
          <FastImage
            source={{
              uri: vendorProfile?.avatar || "",
            }}
            style={styles.avatarBg}
          />
        </View>

        {!!vendorProfile?.name && (
          <Text style={styles.businessNameText}>{vendorProfile.name}</Text>
        )}

        <View style={styles.forms}>
          <ImageBackground
            style={styles.background}
            resizeMode="repeat"
            source={require("../../../assets/bg7.png")}
          />
          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              <View style={styles.areaInfo}>
                {(vendorProfile?.city || vendorProfile?.state) && (
                  <Text style={styles.cityText}>
                    {vendorProfile?.city} {vendorProfile?.state}
                  </Text>
                )}
                {!!vendorProfile?.distance && (
                  <>
                    <View style={styles.milesInfo}>
                      <Text style={styles.cityText}>Service Area: </Text>
                      <Text style={styles.areaText}>
                        {vendorProfile?.distance
                          ? vendorProfile.distance
                          : "00"}{" "}
                        miles
                      </Text>
                    </View>
                  </>
                )}
              </View>
              <View style={[styles.sectionsContainer, styles.businessType]}>
                {!!Object.keys(serviceGroups).length && (
                  <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Business Type</Text>
                    <View style={styles.tagsContainer}>
                      {Object.keys(serviceGroups).map((name) => {
                        return (
                          <GradientButton
                            key={name}
                            text={name}
                            style={styles.gradientTag}
                          />
                        );
                      })}
                    </View>
                  </View>
                )}
                <SpecialitiesList keys={vendorProfile.listOfKeys} />
                {!!album.data.length && <PastProjectsList data={album.data} />}
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Description</Text>
                  <Text style={styles.descriptionText}>
                    {vendorProfile.description || "-"}
                  </Text>
                </View>
                {!!services.data?.length && (
                  <ServicesList
                    label="Service Packages"
                    services={services.data}
                    vendorId={vendorProfile.id}
                  />
                )}
              </View>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};
