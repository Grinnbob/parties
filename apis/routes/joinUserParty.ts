import * as API from "../base";
const Base = "joinUserParty";

interface JOIN_USER_PARTY {
  id?: string;
  priority?: number;
  userId?: string;
  partyId?: string;
}

export const create = async (data: JOIN_USER_PARTY) => {
  const response = await API.postApi(`${Base}/`, data);
  return response;
};

export const update = async (data: JOIN_USER_PARTY) => {
  const response = await API.putApi(`${Base}/${data.id}`, data);
  return response;
};

export const getById = async (id: string) => {
  const response = await API.getApi(`${Base}/${id}}`);
  return response;
};

export const deleteById = async (id: string) => {
  const response = await API.deleteApi(`${Base}/${id}`);
  return response;
};

export const getAll = async (query: any = {}) => {
  let url = `${Base}/`;
  let first = true;
  let queryArray = Object.keys(query);
  for (const el of queryArray) {
    if (first) {
      first = false;
      url += `?${el}=${query[el]}`;
    } else {
      url += `&${el}=${query[el]}`;
    }
  }
  const response = await API.getApi(url);
  return response;
};
