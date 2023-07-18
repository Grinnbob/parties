import React from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const DismissKeyboard = ({ children, ...props }) => (
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} {...props}>
      {children}
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

export default DismissKeyboard;
