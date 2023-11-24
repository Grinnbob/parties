import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { styles } from "./styles";
import LinearGradient from "react-native-linear-gradient";

type ProgressBarProps = {
  value: number;
  style?: StyleProp<ViewStyle>;
};
export const ProgressBar: React.FC<ProgressBarProps> = ({ value, style }) => {
  return (
    <View style={[styles.root, style]}>
      <LinearGradient
        style={[styles.progress, { width: `${value}%` }]}
        locations={[0, 1]}
        colors={["#6c1b9e", "#ff077e"]}
        useAngle={true}
        angle={-90}
      />
    </View>
  );
};
