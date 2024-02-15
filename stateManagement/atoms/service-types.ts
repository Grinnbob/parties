import { atom } from "recoil";

export const serviceTypesAtom = atom<{
  isFetched: boolean;
  data: Array<{ id: number; title: string, image: string }>;
}>({
  key: "serviceTypesAtom",
  default: {
    isFetched: false,
    data: [],
  },
});
