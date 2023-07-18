import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import PartyCard from "../PartyCard";
import useGlobalState from "../../stateManagement/hook";
import StateTypes from "../../stateManagement/StateTypes";
import Cinema from "../../assets/onboard/cinema.svg";

export default ({ data = [] }) => {
  const [selectedTiles, setSelectedTiles] = useGlobalState(
    StateTypes.selectedTiles.key,
    StateTypes.selectedTiles.default
  );

  const handlePress = (id) => {
    const select = selectedTiles.find((item, i) => item.id === id);
    if (select) {
      const answers = selectedTiles.filter((item, i) => item.id !== id);
      setSelectedTiles(answers);
    } else {
      const selections = data.find((item, i) => item.id === id);
      setSelectedTiles((prev) => [...prev, selections]);
    }
  };

  const renderItem = ({ item }) => {
    let enable = selectedTiles.find((spec) => spec.id === item.id);
    return (
      <View
        style={{
          marginHorizontal: 8,
          marginVertical: 10,
        }}
      >
        <PartyCard
          key={item.id}
          title={item.title}
          asset={item.asset}
          enable={enable}
          onPress={() => handlePress(item.id)}
        />
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      numColumns={3}
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      // style={{minHeight: '100%'}}
      renderItem={renderItem}
    />
  );
};
