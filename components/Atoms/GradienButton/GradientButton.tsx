import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import LinearGradient, {
  LinearGradientProps,
} from "react-native-linear-gradient";
import { styles } from "./styles";
import { Color } from "../../../GlobalStyles";

type GradientButtonProps = {
  text: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean;
  colors?: LinearGradientProps["colors"];
};

export const GradientButton: React.FC<GradientButtonProps> = ({
  text,
  textStyle,
  onPress,
  style,
  disabled,
  loading,
  colors,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled || loading}>
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
          colors={colors ? colors : ["#6c1b9e", "#ff077e"]}
          useAngle={true}
          angle={-90}
        >
          {loading ? (
            <ActivityIndicator size={16} color={Color.textMainWhite} />
          ) : (
            <Text style={[styles.text, textStyle]}>{text}</Text>
          )}
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};
