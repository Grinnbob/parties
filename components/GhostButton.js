import React from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";

export const GhostButton = ({ onPress, isLoading, children }) => {
  return (
    <TouchableOpacity activeOpacity={0.2} onPress={onPress}>
      <>
        {isLoading ? <ActivityIndicator size="small" color="#FFF" /> : children}
      </>
    </TouchableOpacity>
  );
};
