import { atom } from "recoil";
import { ServiceModel, VendorAlbumModel } from "../../models";

export const vendorProfileAtom = atom<any>({
  key: "vendorProfileAtom",
  default: {},
});

export const vendorProfileServiceAtom = atom<ServiceModel[]>({
  key: "vendorProfileServiceAtom",
  default: [],
});

export const vendorProfileAlbumAtom = atom<Array<VendorAlbumModel>>({
  key: "vendorProfileAlbumAtom",
  default: [],
});
