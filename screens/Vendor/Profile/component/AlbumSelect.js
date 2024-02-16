import * as React from 'react';
import {ImageBackground, StyleSheet, Text, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Padding,
  FontFamily,
  Color,
  FontSize,
  Border,
} from '../../../../GlobalStyles';
import {useNavigation} from '@react-navigation/native';

const AlbumSelect = ({title, asset}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{
        width: '50%',
        // paddingVertical: 5,
        // paddingHorizontal: 5,
      }}
      onPress={() =>
        navigation.push('AlbumNavigator', {
          screen: 'Holiday',
          params: {
            title: title,
          },
        })
      }>
      <ImageBackground
        style={styles.boxcontainer}
        resizeMode="cover"
        source={asset}
        imageStyle={{borderRadius: 16}}>
        <Text style={[styles.favorites, styles.title1FlexBox]}>{title}</Text>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title1FlexBox: {
    textAlign: 'center',
    color: Color.labelColorDarkPrimary,
  },
  bgIcon: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  favorites: {
    marginTop: 8,
    fontFamily: FontFamily.typographyBodySmallBold,
    fontWeight: '700',
    fontSize: FontSize.textLargeBold_size,
    textAlign: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  boxcontainer: {
    height: 155,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    width: '100%',
    padding: 10,
  },
});

export default AlbumSelect;
