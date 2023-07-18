import * as API from '../base';
import DeviceInfo from 'react-native-device-info';
import {RSAKeychain} from 'react-native-rsa-native';
const Base = 'device';

interface DEVICE {
  id: string;
  public_key?: string;
  passCode?: string;
  devicePin?: string;
}
const generateKeyPair = async (keyTag: string) => {
  let keys = await RSAKeychain.generate(keyTag);
  return keys.public;
};
export const registerForRememberDevice = async () => {
  const id = await DeviceInfo.getUniqueId();
  const publicKey = await generateKeyPair(id);
  const response = await API.postApi(`${Base}/register/device`, {
    id,
    publicKey,
  });
  return response;
};
export const registerForBiometrics = async () => {
  const id = await DeviceInfo.getUniqueId();

  const publicKey = await generateKeyPair(id);
  const response = await API.postApi(`${Base}/register/biometrics`, {
    publicKey,
    id,
  });
  return response;
};
export const registerForPassCode = async (data: DEVICE) => {
  const id = await DeviceInfo.getUniqueId();

  const response = await API.postApi(`${Base}/register/passCode`, {
    ...data,
    id,
  });
  return response;
};
export const grabAuthToken = async () => {
  const id = await DeviceInfo.getUniqueId();
  const response = await API.getApi(`${Base}/authToken?id=${id}`);
  if (!response.encryptedAuth64) return response;
  const token = await decrypt(response.encryptedAuth64);
  API.setAUTH_TOKEN(token);
  return {success: token !== ''};
};
export const loginWithBiometrics = async () => {
  const id = await DeviceInfo.getUniqueId();
  const response = await API.getApi(`${Base}/login/biometrics?id=${id}`);
  if (!response.encryptedAuth64) return response;
  const token = await decrypt(response.encryptedAuth64);
  API.setAUTH_TOKEN(token);
  return {success: token !== ''};
};
const decrypt = async (message: string) => {
  try {
    const id = await DeviceInfo.getUniqueId();
    const info = await RSAKeychain.decrypt(message, id);
    return info;
  } catch (error) {
    return '';
  }
};
export const create = async (data: DEVICE) => {
  const id = await DeviceInfo.getUniqueId();
  const response = await API.postApi(`${Base}/`, {...data, id});
  return response;
};

export const update = async (data: DEVICE) => {
  const id = await DeviceInfo.getUniqueId();
  const response = await API.putApi(`${Base}/${data.id}`, {...data, id});
  return response;
};

export const getById = async () => {
  const id = await DeviceInfo.getUniqueId();
  const response = await API.getApi(`${Base}/${id}}`);
  return response;
};

export const deleteById = async (setToken) => {
  const id = await DeviceInfo.getUniqueId();
  const response = await API.deleteApi(`${Base}/${id}`);
  setToken("auth");
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
