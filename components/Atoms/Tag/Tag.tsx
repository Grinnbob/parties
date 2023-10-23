import React from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { styles } from "./styles";

type TagProps = {
  text: string;
  style?: StyleProp<ViewStyle>;
};

export const Tag: React.FC<TagProps> = ({ text, style }) => {
  return (
    <View style={[styles.root, style]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
