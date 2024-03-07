import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Spinner} from 'native-base';
import {WebView} from 'react-native-webview';
import Config from 'react-native-config';
import apis from '../../../apis';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Color} from '../../../GlobalStyles';
import TopNavigationContent from '../../../components/TopNavigationContent';
import {useNavigation} from '@react-navigation/core';

export const PaymentMethod: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  useEffect(() => {
    apis.user
      .onboardStart()
      .then(response => {
        console.log('response', response);
      })
      .catch(e => {
        console.log('e', e);
      });
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <TopNavigationContent
        title="Payment Method"
        backStyle={{marginLeft: 20}}
        onBackPress={() => {
          navigation.toggleDrawer();
        }}
      />
      {loading && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            zIndex: 1,
          }}>
          <Spinner color="#0C1D37" />
        </View>
      )}
      <WebView
        source={{uri: Config.PRIVACY_LINK}}
        onLoadProgress={({nativeEvent}) => {
          this.loadingProgress = nativeEvent.progress;
          if (nativeEvent.progress === 1) {
            setLoading(false);
          }
        }}
      />
    </View>
  );
};
