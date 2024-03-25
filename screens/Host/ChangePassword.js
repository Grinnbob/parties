import React, {useState} from 'react';
import {Text, Divider, useToast, VStack} from 'native-base';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import StateTypes from '../../stateManagement/StateTypes';
import useGlobalState from '../../stateManagement/hook';
import MidGradientButton from '../../components/MidGradientButton';
import TopNavigationContent from '../../components/TopNavigationContent';
import Lock from '../../assets/lock.svg';
import PasswordInput from '../../components/Input/PasswordInput';
import apis from '../../apis';
import {specialChar, upper, numerical} from '../../utils/validation';
import Check from '../../assets/onboard/checkgreen.svg';

export default ({navigation}) => {
  const toast = useToast();
  const [user, setUser] = useGlobalState(
    StateTypes.user.key,
    StateTypes.user.default,
  );
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [special, setSpecial] = useState(false);
  const [numeric, setNumeric] = useState(false);
  const [capitalLetter, setCapitalLetter] = useState(false);

  const verifySpecialChar = password => {
    setSpecial(specialChar.test(password));
    return specialChar.test(password);
  };

  const verifyChar = password => {
    setCapitalLetter(upper.test(password));
    return upper.test(password);
  };

  const verifyNum = password => {
    setNumeric(numerical.test(password));
    return numerical.test(password);
  };

  const handleUpdatePassword = async () => {
    setIsLoading(true);
    const res = await apis.auth.forgotPassword({
      id: user.id,
      currentPassword: currentPassword,
      newPassword: password,
    });
    if (res && res.success === false) {
      toast.show({
        placement: 'top',
        description: res.message,
      });
      setIsLoading(false);
    }
    if (res && res.success) {
      setIsLoading(false);
      setCurrentPassword('');
      setPassword('');
      setConfirmPassword('');
      navigation.navigate('SuccessPassword', {screen: 'EditAccount'});
    }
    setIsLoading(false);
  };

  return (
    <>
      <Image
        style={[styles.background, styles.bgIconPosition]}
        resizeMode="cover"
        source={require('../../assets/bg16.png')}
      />
      <View style={{width: '100%', height: 20}}></View>
      <TopNavigationContent
        title={'Account Setting'}
        backStyle={{marginLeft: 20}}
      />
      <Divider backgroundColor={'rgba(255, 255, 255, 0.2)'}></Divider>
      <View
        style={{
          justifyContent: 'space-between',
          height: '80%',
        }}>
        <View style={{marginTop: 25}}>
          <Text
            fontWeight="300"
            lineHeight={22}
            fontSize={16}
            color="#FFF"
            marginLeft={4}>
            Change your password
          </Text>

          <View
            style={{
              alignItems: 'center',
              marginTop: 10,
            }}>
            <VStack my={2} width="90%">
              <PasswordInput
                value={currentPassword}
                onChangeText={text => setCurrentPassword(text)}
                returnKeyType="default"
                blurOnSubmit={true}
                variant="underlined"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder={'*************'}
                LeftComponent={<Lock />}
                color="#FFF"
              />
            </VStack>
            <VStack my={2} width="90%">
              <PasswordInput
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  verifySpecialChar(text);
                  verifyChar(text);
                  verifyNum(text);
                }}
                rnKeyType="default"
                blurOnSubmit={true}
                variant="underlined"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder={'New Password'}
                LeftComponent={<View />}
                color="#FFF"
              />
            </VStack>
            <VStack my={2} width="90%">
              <PasswordInput
                value={confirmPassword}
                onChangeText={text => {
                  setConfirmPassword(text);
                }}
                returnKeyType="default"
                blurOnSubmit={true}
                label="Email"
                variant="underlined"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder={'Re-enter Password'}
                LeftComponent={<View />}
                color="#FFF"
              />
            </VStack>
          </View>
          <VStack style={{paddingHorizontal: 23}}>
            <VStack
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 15,
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '500',
                  color: capitalLetter ? '#FFFFFF' : '#8A8A8A',
                }}>
                At least 1 capital letter
              </Text>
              {capitalLetter ? <Check /> : <></>}
            </VStack>
            <VStack
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 15,
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '500',
                  color: numeric ? '#FFFFFF' : '#8A8A8A',
                }}>
                At least 1 numeric value
              </Text>
              {numeric ? <Check /> : <></>}
            </VStack>
            <VStack
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 15,
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '500',
                  color: special ? '#FFFFFF' : '#8A8A8A',
                }}>
                At least 1 special character
              </Text>
              {special ? <Check /> : <></>}
            </VStack>
            <VStack
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 5,
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '500',
                  color: password?.length >= 8 ? '#FFFFFF' : '#8A8A8A',
                }}>
                Password length must be 8 characters at least
              </Text>
              {password?.length >= 8 ? <Check /> : <></>}
            </VStack>
            <VStack
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '500',
                  color:
                    password && password === confirmPassword
                      ? '#FFFFFF'
                      : '#8A8A8A',
                }}>
                Both passwords match
              </Text>
              {password && password === confirmPassword ? <Check /> : <></>}
            </VStack>
          </VStack>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <MidGradientButton
            onPress={handleUpdatePassword}
            label="Next"
            isLoading={isLoading}
            disabled={!password || !confirmPassword}
            formBackgroundColor="rgba(255, 255, 255, 0.1)"
            formMarginTop="unset"
            labelColor="#FFF"
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  bgIconPosition: {
    position: 'absolute',
  },
});
