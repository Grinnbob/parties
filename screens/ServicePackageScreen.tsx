import React, {useState, useMemo, useCallback} from 'react';
import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import {Padding, Border, FontFamily, Color} from '../GlobalStyles';
import {useToast} from 'native-base';
import apis from '../apis';
import TopNavigationContent from '../components/TopNavigationContent';
import ServicePackageModal from '../components/ServicePackageModal';
import StateTypes from '../stateManagement/StateTypes';
import useGlobalState from '../stateManagement/hook';
import {SelectInput} from '../components/Input';
import {TextInput} from '../components/Input';
import {TextInputWithAI} from '../components/Moleculs/TextInputWithAI';
import {PhotoInput} from '../components/Input/PhotoInput';
import {GradientButton} from '../components/Atoms';
import {useRecoilState} from 'recoil';
import {serviceTypesAtom, vendorProfileAtom} from '../stateManagement';
import FastImage from 'react-native-fast-image';

export const ServicePackageScreen = ({navigation, route}) => {
  const toast = useToast();
  const service = route.params?.service;
  const [serviceTypes] = useRecoilState(serviceTypesAtom);
  const [packageName, setPackageName] = useState(service?.name || '');
  const [serviceType, setServiceType] = useState(
    serviceTypes.data
      .find(item => item.id === service?.serviceTypes?.[0]?.id)
      ?.id?.toString() || '',
  );
  const [price, setPrice] = useState(service?.price?.toString() || '');
  const [rate, setRate] = useState(service?.rate || '');
  const [description, setDescription] = useState(service?.description || '');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState(service?.image || '');
  const [isNewPhoto, setIsNewPhoto] = useState(false);
  const [isAiDescriptionLoading, setIsAiDescriptionLoading] = useState(false);

  const [vendorProfile, setVendorProfile] = useRecoilState(vendorProfileAtom);

  const handlePhotoChange = (url: string) => {
    setIsNewPhoto(true);
    setPhoto(url);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const data = {
        name: packageName,
        type: serviceType,
        price: price,
        rate: rate,
        description: description,
        vendorId: vendorProfile.id,
      };
      let id = service?.id;
      let res;
      if (service) {
        res = await apis.service.update({
          id,
          ...data,
        });
      } else {
        res = await apis.service.create(data);
        id = res.data.id;
      }
      const updatedService = {...res.data};
      if (isNewPhoto) {
        const newPhoto = await apis.service.uploadServicePhoto({
          id,
          uri: photo,
        });
        console.log('newPhoto', newPhoto);
        FastImage.preload([
          {
            uri: newPhoto.data.image,
          },
        ]);
        updatedService.image = newPhoto.data.image;
      }
      setIsLoading(false);
      if (res && res.success === false) {
        toast.show({
          placement: 'top',
          description: res.message,
        });
      }
      if (res && res.success) {
        if (!service) {
          setModalVisible(true);
        } else {
          toast.show({
            placement: 'top',
            description: 'Service updated',
          });
          navigation.pop();
        }
        route.params?.onEdit({
          ...updatedService,
          id,
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const unitOptions = useMemo(() => {
    return [
      {
        label: 'Person',
        value: 'person',
      },
      {
        label: 'Hour',
        value: 'hour',
      },
      {
        label: 'Day',
        value: 'day',
      },
    ];
  }, []);

  const serviceTypeOptions = useMemo(() => {
    return serviceTypes.data.map(item => {
      return {
        label: item.title,
        value: String(item.id),
      };
    });
  }, [serviceTypes]);

  const generateAiDescription = useCallback(async () => {
    try {
      if (!packageName || !serviceType) {
        toast.show({
          placement: 'top',
          description: 'Please enter Package Name and Service Type',
        });
        return;
      }
      setIsAiDescriptionLoading(true);
      const response = await apis.service.generateAiDescription({
        name: packageName,
        type: serviceTypeOptions.find(item => item.value === serviceType)
          ?.label,
      });
      if (response.success && !!response.data.choices?.[0]?.message?.content) {
        setDescription(response.data.choices?.[0]?.message?.content);
      } else {
        toast.show({
          placement: 'top',
          description: 'AI not available now',
        });
      }
    } finally {
      setIsAiDescriptionLoading(false);
    }
  }, [packageName, serviceTypeOptions, serviceType, toast]);

  return (
    <>
      <ServicePackageModal
        modalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
      <ScrollView style={{backgroundColor: Color.labelColorLightPrimary}}>
        <View style={styles.servicepackagescreen}>
          <Image
            style={styles.bgIcon}
            resizeMode="cover"
            source={require('../assets/bg3.png')}
          />
          <TopNavigationContent LeftComponent={() => navigation.pop()} />
          <View style={styles.title}>
            <View>
              <Text style={styles.title1}>Service Package</Text>
              <Text style={styles.title2}>
                Tell hosts what you offer! Showcase your services by filling in
                your package info.
              </Text>
            </View>
          </View>

          <View style={styles.packagePosition}>
            <TextInput
              style={[styles.form, styles.formBorder]}
              inputProps={{
                placeholder: 'Package Name',
                keyboardType: 'default',
                value: packageName,
                onChangeText: setPackageName,
                marginBottom: 1,
              }}
            />
            <SelectInput
              selectedValue={serviceType}
              placeholder="Service Type"
              options={serviceTypeOptions}
              onValueChange={itemValue => setServiceType(itemValue)}
            />
            <Text style={styles.estimateThisPackage}>
              Estimate This Package Price
            </Text>
            <View style={[styles.starting, styles.formSpaceBlock1]}>
              <Text style={styles.perTypo}>Starting at</Text>
              <TextInput
                inputProps={{
                  value: price,
                  onChangeText: setPrice,
                  keyboardType: 'phone-pad',
                  returnKeyType: 'next',
                  placeholder: '--',
                  style: {
                    paddingLeft: 0,
                    paddingRight: 8,
                  },
                  InputLeftElement: (
                    <Text
                      style={[
                        styles.usdSymbol,
                        {
                          color:
                            price !== '' ? Color.textMainWhite : Color.gray300,
                        },
                      ]}>
                      $
                    </Text>
                  ),
                }}
                formControlProps={{
                  width: 60,
                }}
              />
              <Text style={styles.perTypo}>per</Text>
              <SelectInput
                selectedValue={rate}
                options={unitOptions}
                onValueChange={itemValue => setRate(itemValue)}
                placeholder="Person/ Hour / Day"
                width={160}
                style={{paddingLeft: 8, paddingRight: 0}}
                marginBottom={2}
                arrowIconStyle={{display: 'none'}}
              />
            </View>
            <TextInputWithAI
              label="Package Description"
              inputProps={{
                value: description,
                onChangeText: setDescription,
                keyboardType: 'default',
                placeholder: 'Service Package Description',
              }}
              isLoading={isAiDescriptionLoading}
              onGeneratePress={generateAiDescription}
            />
            <PhotoInput
              value={photo}
              label="Add Photo "
              isOptional={true}
              onChange={handlePhotoChange}
            />
          </View>
          <GradientButton
            text="Publish"
            disabled={!price || !rate || !packageName || !description}
            onPress={handleSave}
            style={styles.submitButton}
            loading={isLoading}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  packagePosition: {
    marginTop: 10,
    flexDirection: 'column',
    gap: 16,
  },
  formBorder: {
    paddingVertical: Padding.p_base,
    borderRadius: Border.br_5xs,
    borderWidth: 1,
    borderColor: 'rgba(138, 138, 138, 0.3)',
    borderStyle: 'solid',
    width: '100%',
    paddingHorizontal: Padding.p_5xl,
  },
  formSpaceBlock1: {
    flexDirection: 'row',
  },
  formSpaceBlock: {
    padding: Padding.p_base,
    marginLeft: 8,
    flexDirection: 'row',
    borderStyle: 'solid',
    borderRadius: Border.br_5xs,
    alignItems: 'center',
  },
  perTypo: {
    lineHeight: 21,
    fontFamily: FontFamily.typographyBodyMediumLight,
    fontWeight: '300',
    fontSize: 16,
    textAlign: 'left',
    color: Color.labelColorDarkPrimary,
  },
  header: {
    paddingBottom: Padding.p_4xs,
    paddingTop: Padding.p_4xs,
    width: '100%',
  },
  backIconLayout: {
    height: 40,
    width: 40,
  },
  xIconLayout: {
    height: 24,
    width: 24,
    overflow: 'hidden',
  },
  bgIcon: {
    top: 0,
    width: 665,
    height: 891,
    left: 0,
    position: 'absolute',
  },
  title1: {
    fontSize: 28,
    fontFamily: FontFamily.textLargeBold,
    width: 327,
    color: Color.labelColorDarkPrimary,
    fontWeight: '700',
    textAlign: 'left',
    marginTop: -16,
  },
  title2: {
    color: Color.gray300,
    marginTop: 8,
    fontFamily: FontFamily.typographyBodyMediumLight,
    fontWeight: '300',
    lineHeight: 22,
    fontSize: 16,
    width: 327,
    textAlign: 'left',
  },
  title: {
    paddingBottom: Padding.p_5xl,
    paddingTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
  form: {
    flexDirection: 'row',
    // paddingVertical: Padding.p_base,
    borderRadius: Border.br_5xs,
    alignItems: 'center',
    color: '#FFF',
    marginBottom: 5,
  },
  estimateThisPackage: {
    lineHeight: 24,
    fontFamily: FontFamily.typographyBodySmallBold,
    fontSize: 16,
    color: Color.labelColorDarkPrimary,
    fontWeight: '700',
    marginTop: 8,
  },
  form2: {
    marginLeft: 8,
    width: 80,
    borderWidth: 1,
    borderColor: 'rgba(138, 138, 138, 0.3)',
    color: '#FFF',
  },
  starting: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  form4: {
    height: 137,
    paddingVertical: Padding.p_base,
    borderRadius: Border.br_5xs,
    borderWidth: 1,
    borderColor: 'rgba(138, 138, 138, 0.3)',
    borderStyle: 'solid',
    width: '100%',
    paddingHorizontal: Padding.p_5xl,
    marginTop: 16,
    color: '#FFF',
    paddingTop: 20,
  },
  form5: {
    paddingVertical: Padding.p_base,
    borderRadius: Border.br_5xs,
    borderWidth: 1,
    borderColor: 'rgba(138, 138, 138, 0.3)',
    borderStyle: 'solid',
    width: '100%',
    paddingHorizontal: Padding.p_5xl,
    height: 54,
    marginTop: 16,
    alignItems: 'center',
    color: '#FFF',
  },
  topnavigationContent: {
    width: '100%',
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  servicepackagescreen: {
    backgroundColor: Color.labelColorLightPrimary,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    flex: 1,
    padding: 20,
  },
  submitButton: {
    marginTop: 32,
    marginBottom: 16,
  },
  usdSymbol: {
    color: Color.textMainWhite,
    fontSize: 16,
    lineHeight: 22,
    paddingLeft: 8,
    paddingRight: 0,
  },
});
