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
import { useNavigation } from "@react-navigation/core";
import { PartyCard } from "./PartyCard";
import { myPartiesQuery, partySearchFilterAtom } from "../../stateManagement";
import { useLoadable } from "../../hooks";
import { useRecoilState } from "recoil";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const MyPartyScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const debounceSearchText = useDebounce(searchText);
  const [, setMyPartiesFilter] = useRecoilState(partySearchFilterAtom);
  const [partyList, isPartyListLoading] = useLoadable(myPartiesQuery);

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    setMyPartiesFilter({
      search: debounceSearchText,
    });
  }, [debounceSearchText]);

  return (
    <View style={styles.screen}>
      <ImageBackground
        style={styles.bgIcon}
        resizeMode="cover"
        source={require("../../assets/bg8.png")}
      />
      <View
        style={[styles.header, { marginTop: insets.top ? insets.top : 16 }]}
      >
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
          loading={isPartyListLoading}
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
            isPartyListLoading ? (
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
