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

export type TextInputProps = {
  formControlProps?: IFormControlProps;
  inputProps?: IInputProps;
  error?: string;
};

export const TextInput: React.FC<TextInputProps> = ({
  formControlProps,
  inputProps,
  error,
}) => {
  const { style, ...rest } = inputProps || {};

  return (
    <FormControl {...formControlProps} isInvalid={!!error}>
      <AnimatedInput
        {...styles.root}
        placeholderTextColor={Color.gray300}
        _focus={{
          borderColor: Color.textMainWhite,
        }}
        {...rest}
      />
      {!!error && <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>}
    </FormControl>
  );
};
