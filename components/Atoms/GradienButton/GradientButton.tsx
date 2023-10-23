import React from "react";
import { StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { styles } from "./styles";

type GradientButtonProps = {
  text: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const GradientButton: React.FC<GradientButtonProps> = ({
  text,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        style={[styles.root, style]}
        locations={[0, 1]}
        colors={["#6c1b9e", "#ff077e"]}
        useAngle={true}
        angle={-90}
      >
        <Text style={styles.text}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
