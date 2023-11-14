import React from "react";
import { StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";
import { styles } from "./styles";

type ButtonProps = {
  text?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const Button: React.FC<ButtonProps> = ({ text, style, onPress }) => {
  return (
    <TouchableOpacity style={[styles.root, style]} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
