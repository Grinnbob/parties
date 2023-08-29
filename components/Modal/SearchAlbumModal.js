import React, { useState, useRef } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FlatList, Input } from "native-base";
import types from "../../stateManagement/types";
import useGlobalState from "../../stateManagement/hook";
import apis from "../../apis";
import SearchBar from "../Input/SearchBar";

const SearchAlbumModal = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [debouceValue, setDebounceValue] = useState("");
  const [searchEditList, setSearchEditList] = useGlobalState(
    types.albumType.searchEditList.key,
    types.albumType.searchEditList.default
  );

  const setSearch = async (item) => {
    if (item.id) {
      setSearchEditList((searchEditList) => [...searchEditList, item]);
      setSearchTerm("");
      navigation.pop();
      return;
    }

    const res = await apis.key.create(item);

    setSearchEditList((searchEditList) => [...searchEditList, res.data]);
    setSearchTerm("");
    navigation.pop();
  };

  const handleCancel = () => {
    setSearchTerm("");
  };

  const onDebounce = async (txt) => {
    try {
      setIsLoading(true);

      const res = await apis.key.getAllSearch(txt);

      if (res.success) {
        setSearchResult(res.data);
      }
      setDebounceValue(txt);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: "100%",
          marginTop: "auto",
          backgroundColor: "rgba(29, 26, 31, 1)",
          borderRadius: 20,
        }}
      >
        <SearchBar
          placeholder="Search"
          placeholderTextColor={"#8A8A8A"}
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
          onDebounce={onDebounce}
          onCancel={handleCancel}
          cancelEnabled={searchTerm.length}
          delay={1000}
        />
        <FlatList
          data={searchResult}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.border}
              onPress={() => setSearch(item)}
            >
              <Text style={styles.search}>{item.name}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() =>
            debouceValue.length ? (
              <TouchableOpacity
                style={styles.border}
                onPress={() => setSearch({ name: debouceValue })}
              >
                <Text style={styles.search}>Add new tag</Text>
              </TouchableOpacity>
            ) : (
              <View />
            )
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    color: "#FFFFFF",
    marginBottom: 5,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 21,
  },
  border: {
    marginHorizontal: 70,
    marginVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "transparent", // Set this to "transparent" to make the entire screen swipeable
  },
});

export default SearchAlbumModal;
