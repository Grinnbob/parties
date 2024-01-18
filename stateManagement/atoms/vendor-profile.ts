import { atom } from "recoil";
import { ServiceModel } from "../../models";

export const vendorProfileServiceAtom = atom<ServiceModel[]>({
  key: "vendorProfileServiceAtom",
  default: [],
});

export enum VendorSelectedMediaEnum {
  PROFILE_BG = "profileBg",
  PROFILE_AVATAR = "profileAvatar",
}

export const vendorSelectedMediaAtom = atom<
  Partial<
    Record<
      VendorSelectedMediaEnum,
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
  key: "vendorSelectedMediaAtom",
  default: {},
});
