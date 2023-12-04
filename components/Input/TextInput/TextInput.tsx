import React from "react";
import Animated, { AnimateProps } from "react-native-reanimated";
import {
  FormControl,
  IFormControlProps,
  Input,
  IInputProps,
} from "native-base";
const AnimatedInput = Animated.createAnimatedComponent(Input);
import { styles } from "./styles";
import { Color } from "../../../GlobalStyles";
import { Text } from "react-native";

export type TextInputProps = {
  formControlProps?: IFormControlProps;
  inputProps?: IInputProps;
  error?: string;
  label?: string;
};

export const TextInput: React.FC<TextInputProps> = ({
  formControlProps,
  inputProps,
  error,
  label,
}) => {
  const { style, ...rest } = inputProps || {};

  return (
    <FormControl {...formControlProps} isInvalid={!!error}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <AnimatedInput
        {...styles.root}
        borderColor="rgba(255, 255, 255, 0.2)"
        placeholderTextColor={Color.gray300}
        _focus={{
          borderColor: Color.textMainWhite,
        }}
        {...rest}
        style={[styles.root, style]}
      />
      {!!error && <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>}
    </FormControl>
  );
};
