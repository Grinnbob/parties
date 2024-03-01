import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, View, Pressable, FlatList} from 'react-native';
import {Text, VStack} from 'native-base';
import {Color} from '../../GlobalStyles';
import {useNavigation} from '@react-navigation/core';
import apis from '../../apis';
import useGlobalState from '../../stateManagement/hook';
import StateTypes from '../../stateManagement/StateTypes';
import Close from '../../assets/closeSearch.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useDebounce from '../../utils/useDebounce';
import {SearchInput} from '../../components/Input/SearchInput';
import {VendorCard} from '../../components/VendorCard';

const HelpSearchScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recentResult, setRecentResult] = useState([]);
  const debounceSearchText = useDebounce(searchText);
  const [vendorList, setVendorList] = useState([]);
  const [user] = useGlobalState(StateTypes.user.key, StateTypes.user.default);

  const viewRecentSearch = async recent => {
    setSearchText(recent.name);
  };

  const grabRecentSearch = async () => {
    try {
      const res = await apis.recentSearch.getAll({userId: user.id});

      if (res && res.success) {
        setRecentResult(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeRecentSearch = async () => {
    try {
      await apis.recentSearch.deleteByUserId(user.id);
      setRecentResult([]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const grabAllVendor = async () => {
      if (!debounceSearchText) {
        setVendorList([]);
        return;
      }
      try {
        setIsLoading(true);
        const res = await apis.vendor.getSearchResults({
          search: debounceSearchText,
        });

        if (recentResult?.[0]?.name !== debounceSearchText) {
          apis.recentSearch.create({name: debounceSearchText}).then(() => {
            grabRecentSearch();
          });
        }

        setVendorList(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    grabAllVendor();
  }, [debounceSearchText]);

  const handleSearchTextChange = str => {
    setSearchText(str);
  };

  console.log('recentResult', recentResult);

  return (
    <View
      style={[
        styles.helpsearchscreen,
        {paddingTop: insets.top ? insets.top : 16},
      ]}>
      <Image
        style={styles.bgIcon}
        resizeMode="cover"
        source={require('../../assets/bg21.png')}
      />
      <View style={[styles.alertmodalbg, styles.alertmodalbgLayout]} />
      <View style={styles.topnavigationContent}>
        <Pressable style={styles.backLayout} onPress={() => navigation.pop()}>
          <Image
            style={styles.vectorIcon}
            resizeMode="cover"
            source={require('../../assets/vector14.png')}
          />
        </Pressable>
        <View style={styles.title2}>
          <Text style={styles.title3}>What Can We Help You With</Text>
        </View>
        <View style={{width: 40, height: 40}}></View>
      </View>
      <SearchInput
        value={searchText}
        onChangeText={handleSearchTextChange}
        containerStyle={{
          marginTop: 4,
          paddingHorizontal: 24,
          marginBottom: 10,
        }}
        loading={isLoading}
      />

      <FlatList
        data={vendorList}
        style={{flex: 1}}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          gap: 16,
          marginTop: 8,
          paddingBottom: 48,
        }}
        ListHeaderComponent={
          debounceSearchText.length >= 1 ? (
            <View />
          ) : (
            <VStack>
              <VStack
                flexDirection="row"
                justifyContent="space-between"
                paddingHorizontal={24}
                marginTop={5}>
                <Text color={'#FFF'} fontSize={16}>
                  Recent search
                </Text>
                <Pressable
                  style={{
                    backgroundColor: 'rgba(255, 7, 126, 0.30)',
                    borderRadius: 100,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={removeRecentSearch}>
                  <Text
                    color={'#FFF'}
                    fontWeight={'300'}
                    fontSize={12}
                    marginRight={2}>
                    Clear
                  </Text>
                  <Close />
                </Pressable>
              </VStack>
              <VStack mt={3} ml={4}>
                {recentResult.slice(0, 5).map((recent, i) => {
                  return (
                    <Pressable key={i} onPress={() => viewRecentSearch(recent)}>
                      <Text style={styles.searchTerm}>{recent.name}</Text>
                    </Pressable>
                  );
                })}
              </VStack>
            </VStack>
          )
        }
        renderItem={({item}) => {
          return debounceSearchText.length >= 1 ? (
            <VendorCard
              name={item.name}
              background={item.background}
              vendor={item}
            />
          ) : (
            <View />
          );
        }}
        ListEmptyComponent={() =>
          debounceSearchText.length ? (
            <Text style={[styles.searchTerm, styles.noResultsText]}>
              No result found
            </Text>
          ) : (
            <View />
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  border: {
    marginHorizontal: 13,
    marginVertical: 9,
  },
  backLayout: {
    marginTop: 20,
    marginLeft: 15,
    height: 40,
    width: 40,
  },
  bgIcon: {
    top: 0,
    width: 665,
    height: 1193,
    left: 0,
    position: 'absolute',
  },
  left: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchTerm: {
    color: '#8A8A8A',
    marginBottom: 5,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    marginLeft: 5,
  },
  noResultsText: {
    textAlign: 'center',
  },
  vectorIcon: {
    overflow: 'hidden',
  },
  title3: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: '700',
    textAlign: 'center',
    color: Color.labelColorDarkPrimary,
  },
  title2: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  topnavigationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  helpsearchscreen: {
    backgroundColor: Color.labelColorLightPrimary,
    width: '100%',
    // height: 812,
    overflow: 'hidden',
    flex: 1,
  },
  alertmodalbg: {
    backgroundColor: Color.primarySoBlack,
    left: 0,
    top: 0,
    height: '100%',
    overflow: 'hidden',
  },
  alertmodalbgLayout: {
    width: '100%',
    position: 'absolute',
  },
});

export default HelpSearchScreen;
