import { atom } from "recoil";
import { ServiceModel, VendorAlbumModel } from "../../models";

export const vendorProfileAtom = atom<any>({
  key: "vendorProfileAtom",
  default: {},
});

export const vendorProfileServiceAtom = atom<{
  isFetched: boolean;
  data: ServiceModel[];
}>({
  key: "vendorProfileServiceAtom",
  default: {
    isFetched: false,
    data: [],
  },
});

export const vendorProfileAlbumAtom = atom<{
  isFetched: boolean;
  data: Array<VendorAlbumModel>;
}>({
  key: "vendorProfileAlbumAtom",
  default: {
    isFetched: false,
    data: [],
  },
});
