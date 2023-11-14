import React from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { styles } from "./styles";

type GradientButtonProps = {
  text: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
};

export const GradientButton: React.FC<GradientButtonProps> = ({
  text,
  textStyle,
  onPress,
  style,
  disabled,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      {disabled ? (
        <View style={[styles.root, styles.disabledRoot, style]}>
          <Text
            style={[
              styles.text,
              textStyle,
              disabled ? styles.disabledText : undefined,
            ]}
          >
            {text}
          </Text>
        </View>
      ) : (
        <LinearGradient
          style={[styles.root, style]}
          locations={[0, 1]}
          colors={["#6c1b9e", "#ff077e"]}
          useAngle={true}
          angle={-90}
        >
          <Text style={[styles.text, textStyle]}>{text}</Text>
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};
