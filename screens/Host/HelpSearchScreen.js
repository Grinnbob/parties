import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  Pressable,
  Linking,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { HStack, Text, VStack } from "native-base";
import { Color } from "../../GlobalStyles";
import { useNavigation } from "@react-navigation/core";
import SearchBar from "../../components/Input/SearchBar";
import apis from "../../apis";
import useGlobalState from "../../stateManagement/hook";
import StateTypes from "../../stateManagement/StateTypes";
import types from "../../stateManagement/types";
import Close from "../../assets/closeSearch.svg";

const HelpSearchScreen = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [recentResult, setRecentResult] = useState([]);
  const [debouceValue, setDebounceValue] = useState("");
  const [searchList, setSearchList] = useGlobalState(
    types.albumType.searchList.key,
    types.albumType.searchList.default
  );
  const [user, setUser] = useGlobalState(
    StateTypes.user.key,
    StateTypes.user.default
  );

  const setSearch = async (item) => {
    try {
      const res = await apis.recentSearch.create({
        name: item,
        UserId: user.id,
      });

      navigation.navigate("ServiceDetails", { search: item });

      setSearchList((searchList) => [...searchList, res.data]);
      setSearchTerm("");
    } catch (error) {
      console.log(error);
    }
  };

  const viewRecentSearch = (recent) => {
    navigation.navigate("ServiceDetails", { search: recent.name });
  };

  const grabRecentSearch = async () => {
    try {
      const res = await apis.recentSearch.getAll({ UserId: user.id });

      if (res && res.success) {
        setRecentResult(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeRecentSearch = async () => {
    try {
      const res = await apis.recentSearch.deleteByUserId(user.id);
      setRecentResult([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setSearchTerm("");
  };

  const onDebounce = async (txt) => {
    try {
      setIsLoading(true);

      const res = await apis.vendor.getAllSearch(txt);

      if (res.success) {
        setSearchResult(res.data);
      }
      setDebounceValue(txt);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    grabRecentSearch();
  }, [searchTerm]);

  return (
    <View style={styles.helpsearchscreen}>
      <Image
        style={styles.bgIcon}
        resizeMode="cover"
        source={require("../../assets/bg21.png")}
      />
      <View style={[styles.alertmodalbg, styles.alertmodalbgLayout]} />
      <View style={styles.topnavigationContent}>
        <Pressable style={styles.backLayout} onPress={() => navigation.pop()}>
          <Image
            style={styles.vectorIcon}
            resizeMode="cover"
            source={require("../../assets/vector14.png")}
          />
        </Pressable>
        <View style={styles.title2}>
          <Text style={styles.title3}>What Can We Help You With</Text>
        </View>
        <View style={{ width: 40, height: 40 }}></View>
      </View>
      <View
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderRadius: 100,
          marginHorizontal: 10,
          marginTop: 10,
          marginBottom: 10,
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
          mt={0}
        />
      </View>

      <FlatList
        data={searchResult}
        ListHeaderComponent={
          debouceValue.length >= 1 ? (
            <View />
          ) : (
            <VStack>
              <VStack
                flexDirection="row"
                justifyContent="space-between"
                paddingHorizontal={13}
                marginTop={5}
              >
                <Text color={"#FFF"} fontSize={16}>
                  Recent search
                </Text>
                <Pressable
                  style={{
                    backgroundColor: "rgba(255, 7, 126, 0.30)",
                    borderRadius: 100,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={removeRecentSearch}
                >
                  <Text
                    color={"#FFF"}
                    fontWeight={"300"}
                    fontSize={12}
                    marginRight={2}
                  >
                    Clear
                  </Text>
                  <Close />
                </Pressable>
              </VStack>
              <VStack mt={5} ml={2}>
                {recentResult.map((recent, i) => {
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
        renderItem={({ item }) =>
          debouceValue.length >= 1 ? (
            <TouchableOpacity
              key={item.id}
              style={styles.border}
              onPress={() => setSearch(item)}
            >
              <Text style={styles.searchTerm}>{item}</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )
        }
        ListEmptyComponent={() =>
          debouceValue.length ? (
            <Text style={styles.searchTerm}>No result found</Text>
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
    position: "absolute",
  },
  left: {
    alignItems: "center",
    flexDirection: "row",
  },
  searchTerm: {
    color: "#8A8A8A",
    marginBottom: 5,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 21,
    marginLeft: 5,
  },
  vectorIcon: {
    overflow: "hidden",
  },
  title3: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "700",
    textAlign: "center",
    color: Color.labelColorDarkPrimary,
  },
  title2: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  topnavigationContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  helpsearchscreen: {
    backgroundColor: Color.labelColorLightPrimary,
    width: "100%",
    height: 812,
    overflow: "hidden",
    flex: 1,
  },
  alertmodalbg: {
    backgroundColor: Color.primarySoBlack,
    left: 0,
    top: 0,
    height: "100%",
    overflow: "hidden",
  },
  alertmodalbgLayout: {
    width: "100%",
    position: "absolute",
  },
});

export default HelpSearchScreen;
