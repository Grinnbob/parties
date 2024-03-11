import {CameraOptions} from 'react-native-image-picker/src/types';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {Alert, Linking} from 'react-native';
import {useActionSheet} from '@expo/react-native-action-sheet';

export const useImageSelect = () => {
  const {showActionSheetWithOptions} = useActionSheet();

  const selectImage = () => {
    return new Promise<ImagePickerResponse | null>(resolve => {
      const options = ['Camera', 'Image Library', 'Cancel'];
      const [cameraButtonIndex, imageLibraryButtonIndex, cancelButtonIndex] = [
        0, 1, 2,
      ];

      const photoOptions: CameraOptions = {mediaType: 'photo'};
      const handleSelect = async (image: ImagePickerResponse) => {
        if (image.didCancel) {
          resolve(null);
          return;
        }

        if (image.errorCode === 'camera_unavailable') {
          Alert.alert('Camera unavailable');
          resolve(null);
          return;
        }

        if (image.errorCode === 'permission') {
          Alert.alert('Please grant permission to camera');
          await Linking.openSettings();
          resolve(null);
          return;
        }

        if (image.errorCode === 'others') {
          Alert.alert('Oops!. Please try again later');
          resolve(null);
          return;
        }

        resolve(image);
      };

      showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (selectedIndex: number) => {
          switch (selectedIndex) {
            case cameraButtonIndex:
              launchCamera(photoOptions).then(handleSelect);
              return;
            case imageLibraryButtonIndex:
              launchImageLibrary(photoOptions).then(handleSelect);
              return;
          }
        },
      );
    });
  };

  return {
    selectImage,
  };
};
