import { atom } from "recoil";
import { QuoteModel } from "../../models";

export const quotesListAtom = atom<QuoteModel[]>({
  key: "quotesAtom",
  default: [],
});

export const selectedQuoteAtom = atom<QuoteModel | undefined>({
  key: "selectedQuoteAtom",
  default: undefined,
});
