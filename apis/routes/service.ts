import * as API from "../base";
const Base = "service";

interface SERVICE {
  id: Number;
  name?: String;
  type?: String;
  price?: String;
  rate?: String;
  description?: String;
  amount?: String;
}

export const create = async (data: SERVICE) => {
  const response = await API.postApi(`${Base}/`, data);
  return response;
};

export const update = async (data: SERVICE) => {
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

export const generateAiDescription = async (data: {
  id: string;
  keys: string[];
}) => {
  let url = `${Base}/generateAiDescription`;
  const response = await API.postApi(url, data);
  return response;
};

export const uploadServicePhoto = async (data: { uri: string; id: string }) => {
  const { uri, id } = data;
  const uploadRes = await API.imageApi("image", id, uri);
  if (uploadRes.success) {
    const avatarBody = {
      image: uploadRes?.data?.key,
    };

    const response = await API.putApi(`${Base}/${id}`, avatarBody);
    return response;
  }
};
