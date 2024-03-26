import * as React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {Padding} from '../../GlobalStyles';
import {BlurView} from '@react-native-community/blur';
import Delete from '../../assets/deletecircle.svg';

export default ({navigation, route}) => {
  const handleNavigation = () => {
    if (route?.params?.screen) {
      navigation.navigate(route.params.screen);
    } else {
      navigation.navigate('UpdateUser', {success: true});
    }
  };

  return (
    <BlurView blurAmount={1} blurType="dark" style={styles.blurContainer}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={require('../../assets/icon.png')}
            />
            <Text style={styles.title}>Account Updated!</Text>
          </View>
          <View style={[styles.titleParent, styles.alertFlexBox]}>
            <Text style={styles.title2}>
              Keep in mind you can always edit your {'\n'}information under
              account settings.
            </Text>
          </View>
          <View style={styles.iconsaxlinearclosecircle}>
            <TouchableOpacity activeOpacity={0.2} onPress={handleNavigation}>
              <Delete />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  alertFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  alertmodalLayout: {
    width: '100%',
    position: 'absolute',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    minHeight: 201,
    maxHeight: 812,
    backgroundColor: '#F5F9FC',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingTop: 26,
    paddingBottom: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    width: 43,
    height: 39,
  },
  alertmodal: {
    paddingHorizontal: Padding.p_13xl,
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: '#000000',
    marginTop: 25,
  },
  title2: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '300',
    color: '#8A8A8A',
    width: '100%',
    textAlign: 'center',
  },
  titleParent: {
    marginTop: 14,
  },
  iconsaxlinearclosecircle: {
    width: 24,
    height: 24,
    zIndex: 1,
    overflow: 'hidden',
    position: 'absolute',
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 8,
  },
});
