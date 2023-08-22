import * as API from '../base';
const Base = 'recentSearch';

interface RECENTSEARCH {
  id: Number;
  name?: String;
}

export const create = async (data: RECENTSEARCH) => {
  const response = await API.postApi(`${Base}/`, data);
  return response;
};

export const update = async (data: RECENTSEARCH) => {
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

export const deleteByUserId = async (id: string) => {
  const response = await API.deleteApi(`${Base}/deleteByUserId/${id}`);
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


