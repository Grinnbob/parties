import * as API from "../base";
import * as assets from "./assets";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";

const Base = "document";
interface DOCUMENT {
  id?: string;
  name?: string;
  key?: string;
  link?: string;
  vendorId?: string;
  uri?: string;
  albumId?: number;
}

interface COMPRESSION {
  compress: number;
  format: SaveFormat;
}

interface DOCUMENT_UPLOAD {
  id?: number;
  vendorId?: number;
  uri: string;
  type: string;
  albumId?: number;
  compression?: COMPRESSION;
}

export const create = async (data: DOCUMENT_UPLOAD) => {
  const { uri, vendorId, type, albumId, compression } = data;
  console.log("DATA COMING IN CREATE DOC", data);
  const id = albumId ? albumId : vendorId;
  if (!id) return { success: false };
  const uploadRes = await API.imageApi(type, id, uri, compression);
  if (uploadRes.success) {
    const docBody = {
      key: uploadRes?.data?.key,
      vendorId: vendorId,
      name: uploadRes?.data?.key,
      albumId: albumId,
    };

    const response = await API.postApi(`${Base}/`, docBody);
    return response;
  }
};

export const update = async (data: DOCUMENT) => {
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
