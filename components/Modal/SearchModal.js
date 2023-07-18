import React, { useState, useRef } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Pressable,
  PanResponder,
} from "react-native";
import { FlatList, Input } from "native-base";
import { Divider } from "native-base";
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";
import types from "../../stateManagement/types";
import useGlobalState from "../../stateManagement/hook";
import apis from "../../apis";
import SearchBar from "../Input/SearchBar";

const SearchModal = ({ modalVisible, setModalVisible }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [debouceValue, setDebounceValue] = useState("");
  const [searchList, setSearchList] = useGlobalState(
    types.albumType.searchlist.key,
    types.albumType.searchlist.default
  );

  const onSwipeDown = () => {
    setModalVisible(false);
  };

  const onSwipeUp = () => {
    setModalVisible(true);
  };

  const setSearch = async (item) => {
    if (item.id) {
      setSearchList((searchList) => [...searchList, item]);
      setModalVisible(false);
      setSearchTerm("");
      return;
    }

    const res = await apis.key.create(item);

    setSearchList((searchList) => [...searchList, res.data]);
    setModalVisible(false);
    setSearchTerm("");
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

  // Create a ref to the modal view
  const modalRef = useRef(null);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only capture vertical swipes (up and down)
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderMove: (_, gestureState) => {
        // Nothing to do here; just needed to handle the responder move event
      },
      onPanResponderRelease: (_, gestureState) => {
        // Get the swipe direction and distance
        const swipeDirection = gestureState.dy > 0 ? "down" : "up";
        const swipeDistance = Math.abs(gestureState.dy);

        // Calculate the threshold for considering the swipe as a close action
        const closeThreshold = 80;

        if (swipeDirection === "down" && swipeDistance > closeThreshold) {
          // If swiped down more than the threshold, close the modal
          setModalVisible(false);
        }
      },
    })
  ).current;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.container} {...panResponder.panHandlers}>
        <View
          style={{
            height: "70%",
            marginTop: "auto",
            backgroundColor: "rgba(29, 26, 31, 1)",
            borderRadius: 20,
          }}
          ref={modalRef}
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
    </Modal>
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

export default SearchModal;
