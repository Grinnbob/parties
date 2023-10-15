import React, { MutableRefObject } from "react";
import {
  ScrollView,
  TextInput,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { styles } from "./styles";
import CameraImage from "../../../assets/camera.svg";
import { GradientButton } from "../../../components/Atoms";
import { Color } from "../../../GlobalStyles";

type MessageInputProps = {
  value: string;
  onChangeText: (val: string) => void;
  onSubmit: (params: { message?: string; imageUrl?: string }) => void;
  scrollViewRef: MutableRefObject<ScrollView | null>;
  style?: StyleProp<ViewStyle>;
};

export const MessageInput = React.forwardRef<TextInput, MessageInputProps>(
  (props, ref) => {
    const { value, onChangeText, onSubmit, scrollViewRef, style } = props;

    const handleBlur = () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    };

    const handleSubmitEditing = () => {
      onSubmit({ message: value });
    };

    return (
      <View style={[styles.root, style]}>
        <TouchableOpacity>
          <CameraImage />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={value}
          onSubmitEditing={handleSubmitEditing}
          placeholder="Say something here..."
          returnKeyType="send"
          ref={ref}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          placeholderTextColor={Color.textMainWhite}
        />
        <GradientButton text="Send" />
      </View>
    );
  }
);
