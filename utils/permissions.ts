import { requestMultiple, PERMISSIONS } from "react-native-permissions";
import { Platform } from "react-native";

export const checkPermissions = () => {
  return Platform.OS === "ios"
    ? requestMultiple([
        PERMISSIONS.IOS.CAMERA,
        PERMISSIONS.IOS.PHOTO_LIBRARY,
      ]).then((statuses) => {
        console.log("Camera", statuses[PERMISSIONS.IOS.CAMERA]);
        console.log("Photo library", statuses[PERMISSIONS.IOS.PHOTO_LIBRARY]);
      })
    : requestMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      ]).then((statuses) => {
        console.log("Camera", statuses[PERMISSIONS.ANDROID.CAMERA]);
        console.log(
          "Photo library",
          statuses[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]
        );
      });
};
