import * as API from '../base';
const Base = 'conversation';

export const getByPartyId = async (params: {partyId: number}) => {
  const urlSearchParams = new URLSearchParams();
  Object.keys(params).forEach((key: string) => {
    urlSearchParams.append(key, String(params[key as keyof typeof params]));
  });
  let url = `${Base}/?${urlSearchParams.toString()}`;
  const response = await API.getApi(url);

  return response;
};

export const getAll = async (partyId: number, quoteId?: number) => {
  let url = `${Base}/all/${partyId}${quoteId ? `/${quoteId}` : ''}`;
  const response = await API.getApi(url);

  return response;
};
