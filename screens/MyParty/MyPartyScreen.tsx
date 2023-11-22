import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { SearchInput } from "../../components/Input/SearchInput";
import { Text } from "native-base";
import useDebounce from "../../utils/useDebounce";
import { PartyModel } from "../../models";
import { useNavigation } from "@react-navigation/core";
import apis from "../../apis";
import { PartyCard } from "./PartyCard";
import dayjs from "dayjs";

export const MyPartyScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [partyList, setPartyList] = useState<PartyModel[]>([]);
  const debounceSearchText = useDebounce(searchText);

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    const fetchAllParties = async () => {
      try {
        setIsLoading(true);
        const res = await apis.party.getMyParties({
          search: debounceSearchText,
          minDate: new Date(),
        });
        console.log("res", res.data);
        setPartyList([res.data]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllParties();
  }, [debounceSearchText]);

  console.log("partyList", partyList);

  return (
    <View style={styles.screen}>
      <ImageBackground
        style={styles.bgIcon}
        resizeMode="cover"
        source={require("../../assets/bg8.png")}
      />
      <View style={styles.header}>
        <View style={styles.hiddenElem}></View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>My Parties</Text>
        </View>
        <View style={styles.hiddenElem}></View>
      </View>
      <View style={styles.content}>
        <SearchInput
          value={searchText}
          onChangeText={handleSearchTextChange}
          loading={isLoading}
        />
        <FlatList
          data={partyList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PartyDetailsScreen", {
                  party: item,
                });
              }}
            >
              <PartyCard party={item} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.flatList}
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
      </View>
    </View>
  );
};
