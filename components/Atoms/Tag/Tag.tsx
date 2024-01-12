import React from "react";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
import { styles } from "./styles";

type TagProps = {
  text: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
};

export const Tag: React.FC<TagProps> = ({
  text,
  style,
  textStyle,
  children,
}) => {
  return (
    <View style={[styles.root, style]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
      {children}
    </View>
  );
};
