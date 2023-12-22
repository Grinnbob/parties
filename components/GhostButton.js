import React from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";

export const GhostButton = ({ onPress, isLoading, style, children }) => {
  return (
    <TouchableOpacity activeOpacity={0.2} onPress={onPress} style={style}>
      <>
        {isLoading ? <ActivityIndicator size="small" color="#FFF" /> : children}
      </>
    </TouchableOpacity>
  );
};
