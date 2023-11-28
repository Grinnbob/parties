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
import { QuoteModel } from "../../../models";
import { PartyCard } from "./PartyCard";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../../../GlobalStyles";
import useGlobalState from "../../../stateManagement/hook";
import StateTypes from "../../../stateManagement/StateTypes";

const tabs = [
  {
    id: "new",
    label: "New Requests",
  },
  {
    id: "pending",
    label: "Pending",
  },
  {
    id: "accepted",
    label: "Accepted",
  },
];

export const AllJobsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { navigate } = navigation;
  const [selectedTab, setSelectedTab] = useState(tabs[0].id);
  const [isLoading, setIsLoading] = useState(true);
  const [quotes, setQuotes] = useState<QuoteModel[]>([]);
  const [user] = useGlobalState(StateTypes.user.key, StateTypes.user.default);
  const handleTabChange = (id: string) => {
    setSelectedTab(id);
  };

  const renderPartyCard = (element: ListRenderItemInfo<QuoteModel>) => {
    return (
      <PartyCard
        party={element.item.Party}
        onPress={() => {
          navigate("EventScreen", {
            quote: element.item,
          });
          if (element.item.status === "new") {
            const item = quotes.find((item) => item.id === element.item.id);
            if (item) {
              item.status = "pending";
            }
            setQuotes([...quotes]);
          }
        }}
      />
    );
  };

  useEffect(() => {
    const getAllQuotes = async () => {
      const response = await apis.quote.getAll({});
      setQuotes(response.data);
      setIsLoading(false);
    };
    getAllQuotes();
  }, []);

  console.log("quotes", quotes);

  const selectedData = useMemo(() => {
    return quotes
      .filter((item) => item.status === selectedTab)
      .filter((item) => !!item.Party);
  }, [quotes, selectedTab]);

  console.log("selectedData", selectedData);

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
      <Tabs value={selectedTab} tabs={tabs} onChange={handleTabChange} />
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
