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
import { useActionSheet } from "@expo/react-native-action-sheet";
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from "react-native-image-picker";
import { CameraOptions } from "react-native-image-picker/src/types";

type MessageInputProps = {
  value: string;
  onChangeText: (val: string) => void;
  onSubmit: (params: { message?: string; image?: ImagePickerResponse }) => void;
  scrollViewRef: MutableRefObject<ScrollView | null>;
  style?: StyleProp<ViewStyle>;
};

export const MessageInput = React.forwardRef<TextInput, MessageInputProps>(
  (props, ref) => {
    const { value, onChangeText, onSubmit, scrollViewRef, style } = props;
    const { showActionSheetWithOptions } = useActionSheet();

    const handleBlur = () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    };

    const handleSubmitEditing = () => {
      onSubmit({ message: value });
    };

    const handleCameraPress = () => {
      const options = ["Camera", "Image Library", "Cancel"];
      const [cameraButtonIndex, imageLibraryButtonIndex, cancelButtonIndex] = [
        0, 1, 2,
      ];

      const photoOptions: CameraOptions = { mediaType: "photo" };
      const handleSelectImage = (image: ImagePickerResponse) => {
        console.log("image", image);
        onSubmit({ image });
      };

      showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (selectedIndex: number) => {
          switch (selectedIndex) {
            case cameraButtonIndex:
              launchCamera(photoOptions).then(handleSelectImage);
              return;
            case imageLibraryButtonIndex:
              launchImageLibrary(photoOptions).then(handleSelectImage);
              return;
          }
        }
      );
    };

    return (
      <View style={[styles.root, style]}>
        <TouchableOpacity onPress={handleCameraPress}>
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
        <GradientButton text="Send" onPress={handleSubmitEditing} />
      </View>
    );
  }
);
