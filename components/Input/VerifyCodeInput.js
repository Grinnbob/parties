import React, { useState, useRef } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { Text } from "native-base";

const VerifyCodeInput = ({
  label,
  errorText,
  value,
  style,
  onBlur,
  onFocus,
  codeLength,
  ...rest
}) => {
  const CODE_LENGTH = new Array(codeLength).fill(0);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const values = value.split("");
  const selectedIndex =
    values.length < CODE_LENGTH.length ? values.length : CODE_LENGTH.length - 1;

  return (
    <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
      <View style={styles.container}>
        <View style={styles.wrap}>
          {CODE_LENGTH.map((v, index) => {
            const selected = values.length === index;
            const filled =
              values.length === CODE_LENGTH.length &&
              index === CODE_LENGTH.length - 1;
            const removeBorder =
              index === CODE_LENGTH.length - 1 ? styles.noBorder : undefined;
            return (
              <InputBoxes
                key={index}
                removeBorder={removeBorder}
                selected={selected}
                filled={filled}
                isFocused={isFocused}
                index={index}
                values={values}
              />
            );
          })}
        </View>
        <View>
          <View>
            <TextInput
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              ref={inputRef}
              value={value}
              keyboardType={"number-pad"}
              style={[
                styles.input,
                {
                  left: selectedIndex * 32,
                },
              ]}
              {...rest}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const InputBoxes = ({
  removeBorder,
  selected,
  filled,
  isFocused,
  index,
  values,
}) => {
  return (
    <View style={[styles.display, removeBorder]} key={index}>
      <Text style={styles.text}>{values[index] || ""}</Text>
      {(selected || filled) && isFocused ? (
        <View
          style={[
            styles.shadows,
            {
              borderColor: "rgba(255, 255, 255, 0.4)",
              borderWidth: 2,
            },
          ]}
        ></View>
      ) : (
        <View
          style={[
            styles.shadows,
            { borderColor: "rgba(255, 255, 255, 0.4)", borderWidth: 1 },
          ]}
        >
          {index > values.length && (
            <Text style={{ fontSize: 30, color: "rgba(0, 0, 0, 0.2)" }}>•</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: "relative",
    flexDirection: "row",
  },
  display: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    borderRadius: 14,
    margin: 4,
  },
  text: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  noBorder: {
    borderRightWidth: 0,
  },
  input: {
    fontSize: 32,
    textAlign: "center",
    width: 32,
    opacity: 0,
  },
  shadows: {
    position: "absolute",
    borderRadius: 14,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default VerifyCodeInput;
