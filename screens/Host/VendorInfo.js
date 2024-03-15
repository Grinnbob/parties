import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {Color, Padding} from '../../GlobalStyles';
import apis from '../../apis';
import {GradientButton, IconBg} from '../../components/Atoms';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BackIcon} from '../../components/Icons';
import {Skeleton} from '../Vendor/VendorProfileScreen/Skeleton';
import {ServicesList, SpecialitiesList} from '../../components/Moleculs';
import {PastProjectsList} from '../../components/Moleculs/PastProjectsList';
import {useServiceGroups} from '../../hooks/useServiceGroups';
import {ProgressiveImage} from '../../components/Atoms/ProgressiveImage';
import {Skeleton as RBSkeleton} from 'native-base';

const VendorInfo = ({route, navigation}) => {
  const [vendorProfile, setVendorProfile] = useState();
  const [services, setServices] = useState([]);
  const [album, setAlbum] = useState([]);
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(true);

  const getServices = async () => {
    const res = await apis.service.getAll({vendorId: vendorProfile?.id});
    setServices(res.data);
  };

  const getAlbum = async () => {
    try {
      const res = await apis.album.getAll({vendorId: vendorProfile?.id});

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

  const getVendor = async () => {
    try {
      console.log('vendorProfile.id}', vendorProfile.id);
      const resp = await apis.vendor.getAll({userId: vendorProfile.id});
      console.log('resp', resp);
      if (resp.data?.[0]) {
        setVendorProfile(resp.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('routerouteroute', route);
    if (route && route?.params?.params.id !== vendorProfile?.id) {
      setVendorProfile(route?.params?.params);
    }
  }, [route, vendorProfile]);

  useEffect(() => {
    if (vendorProfile?.id) {
      Promise.allSettled([getAlbum(), getServices(), getVendor()]).then(() => {
        setIsLoading(false);
      });
    }
  }, [vendorProfile]);

  const {serviceGroups} = useServiceGroups(services);

  const handleQuoteYourParty = () => {
    navigation.navigate('RequestQuoteScreen', {
      vendor: vendorProfile,
      services,
    });
  };

  console.log('vendorProfile', vendorProfile);

  return (
    <ScrollView
      style={styles.scrollView}
      keyboardShouldPersistTaps="handled"
      bounces={false}>
      <View style={styles.mainContainer}>
        <View
          style={[
            styles.header,
            {
              paddingTop: insets.top ? insets.top : 16,
            },
          ]}>
          <IconBg style={styles.headerIcon}>
            <TouchableOpacity onPress={() => navigation.pop()} hitSlop={20}>
              <BackIcon />
            </TouchableOpacity>
          </IconBg>
        </View>
        <View style={styles.profileBackground}>
          <ProgressiveImage
            source={{
              uri: vendorProfile?.background || '',
            }}
            style={styles.profileBgImageContainer}
          />
        </View>
        <LinearGradient
          colors={['#FF077E', 'transparent']}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          style={styles.bgGradient}
        />
        <View style={styles.avatarContainer}>
          <ProgressiveImage
            source={{
              uri: vendorProfile?.avatar || '',
            }}
            style={styles.avatarBg}
            indicator={() => {
              return <RBSkeleton width={76} height={76} borderRadius={50} />;
            }}
          />
        </View>

        {!!vendorProfile?.name && (
          <Text style={styles.businessNameText}>{vendorProfile.name}</Text>
        )}

        <View style={styles.forms}>
          <ImageBackground
            style={styles.background}
            resizeMode="repeat"
            source={require('../../assets/bg7.png')}
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
                          : '00'}{' '}
                        miles
                      </Text>
                    </View>
                  </>
                )}
              </View>
              <View style={[styles.sectionsContainer, styles.businessType]}>
                <GradientButton
                  text="Quote Your Party"
                  onPress={handleQuoteYourParty}
                  textStyle={styles.quoteYourPartyText}
                  disabled={!vendorProfile}
                />
                {!!Object.keys(serviceGroups).length && (
                  <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Business Type</Text>
                    <View style={styles.tagsContainer}>
                      {Object.keys(serviceGroups).map(name => {
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
                {!!vendorProfile?.listOfKeys?.length && (
                  <SpecialitiesList
                    label="Specialties"
                    keys={vendorProfile?.listOfKeys}
                  />
                )}
                {!!album.data.length && <PastProjectsList data={album.data} />}
                {!!vendorProfile.description && (
                  <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>
                      {vendorProfile.description || '-'}
                    </Text>
                  </View>
                )}
                {!!services.data?.length && (
                  <ServicesList
                    label="Service Packages"
                    services={services}
                    vendorId={vendorProfile?.id}
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

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#000',
    width: '100%',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: Padding.p_base,
    paddingHorizontal: 16,
    zIndex: 10,
    left: 0,
    right: 0,
  },
  headerIcon: {width: 40, height: 40},
  iconLayout: {
    height: 32,
    width: 32,
  },
  bgIcon: {
    width: '100%',
    height: '100%',
    left: 0,
    position: 'absolute',
  },
  profileBackground: {
    width: '100%',
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  profileBgImageContainer: {
    width: '100%',
    height: 400,
  },
  bgGradient: {
    zIndex: 20,
    top: 200,
    height: 200,
    width: '100%',
    position: 'absolute',
  },
  avatarContainer: {
    width: 76,
    height: 76,
    borderRadius: 100,
    zIndex: 40,
    bottom: 100,
    marginLeft: 24,
    // backgroundColor: Color.textMainWhite,
  },
  avatarBg: {
    width: 76,
    height: 76,
    borderRadius: 100,
  },
  businessNameText: {
    fontSize: 20,
    lineHeight: 28,
    color: Color.textMainWhite,
    fontWeight: 'bold',
    zIndex: 40,
    bottom: 172,
    marginLeft: 114,
  },
  forms: {
    backgroundColor: 'black',
    width: '100%',
    marginTop: -170,
    zIndex: 30,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
  },
  background: {
    height: '120%',
    position: 'absolute',
    right: 0,
    top: -10,
    left: -250,
  },
  areaInfo: {
    flexDirection: 'column',
    marginTop: 8,
    marginBottom: 24,
    marginLeft: 90,
  },
  milesInfo: {
    flexDirection: 'row',
  },
  cityText: {
    fontSize: 16,
    lineHeight: 24,
    color: Color.textMainWhite,
  },
  areaText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: Color.textMainWhite,
  },
  sectionsContainer: {
    flexDirection: 'column',
    gap: 40,
    flex: 1,
    paddingBottom: 48,
  },
  sectionContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: Color.textMainWhite,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#CECDCE',
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  businessType: {
    marginTop: 20,
  },
  gradientTag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    minHeight: 32,
  },
  quoteYourPartyText: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default VendorInfo;
