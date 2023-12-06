import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import { styles } from "./styles";

type IconBgProps = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

export const IconBg: React.FC<IconBgProps> = ({ style, children }) => {
  return <View style={[styles.root, style]}>{children}</View>;
};
