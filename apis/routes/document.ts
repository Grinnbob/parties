import * as API from '../base';
import * as assets from './assets';
import {manipulateAsync, FlipType, SaveFormat} from 'expo-image-manipulator';

const Base = 'document';
interface DOCUMENT {
  id?: string;
  name?: string;
  key?: string;
  link?: string;
  VendorId?: string;
  uri?: string;
  AlbumId?: number;
}

interface COMPRESSION {
    compress: number;
    format: SaveFormat;
}

interface SIZE {
  resize: { 
    height: number;
    width: number; 
  }
}
interface DOCUMENT_UPLOAD {
  VendorId?: number;
  uri: string;
  type: string;
  AlbumId?: number;
  compression?: COMPRESSION;
  size?: SIZE[];
}

export const create = async (data: DOCUMENT_UPLOAD) => {
  const {uri, VendorId, type, AlbumId, compression, size} = data;
  console.log("DATA COMING IN CREATE DOC", data)
  const id = AlbumId? AlbumId : VendorId;
  if(!id) return {success: false}
  const uploadRes = await API.imageApi(type, id, uri, size, compression);
  if (uploadRes.success) {
    const docBody = {
      key: uploadRes?.data?.key,
      VendorId: VendorId,
      name: uploadRes?.data?.key,
      AlbumId: AlbumId
    };

    const response = await API.postApi(`${Base}/`, docBody);
    return response;
  }
};

export const update = async (data: DOCUMENT) => {
  console.log("DATA DOC", data)
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
