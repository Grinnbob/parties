import { atom } from "recoil";

export const serviceTypesAtom = atom<Array<{ id: number; title: string }>>({
  key: "serviceTypesAtom",
  default: [],
});
