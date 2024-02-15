import { atom } from "recoil";

export enum SelectedMediaEnum {
  VENDOR_PROFILE_BG = "vendorProfileBg",
  VENDOR_PROFILE_AVATAR = "vendorProfileAvatar",
  PHOTO_INPUT = "photoInput",
}

export const selectedMediaAtom = atom<
  Partial<
    Record<
      SelectedMediaEnum,
      Array<{
        node: {
          group_name: string;
          image: {
            extension: string;
            fileSize: number;
            filename: string;
            height: number;
            playableDuration: null;
            uri: string;
            width: number;
          };
          location: Array<{
            altitude: number;
            heading: number;
            latitude: number;
            longitude: number;
            speed: number;
          }>;
          modificationTimestamp: number;
          timestamp: number;
          type: string;
        };
      }>
    >
  >
>({
  key: "selectedMediaAtom",
  default: {},
});
