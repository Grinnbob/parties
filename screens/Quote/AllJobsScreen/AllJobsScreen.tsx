import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  ListRenderItemInfo,
  Text,
  View,
} from "react-native";
import { styles } from "./styles";
import { Tabs } from "../../../components/Atoms";
import apis from "../../../apis";
import { QuoteModel, QuoteStatusEnum } from "../../../models";
import { PartyCard } from "./PartyCard";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../../../GlobalStyles";
import { useRecoilState } from "recoil";
import { quotesListAtom, selectedQuoteAtom } from "../../../stateManagement";
import cloneDeep from "lodash/cloneDeep";

const tabs = [
  {
    id: "new",
    label: "New Requests",
    statuses: [QuoteStatusEnum.NEW],
  },
  {
    id: "pending",
    label: "Pending",
    statuses: [QuoteStatusEnum.ACCEPTED_BY_VENDOR, QuoteStatusEnum.PENDING],
  },
  {
    id: "accepted",
    statuses: [QuoteStatusEnum.ACCEPTED],
    label: "Accepted",
  },
];

export const AllJobsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { navigate } = navigation;
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [quotes, setQuotes] = useRecoilState(quotesListAtom);
  const [, setSelectedQuote] = useRecoilState(selectedQuoteAtom);
  const handleTabChange = (id: string) => {
    const tab = tabs.find((item) => item.id === id);
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
          navigate("EventScreen");
          if (element.item.status === QuoteStatusEnum.NEW) {
            const newQuotes = cloneDeep(quotes);
            const item = quotes.find((item) => item.id === element.item.id);
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
      console.log("response", response);
      setQuotes(response.data);
      setIsLoading(false);
    };
    getAllQuotes();
  }, []);

  const selectedData = useMemo(() => {
    return quotes
      .filter((item) => selectedTab.statuses.includes(item.status))
      .filter((item) => !!item.party);
  }, [quotes, selectedTab]);

  return (
    <View style={styles.screen}>
      <ImageBackground
        style={styles.bgIcon}
        resizeMode="cover"
        source={require("../../../assets/bg11.png")}
      />
      <View style={styles.header}>
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
        />
      )}
    </View>
  );
};
