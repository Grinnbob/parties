import React from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { styles } from "./styles";

type ButtonProps = {
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  text,
  style,
  onPress,
  textStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.root, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};
