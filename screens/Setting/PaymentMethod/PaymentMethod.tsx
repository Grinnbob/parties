import React, {useEffect, useState, useCallback} from 'react';
import {View, Linking} from 'react-native';
import {Spinner} from 'native-base';
import {WebView} from 'react-native-webview';
import apis from '../../../apis';
import TopNavigationContent from '../../../components/TopNavigationContent';
import {useNavigation} from '@react-navigation/core';
import {Color} from '../../../GlobalStyles';
import {useFocusEffect} from '@react-navigation/native';
import layout from '../../../utils/layout';

export const PaymentMethod: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    Linking.addEventListener('url', event => {
      if (
        event.url.includes(
          'payments/vendor/onboard-fail' || 'payments/vendor/onboard-success',
        )
      ) {
        setUrl('');
        setLoading(true);
        apis.user.onboardStart().then(response => {
          setUrl(response.data.url);
        });
      }
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      setUrl('');
      setLoading(true);
      apis.user.onboardStart().then(response => {
        console.log('response', response);
        setUrl(response.data.url);
      });
    }, []),
  );

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
            zIndex: 1,
            flex: 1,
            paddingBottom: 40,
            position: 'absolute',
            bottom: (layout.window.height - 150) / 2,
            left: (layout.window.width - 20) / 2,
          }}>
          <Spinner color={Color.primaryPink} size="lg" />
        </View>
      )}
      {!!url && (
        <WebView
          style={{backgroundColor: Color.labelColorLightPrimary}}
          source={{uri: url}}
          onLoadProgress={({nativeEvent}) => {
            this.loadingProgress = nativeEvent.progress;
            if (nativeEvent.progress === 1) {
              setLoading(false);
            }
          }}
        />
      )}
    </View>
  );
};
