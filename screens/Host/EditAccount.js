import React, {useState} from 'react';
import {Text, Divider, ScrollView} from 'native-base';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import StateTypes from '../../stateManagement/StateTypes';
import useGlobalState from '../../stateManagement/hook';
import MidGradientButton from '../../components/MidGradientButton';
import TopNavigationContent from '../../components/TopNavigationContent';
import Edit from '../../assets/pencil.svg';
import Person from '../../assets/onboard/profilecircle.svg';
import Lock from '../../assets/lock.svg';
import Trash from '../../assets/trash.svg';

function formatPhoneNumber(value) {
  var cleaned = ('' + value).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
}

export default ({navigation}) => {
  const [user] = useGlobalState(StateTypes.user.key, StateTypes.user.default);
  const [phone] = useState(user?.phoneNumber);

  console.log('useruseruser', user);

  return (
    <>
      <ScrollView style={{flex: 1}}>
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
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginTop: 30,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Person />
            <Text
              fontWeight="700"
              lineHeight={19}
              fontSize={16}
              color="#FFF"
              marginLeft={3}>
              Profile Information
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('UpdateUser')}
            style={{justifyContent: 'center'}}>
            <Edit />
          </TouchableOpacity>
        </View>
        <View
          style={{flexDirection: 'row', marginTop: 25, paddingHorizontal: 20}}>
          <View style={{flexDirection: 'column'}}>
            <Text
              color="#8A8A8A"
              fontSize={14}
              fontWeight={'300'}
              marginBottom={2}>
              First Name
            </Text>
            <Text color="#FFF" fontSize={16} fontWeight={'300'} lineHeight={19}>
              {user.firstName}
            </Text>
          </View>
          <View style={{flexDirection: 'column', marginLeft: 120}}>
            <Text
              color="#8A8A8A"
              fontSize={14}
              fontWeight={'300'}
              marginBottom={2}>
              Last Name
            </Text>
            <Text color="#FFF" fontSize={16} fontWeight={'300'} lineHeight={19}>
              {user.lastName}
            </Text>
          </View>
        </View>
        <View style={{marginTop: 25, paddingHorizontal: 20}}>
          <Text
            color="#8A8A8A"
            fontSize={14}
            fontWeight={'300'}
            marginBottom={2}>
            Email Address
          </Text>
          <Text color="#FFF" fontSize={16} fontWeight={'300'} lineHeight={19}>
            {user.email}
          </Text>
        </View>
        <View style={{marginTop: 25, marginBottom: 25, paddingHorizontal: 20}}>
          <Text
            color="#8A8A8A"
            fontSize={14}
            fontWeight={'300'}
            marginBottom={2}>
            Phone Number
          </Text>
          <Text color="#FFF" fontSize={16} fontWeight={'300'} lineHeight={19}>
            {formatPhoneNumber(phone)}
          </Text>
        </View>
        <Divider backgroundColor={'rgba(255, 255, 255, 0.2)'}></Divider>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 25,
            paddingHorizontal: 20,
          }}>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Lock />
              <Text
                fontWeight="700"
                lineHeight={22}
                fontSize={16}
                color="#FFF"
                marginLeft={3}>
                Password
              </Text>
            </View>

            <Text
              color="#FFF"
              fontWeight="500"
              fontSize="16"
              lineHeight={19}
              marginTop={3}>
              **********************
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ChangePassword')}>
            <Edit />
          </TouchableOpacity>
        </View>
        <Divider backgroundColor={'rgba(255, 255, 255, 0.2)'}></Divider>
        <Pressable
          style={{
            flexDirection: 'column',
            marginVertical: 25,
            paddingHorizontal: 20,
          }}
          onPress={() => navigation.navigate('DeleteAccountModal')}>
          <View style={{flexDirection: 'row'}}>
            <Trash />
            <Text
              fontWeight="700"
              fontSize={16}
              lineHeight={22}
              color="#FFF"
              marginBottom={2}
              marginLeft={3}>
              Delete Account
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text
              fontWeight="300"
              lineHeight={19}
              fontSize={12}
              color="#CDCCCD">
              I would like to delete my Party Favor account
            </Text>
          </View>
        </Pressable>
        {/*<View*/}
        {/*  style={{*/}
        {/*    bottom: 0,*/}
        {/*    justifyContent: 'center',*/}
        {/*    alignItems: 'center',*/}
        {/*    width: '100%',*/}
        {/*    marginTop: 70,*/}
        {/*  }}>*/}
        {/*  <MidGradientButton*/}
        {/*    // onPress={handleSave}*/}
        {/*    label="Update"*/}
        {/*    formBackgroundColor="rgba(255, 255, 255, 0.1)"*/}
        {/*    formMarginTop="unset"*/}
        {/*    labelColor="#FFF"*/}
        {/*  />*/}
        {/*</View>*/}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  bgIconPosition: {
    left: 0,
    position: 'absolute',
  },
});
