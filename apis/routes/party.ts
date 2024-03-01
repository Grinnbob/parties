import * as API from '../base';
import {PartyModel} from '../../models';
const Base = 'party';

interface PartyImage {
  id: number;
  uri: string;
}

export const create = async (data: Omit<PartyModel, 'id'>) => {
  const response = await API.postApi(`${Base}/`, data);
  return response;
};

export const update = async (data: Partial<PartyModel>) => {
  const response = await API.putApi(`${Base}/`, data);
  return response;
};

export const getMyParties = async (params: {
  search?: string;
  minDate?: Date;
}) => {
  const urlSearchParams = new URLSearchParams();
  Object.keys(params).forEach((key: string) => {
    urlSearchParams.append(key, String(params[key as keyof typeof params]));
  });
  let url = `${Base}/my?${urlSearchParams.toString()}`;
  const response = await API.getApi(url);

  return response;
};

export const uploadPartyImage = async (data: PartyImage) => {
  const {uri, id} = data;
  const uploadRes = await API.imageApi('partyImage', id, uri);
  if (uploadRes.success) {
    const body = {
      image: uploadRes?.data?.key,
    };

    const response = await API.putApi(`${Base}/${id}`, body);
    return response;
  }
};
