import { atom, selector } from "recoil";
import { PartyModel } from "../../models";
import apis from "../../apis";

export const partySearchFilterAtom = atom<{ search: string }>({
  key: "partySearchFilter",
  default: {
    search: "",
  },
});

export const myPartiesQuery = selector<PartyModel[]>({
  key: "myPartiesQuery",
  get: async ({ get }) => {
    const filter = get(partySearchFilterAtom);
    console.log("filter", filter);
    const myPartiesResponse = await apis.party.getMyParties(filter);
    if (myPartiesResponse.success) {
      return myPartiesResponse.data;
    }
    return [];
  },
});
