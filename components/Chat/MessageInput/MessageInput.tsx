import React, {MutableRefObject, useCallback} from 'react';
import {
  ScrollView,
  TextInput,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Alert,
  Linking,
} from 'react-native';
import {styles} from './styles';
import CameraImage from '../../../assets/camera.svg';
import {GradientButton} from '../../../components/Atoms';
import {Color} from '../../../GlobalStyles';
import {ImagePickerResponse} from 'react-native-image-picker';
import {useImageSelect} from '../../../hooks/useImageSelect';

type MessageInputProps = {
  value: string;
  onChangeText: (val: string) => void;
  onSubmit: (params: {message?: string; image?: ImagePickerResponse}) => void;
  scrollViewRef: MutableRefObject<ScrollView | null>;
  style?: StyleProp<ViewStyle>;
};

export const MessageInput = React.forwardRef<TextInput, MessageInputProps>(
  (props, ref) => {
    const {value, onChangeText, onSubmit, scrollViewRef, style} = props;

    const handleImageSubmit = useCallback(
      (image: ImagePickerResponse) => {
        onSubmit({image});
      },
      [onSubmit],
    );

    const {selectImage} = useImageSelect();

    const handleBlur = () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({animated: true});
      }
    };

    const handleSubmitEditing = () => {
      onSubmit({message: value});
    };

    const handleCameraPress = async () => {
      const image = await selectImage();
      if (image) {
        onSubmit({image});
      }
    };

    return (
      <View style={[styles.root, style]}>
        <TouchableOpacity onPress={selectImage}>
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
        <GradientButton
          text="Send"
          textStyle={styles.submitButtonText}
          onPress={handleSubmitEditing}
        />
      </View>
    );
  },
);
