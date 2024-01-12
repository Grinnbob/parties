import { atom } from "recoil";
import { KeyItemModel } from "../../models";

export const keyListAtom = atom<KeyItemModel[]>({
  key: "keyListAtom",
  default: [],
});
