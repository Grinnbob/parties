import { atom } from "recoil";
import { ServiceModel } from "../../models";

export const vendorProfileServiceAtom = atom<ServiceModel[]>({
  key: "vendorProfileServiceAtom",
  default: [],
});
