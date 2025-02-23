import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  AppState,
} from 'react-native';
import apis from '../../../apis';
import {Text, useToast} from 'native-base';
import useGlobalState from '../../../stateManagement/hook';
import StateTypes from '../../../stateManagement/StateTypes';
import {GooglePlacesAutocompleteRef} from 'react-native-google-places-autocomplete';
import {Skeleton} from './Skeleton';
import {
  AddBusinessIcon,
  AddPhotoIcon,
  BackIcon,
  PlusCircle,
} from '../../../components/Icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {
  LocationAutocomplete,
  SelectInput,
  TextInput,
} from '../../../components/Input';
import layout from '../../../utils/layout';
import {
  MAX_SPECIALITIES_KEY_COUNT,
  ProfileCompleteBanner,
  ServicesList,
  SpecialitiesList,
} from '../../../components/Moleculs';
import {useRecoilState} from 'recoil';
import {KeyItemModel, ServiceModel} from '../../../models';
import {TextInputWithAI} from '../../../components/Moleculs/TextInputWithAI';
import {
  keyListAtom,
  vendorProfileServiceAtom,
  vendorProfileAlbumAtom,
  vendorProfileAtom,
  serviceTypesAtom,
} from '../../../stateManagement';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import cloneDeep from 'lodash/cloneDeep';
import {Color} from '../../../GlobalStyles';
import {PastProjectsList} from '../../../components/Moleculs/PastProjectsList';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useImageSelect} from '../../../hooks/useImageSelect';
import { GetStripeButton } from '../../../components/Moleculs/GetStripeButton';
import { getVendorStripeStatus, onboardStart } from '../../../apis/routes/user';
import { Linking } from 'react-native';

const height = Dimensions.get('window').height;

type VendorEditProps = {
  navigation: any;
  route: {
    params?: {
      isCreate?: boolean;
    };
  };
};

export const VendorEdit: React.FC<VendorEditProps> = ({navigation, route}) => {
  const isCreate = !!route.params?.isCreate;
  const insets = useSafeAreaInsets();
  const [user] = useGlobalState(StateTypes.user.key, StateTypes.user.default);
  const [vendorKeyList, setVendorKeyList] = useRecoilState(keyListAtom);

  const {selectImage} = useImageSelect();
  const toast = useToast();
  const ref = useRef<GooglePlacesAutocompleteRef | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [vendor, setVendor] = useRecoilState(vendorProfileAtom);
  const [serviceName, setServiceName] = useState(vendor.name || '');
  const [services, setServices] = useRecoilState(vendorProfileServiceAtom);
  const [album, setAlbum] = useRecoilState(vendorProfileAlbumAtom);
  const [serviceTypes, setServiceTypes] = useRecoilState(serviceTypesAtom);
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const [newProfileBgUrl, setNewProfileBgUrl] = useState('');
  const [serviceDescription, setServiceDescription] = useState(
    vendor?.description || '',
  );
  const [avatar, setAvatar] = useState(vendor?.avatar || '');
  const [background, setBackground] = useState(vendor?.background || '');
  const [address, setAddress] = useState(vendor?.address || '');
  const [state, setState] = useState(vendor?.state || '');
  const [city, setCity] = useState(vendor?.city || '');
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [distance, setDistance] = useState(
    vendor?.distance ? String(vendor?.distance) : '',
  );
  const [isVendorLoading, setIsVendorLoading] = useState(!vendor?.id);
  const [isAiDescriptionLoading, setIsAiDescriptionLoading] = useState(false);
  const [, setToken] = useGlobalState(
    StateTypes.token.key,
    StateTypes.token.default,
  );
  const [isStripeLoading, setIsStripeLoading] = useState(false);
  const [isStripeCompleted, setIsStripeCompleted] = useState(false);
  const appState = useRef(AppState.currentState);


  const handleServiceDeleted = useCallback(
    (service: ServiceModel) => {
      const index = services.data.findIndex(item => item.id === service.id);
      if (index >= 0) {
        const newServices = [...services.data];
        newServices.splice(index, 1);
        setServices(prevState => {
          return {
            ...prevState,
            data: newServices,
          };
        });
      }
    },
    [services],
  );

  const handleEditServiced = useCallback(
    (service: ServiceModel) => {
      const index = services.data.findIndex(item => item.id === service.id);
      if (index >= 0) {
        const newServices = cloneDeep(services.data);
        newServices[index] = service;
        setServices(prevState => {
          return {
            ...prevState,
            data: newServices,
          };
        });
      } else {
        setServices(prevState => {
          return {
            ...prevState,
            data: [...prevState.data, service],
          };
        });
      }
    },
    [services],
  );

  useEffect(() => {
    if (user?.id) {
      getVendorInfo();
    }
  }, [user]);

  const getStripeStatus = async () => {
    const result = await getVendorStripeStatus();    
    if (result.success) {
      if (result.data.configured) setIsStripeCompleted(true);
    } else {
      toast.show({
        placement: 'top',
        description: `Can't get stripe status.`
      });
      setIsStripeCompleted(false);
    }
  }

  useEffect(() => {
    getStripeStatus();
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        getStripeStatus();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const getVendorInfo = async () => {
    try {
      let data;
      if (vendor?.id) {
        data = vendor;
      } else {
        const resp = await apis.vendor.getAll({userId: user.id});
        if (resp.data?.[0]) {
          data = resp.data[0];
        }
      }
      if (!album.isFetched) {
        const res = await apis.album.getAll({vendorId: data.id});

        if (res && res.data) {
          setAlbum({
            isFetched: true,
            data: res.data,
          });
        }
      }

      if (!services.isFetched) {
        const res = await apis.service.getAll({vendorId: data.id});
        if (res && res.data) {
          setServices(() => {
            return {
              isFetched: true,
              data: res.data,
            };
          });
        }
      }

      if (!serviceTypes.isFetched) {
        const res = await apis.serviceType.getAll();

        setServiceTypes({
          isFetched: true,
          data: res.data,
        });
      }

      if (data) {
        setServiceName(data.name);
        setServiceDescription(data.description);
        setAvatar(data.avatar);
        setBackground(data.background);
        setCity(data.city);
        setState(data.state);
        setAddress(data.address || '');
        ref.current?.setAddressText(data.address || '');
        setDistance(data.distance ? String(data.distance) : '');
        setVendorKeyList(data.listOfKeys || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsVendorLoading(false);
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

  const changeAvatar = async () => {
    const image = await selectImage();
    if (image?.assets?.[0]?.uri) {
      setNewAvatarUrl(image.assets?.[0].uri);
    }
  };

  const changeProfileBg = async () => {
    const image = await selectImage();
    if (image?.assets?.[0]?.uri) {
      setNewProfileBgUrl(image.assets?.[0].uri);
    }
  };

  const handleNext = async () => {
    try {
      let errorMessage = '';
      if (!avatar && !newAvatarUrl) {
        errorMessage = 'Please add your avatar';
      } else if (!background && !newProfileBgUrl) {
        errorMessage = 'Please add profile background';
      } else if (!serviceName) {
        errorMessage = 'Please add Business Name';
      } else if (!address) {
        errorMessage = 'Please add Address';
      } else if (!distance) {
        errorMessage = 'Please select Service Area';
      } else if (vendorKeyList.length < MAX_SPECIALITIES_KEY_COUNT) {
        errorMessage = 'Please add at least 5 Specialities';
      } else if (!serviceDescription) {
        errorMessage = 'Please add Description';
      } else if (!isStripeCompleted) {
        errorMessage = 'Please connect your Stripe account';
      }

      if (errorMessage) {
        toast.show({
          placement: 'top',
          description: errorMessage,
        });
        return;
      }

      setIsSaving(true);

      let vendorId = vendor?.id;
      const data: Record<string, unknown> = {
        id: vendorId,
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
        point: {type: 'Point', coordinates: [long, lat]},
        profileDone: true,
      };

      const res = await apis.vendor.update(data);

      let avatarResponse;
      if (newAvatarUrl) {
        avatarResponse = await apis.vendor.uploadAvatar({
          uri: newAvatarUrl,
          id: vendorId,
        });
        if (avatarResponse?.updated?.avatar) {
          FastImage.preload([
            {
              uri: avatarResponse?.updated?.avatar,
            },
          ]);
        }
      }

      let profileBackGroundResponse;
      if (newProfileBgUrl) {
        profileBackGroundResponse = await apis.vendor.uploadProfileBackground({
          uri: newProfileBgUrl,
          id: vendorId,
        });
        if (profileBackGroundResponse?.updated?.background) {
          FastImage.preload([
            {
              uri: profileBackGroundResponse?.updated?.background,
            },
          ]);
        }
      }

      await apis.joinVendorKey.createEditMulti({
        list: vendorKeyList,
        vendorId: vendorId,
      });

      if (res && res.success === false) {
        toast.show({
          placement: 'top',
          description: res.message,
        });
      }

      setIsSaving(false);
      if (res && res.success) {
        setVendor({
          ...data,
          avatar: avatarResponse?.updated?.avatar || avatar,
          background:
            profileBackGroundResponse?.updated?.background || background,
          listOfKeys: vendorKeyList,
        });
        if (isCreate) {
          navigation.navigate('VendorReadySell', {vendorId: res?.data?.id});
        } else {
          toast.show({
            placement: 'top',
            description: 'Information updated successfully!',
          });
          navigation.pop();
        }
      }
    } catch (error) {
      toast.show({
        placement: 'top',
        description: `${error}`,
      });
    }
  };

  const actualCity = city || vendor?.city;
  const actualState = state || vendor?.state;

  const serviceAreaOptions = useMemo(() => {
    const getLabel = (miles: number) => {
      return `${miles} miles${actualCity ? ` from ${actualCity}` : ''}${
        actualState ? ` , ${actualState}` : ''
      }`;
    };

    return [
      {
        label: getLabel(20),
        value: '20',
      },
      {
        label: getLabel(30),
        value: '30',
      },
      {
        label: getLabel(40),
        value: '40',
      },
      {
        label: getLabel(50),
        value: '50',
      },
    ];
  }, [actualCity, actualState]);

  const generateAiDescription = useCallback(async () => {
    try {
      if (vendorKeyList.length < MAX_SPECIALITIES_KEY_COUNT) {
        toast.show({
          placement: 'top',
          description: `Please enter at ${MAX_SPECIALITIES_KEY_COUNT} Specialities`,
        });
        return;
      }
      if (!services.data.length) {
        toast.show({
          placement: 'top',
          description: `Please created at least one Service`,
        });
        return;
      }
      setIsAiDescriptionLoading(true);
      const response = await apis.vendor.generateAiDescription({
        id: vendor.id,
        keys: vendorKeyList.map(item => item.name),
      });
      console.log('generateAiDescription', response.data.choices);
      if (response.success && !!response.data.choices?.[0]?.message?.content) {
        setServiceDescription(response.data.choices?.[0]?.message?.content);
      } else {
        toast.show({
          placement: 'top',
          description: 'AI not available now',
        });
      }
    } finally {
      setIsAiDescriptionLoading(false);
    }
  }, [vendor, vendorKeyList, toast]);

  const handleStripe = async () => {
    setIsStripeLoading(true);
    const response = await onboardStart();
    if (response?.success && response?.data?.url) {
      await Linking.openURL(response.data.url);
    }
    setIsStripeLoading(false);
    getStripeStatus();
  }

  return (
    <KeyboardAwareScrollView
      style={styles.scrollView}
      bounces={false}
      enableOnAndroid={true}
      extraScrollHeight={200}
      contentContainerStyle={{
        flexGrow: 1,
        minHeight: height,
      }}
      keyboardShouldPersistTaps="handled">
      <View style={styles.mainContainer}>
        {isVendorLoading && <Skeleton />}
        {!isVendorLoading && (
          <View>
            <View
              style={[
                styles.header,
                {paddingTop: insets.top ? insets.top : 16},
              ]}>
              <TouchableOpacity
                onPress={async () => {
                  if (!isCreate) {
                    navigation.pop();
                  } else {
                    await apis.device.deleteById(setToken);
                    setAlbum({
                      isFetched: false,
                      data: [],
                    });
                    setServices({
                      isFetched: false,
                      data: [],
                    });
                    setVendor({});
                  }
                }}
                hitSlop={20}
                style={styles.backIconContainer}>
                <BackIcon />
              </TouchableOpacity>
              <Text style={styles.editPageText}>Edit Page</Text>
              <TouchableOpacity
                onPress={handleNext}
                hitSlop={20}
                style={styles.backIconContainer}>
                {isSaving ? (
                  <ActivityIndicator size={16} color={Color.primaryPink} />
                ) : (
                  <Text style={styles.saveText}>Save</Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.profileBackground}>
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
                    uri: background,
                  }}
                  style={styles.profileBgImageContainer}
                />
              )}
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  position: 'absolute',
                  top: 100,
                }}>
                <TouchableOpacity
                  onPress={changeProfileBg}
                  style={styles.avatar}>
                  <AddPhotoIcon />
                </TouchableOpacity>
              </View>
            </View>

            <LinearGradient
              colors={['#FF077E', 'transparent']}
              start={{x: 0, y: 1}}
              end={{x: 0, y: 0}}
              style={styles.bgGradient}
            />

            {avatar || newAvatarUrl ? (
              <TouchableOpacity
                style={styles.avatarContainer}
                onPress={changeAvatar}>
                {newAvatarUrl ? (
                  <Image source={{uri: newAvatarUrl}} style={styles.avatarBg} />
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
                onPress={changeAvatar}>
                <AddBusinessIcon />
              </TouchableOpacity>
            )}

            <Text style={styles.businessNameText}>
              {serviceName || 'Business Name'}
            </Text>

            <View style={styles.forms}>
              <ImageBackground
                style={styles.background}
                resizeMode="repeat"
                source={require('../../../assets/bg7.png')}
              />
              <View style={styles.areaInfo}>
                <Text style={styles.cityText}>
                  {actualCity || 'City'}, {actualState || 'State'}
                </Text>
                <View style={styles.milesInfo}>
                  <Text style={styles.cityText}>Service Area:</Text>
                  <Text style={styles.areaText}>
                    {' '}
                    {distance ? distance : '00'} miles
                  </Text>
                </View>
              </View>
              <View style={styles.inputsContainer}>
                <TextInput
                  inputProps={{
                    placeholder: 'Business Name',
                    keyboardType: 'default',
                    onChangeText: setServiceName,
                    value: serviceName,
                    maxLength: 45,
                  }}
                />
                <ScrollView
                  horizontal={false}
                  keyboardShouldPersistTaps="handled"
                  scrollEnabled={false}>
                  <ScrollView
                    horizontal={true}
                    keyboardShouldPersistTaps="handled"
                    scrollEnabled={false}>
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
                        setAddress(details?.formatted_address);
                        setLat(details?.geometry?.location?.lat);
                        setLong(details?.geometry?.location?.lng);
                        setCity(
                          details?.address_components.find(addressComponent =>
                            addressComponent.types.includes('locality'),
                          )?.short_name ?? 'N/A',
                        );
                        setState(
                          details?.address_components.find(addressComponent =>
                            addressComponent.types.includes(
                              'administrative_area_level_1',
                            ),
                          )?.short_name ?? 'N/A',
                        );
                      }}
                    />
                  </ScrollView>
                </ScrollView>

                <SelectInput
                  selectedValue={distance}
                  placeholder="Service Area"
                  options={serviceAreaOptions}
                  onValueChange={itemValue => setDistance(itemValue)}
                  arrowIconStyle={styles.serviceAreaIcon}
                />

                <ProfileCompleteBanner
                  albumCompleted={!!album?.data?.length}
                  businessDescriptionCompleted={!!serviceDescription?.length}
                  servicesCompleted={!!services?.data?.length}
                  stripeCompleted={isStripeCompleted}
                /> 

                <GetStripeButton handleStripe={handleStripe} isLoading={isStripeLoading} />

                <SpecialitiesList
                  keys={vendorKeyList}
                  onChange={handleKeyChange}
                  onRemove={handleRemoveKey}
                />

                <PastProjectsList data={album.data} canEdit={true} />

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
                  services={services.data}
                  vendorId={vendor.id}
                  onDelete={handleServiceDeleted}
                  onEdit={handleEditServiced}
                  isShowEmptyListPlaceholder={true}
                />
              </View>
            </View>
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};
