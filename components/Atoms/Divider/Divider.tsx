import React from "react";
import { styles } from "./styles";
import { StyleProp, View, ViewStyle } from "react-native";

type DividerProps = {
  style?: StyleProp<ViewStyle>;
};

export const Divider: React.FC<DividerProps> = (props) => {
  return <View style={[styles.divider, props.style]} />;
};
