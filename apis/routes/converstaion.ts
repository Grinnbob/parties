import * as API from "../base";
const Base = "conversation";

export const getByPartyId = async (params: { PartyId: number }) => {
  const urlSearchParams = new URLSearchParams();
  Object.keys(params).forEach((key: string) => {
    urlSearchParams.append(key, String(params[key as keyof typeof params]));
  });
  let url = `${Base}/?${urlSearchParams.toString()}`;
  const response = await API.getApi(url);

  return response;
};
