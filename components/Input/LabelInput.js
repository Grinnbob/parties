import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { FormControl, Input, Text, View } from "native-base";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  Easing,
  Extrapolate,
} from "react-native-reanimated";
import useDebounce from "../../utils/useDebounce";
const AnimatedInput = Animated.createAnimatedComponent(Input);
const AnimatedText = Animated.createAnimatedComponent(Text);

const LabelInput = (props) => {
  const {
    label,
    value,
    shrink,
    errorText,
    mb,
    mt,
    errorProps,
    onDebounce = () => {},
    delay = 500,
    LeftComponent,
    placeholder = "",
    ...rest
  } = props;
  const [isFocused, setIsFocused] = useState(shrink || false);
  const inputRef = useRef(null);
  const focusAnim = useSharedValue(0);
  const debounceValue = useDebounce(value, delay);
  /*
   ** This effect will trigger the animation every
   ** time `isFocused` value changes.
   */
  useEffect(() => {
    onDebounce(debounceValue);
  }, [debounceValue]);
  useEffect(() => {
    focusAnim.value = withTiming(isFocused || !!value ? 1 : 0, {
      duration: 120,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
  }, [focusAnim, isFocused, value]);

  return (
    <FormControl mb={mb} isInvalid={errorText ? true : false}>
      <AnimatedInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        ref={inputRef}
        InputLeftElement={LeftComponent}
        placeholder={placeholder}
        placeholderTextColor="#8A8A8A"
        borderColor={"#8A8A8A"}
        style={[
          {
            ...styles.inputContainerStyle,
          },
        ]}
        _focus={{
          borderColor: "#8A8A8A",
          backgroundColor: "transparent",
          paddingTop: label && (isFocused || value) ? 10 : 0,
        }}
        value={value}
        {...rest}
      />
      {errorText ? (
        <FormControl.ErrorMessage {...errorProps}>
          {errorText}
        </FormControl.ErrorMessage>
      ) : null}
    </FormControl>
  );
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    minHeight: 48,
    paddingTop: 10,
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 30,
    color: "#FFFFFF",
  },
  label: {
    color: "#8A8A8A",
  },
});

export default LabelInput;
