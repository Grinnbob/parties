import * as API from "../base";
const Base = "vendor";

interface VENDOR {
  id: Number;
  name?: String;
  description?: String;
  service?: String;
  userId?: Number;
}

interface AVATAR {
  id: number;
  uri: string;
}

export const create = async (data: VENDOR) => {
  const response = await API.postApi(`${Base}/`, data);
  return response;
};

export const update = async (data: VENDOR) => {
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
  console.log("------getAll", query);
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

export const getAllService = async (query: any = {}) => {
  let url = `${Base}/service`;
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

export const getAllSearch = async (search: string) => {
  let url = `${Base}/search?search=${search}`;

  const response = await API.getApi(url);
  return response;
};

export const getSearchResults = async (params: {
  search: string;
  serviceTypeId: number;
}) => {
  const urlSearchParams = new URLSearchParams();
  Object.keys(params).forEach((key: string) => {
    urlSearchParams.append(key, String(params[key as keyof typeof params]));
  });
  let url = `${Base}/results?${urlSearchParams.toString()}`;
  const response = await API.getApi(url);

  return response;
};

export const uploadAvatar = async (data: AVATAR) => {
  const { uri, id } = data;
  const uploadRes = await API.imageApi("avatar", id, uri);
  if (uploadRes.success) {
    const avatarBody = {
      avatar: uploadRes?.data?.key,
    };

    const response = await API.putApi(`${Base}/${id}`, avatarBody);
    return response;
  }
};

export const uploadProfileBackground = async (data: AVATAR) => {
  const { uri, id } = data;
  const uploadRes = await API.imageApi("background", id, uri);
  if (uploadRes.success) {
    const avatarBody = {
      background: uploadRes?.data?.key,
    };

    const response = await API.putApi(`${Base}/${id}`, avatarBody);
    return response;
  }
};

export const generateAiDescription = async ({
  id,
  keys,
}: {
  id: string;
  keys: string[];
}) => {
  let url = `${Base}/${id}/generateAiDescription`;
  const response = await API.postApi(url, { keys });
  return response;
};
