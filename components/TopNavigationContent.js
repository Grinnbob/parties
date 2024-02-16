import React from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';
import {Color, FontFamily} from '../GlobalStyles';
import {useNavigation} from '@react-navigation/core';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Back from '../assets/back.svg';

const TopNavigationContent = ({
  title,
  RightComponent,
  backStyle,
  LeftComponent,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        ...styles.topnavigationContent,
        paddingTop: insets.top ? insets.top : 16,
      }}>
      <Pressable
        onPress={LeftComponent ? LeftComponent : () => navigation.pop()}
        style={{marginLeft: 10, ...backStyle}}
        hitSlop={20}>
        <Back />
      </Pressable>
      <View style={styles.title}>
        <Text style={styles.title1}>{title}</Text>
      </View>
      {RightComponent ? (
        RightComponent
      ) : (
        <View style={{width: 30, height: 30}}></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  leftAccessory: {
    alignItems: 'center',
  },
  title1: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '700',
    fontFamily: FontFamily.typographyBodySmallBold,
    color: Color.labelColorDarkPrimary,
    textAlign: 'center',
    bottom: 7,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  topnavigationContent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
  },
});

export default TopNavigationContent;
