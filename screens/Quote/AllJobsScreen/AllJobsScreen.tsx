import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  ListRenderItemInfo,
  Text,
  View,
} from 'react-native';
import {styles} from './styles';
import {Tabs} from '../../../components/Atoms';
import apis from '../../../apis';
import {QuoteModel, QuoteStatusEnum} from '../../../models';
import {PartyCard} from './PartyCard';
import {useNavigation} from '@react-navigation/native';
import {Color} from '../../../GlobalStyles';
import {useRecoilState} from 'recoil';
import {quotesListAtom, selectedQuoteAtom} from '../../../stateManagement';
import cloneDeep from 'lodash/cloneDeep';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {sleep} from '../../../utils/sleep';

const tabs = [
  {
    id: 'new',
    label: 'New Requests',
    statuses: [QuoteStatusEnum.NEW],
  },
  {
    id: 'pending',
    label: 'Pending',
    statuses: [
      QuoteStatusEnum.ACCEPTED_BY_VENDOR,
      QuoteStatusEnum.PENDING,
    ],
  },
  {
    id: 'accepted',
    statuses: [
      QuoteStatusEnum.ACCEPTED, 
      QuoteStatusEnum.ACCEPTED_BY_HOST,
    ],
    label: 'Accepted',
  },
];

export const AllJobsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const {navigate} = navigation;
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [quotes, setQuotes] = useRecoilState(quotesListAtom);
  const [, setSelectedQuote] = useRecoilState(selectedQuoteAtom);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleTabChange = (id: string) => {
    const tab = tabs.find(item => item.id === id);
    if (tab) {
      setSelectedTab(tab);
    }
  };

  const renderPartyCard = (element: ListRenderItemInfo<QuoteModel>) => {
    return (
      <PartyCard
        party={element.item.party}
        price={element.item.price}
        onPress={() => {
          setSelectedQuote(element.item);
          navigate('EventScreen');
          if (element.item.status === QuoteStatusEnum.NEW) {
            const newQuotes = cloneDeep(quotes);
            const item = quotes.find(item => item.id === element.item.id);
            if (item) {
              item.status = QuoteStatusEnum.PENDING;
            }
            setQuotes([...newQuotes]);
          }
        }}
      />
    );
  };

  useEffect(() => {
    const getAllQuotes = async () => {
      const response = await apis.quote.getMy();
      if (response.success) {
        setQuotes(response.data);
      }
      setIsLoading(false);
    };
    getAllQuotes();
  }, [selectedTab]);

  const selectedData = useMemo(() => {
    return quotes
      .filter(item => selectedTab.statuses.includes(item.status))
      .filter(item => !!item.party);
  }, [quotes, selectedTab]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const responses = await Promise.all([apis.quote.getMy(), sleep()]);
    if (responses[0].success) {
      setQuotes(responses[0].data);
    }
    setIsRefreshing(false);
  };

  return (
    <View style={styles.screen}>
      <ImageBackground
        style={styles.bgIcon}
        resizeMode="cover"
        source={require('../../../assets/bg11.png')}
      />
      <View style={[styles.header, {marginTop: insets.top ? insets.top : 16}]}>
        <Text style={styles.titleText}>Your Jobs</Text>
      </View>
      <Tabs value={selectedTab.id} tabs={tabs} onChange={handleTabChange} />
      {isLoading ? (
        <ActivityIndicator
          size={16}
          color={Color.primaryPink}
          style={styles.activityIndicator}
        />
      ) : (
        <FlatList
          data={selectedData}
          renderItem={renderPartyCard}
          ListEmptyComponent={
            isLoading ? (
              <></>
            ) : (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>No results found</Text>
              </View>
            )
          }
          ListHeaderComponent={() => {
            return isRefreshing ? (
              <ActivityIndicator size={16} color={Color.primaryPink} />
            ) : null;
          }}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
      )}
    </View>
  );
};
