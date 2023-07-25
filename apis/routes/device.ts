import Config from "react-native-config";
import * as API from "../base";
import DeviceInfo from "react-native-device-info";
import { RSAKeychain } from "react-native-rsa-native";
const Base = "device";

interface DEVICE {
  id: string;
  public_key?: string;
  passCode?: string;
  devicePin?: string;
}
const generateKeyPair = async (keyTag: string) => {
  let keys = await RSAKeychain.generate(Config.APP_BUNDLE_ID + keyTag);
  return keys.public;
};
export const registerForRememberDevice = async () => {
  const id = await DeviceInfo.getUniqueId();
  const publicKey = await generateKeyPair(id);
  const response = await API.postApi(`${Base}/register/device`, {
    id: `${Config.APP_BUNDLE_ID}${id}`,
    publicKey,
  });
  return response;
};
export const registerForBiometrics = async () => {
  const id = await DeviceInfo.getUniqueId();

  const publicKey = await generateKeyPair(id);
  const response = await API.postApi(`${Base}/register/biometrics`, {
    publicKey,
    id: `${Config.APP_BUNDLE_ID}${id}`,

  });
  return response;
};
export const registerForPassCode = async (data: DEVICE) => {
  const id = await DeviceInfo.getUniqueId();

  const response = await API.postApi(`${Base}/register/passCode`, {
    ...data,
    id: `${Config.APP_BUNDLE_ID}${id}`,
  });
  return response;
};
export const grabAuthToken = async () => {
  const id = await DeviceInfo.getUniqueId();
  const response = await API.getApi(`${Base}/authToken?id=${Config.APP_BUNDLE_ID}${id}`);
  if (!response.encryptedAuth64) return response;
  const token = await decrypt(response.encryptedAuth64);
  API.setAUTH_TOKEN(token);
  return { success: token !== "" };
};
export const loginWithBiometrics = async () => {
  const id = await DeviceInfo.getUniqueId();
  const response = await API.getApi(`${Base}/login/biometrics?id=${Config.APP_BUNDLE_ID}${id}`);
  if (!response.encryptedAuth64) return response;
  const token = await decrypt(response.encryptedAuth64);
  API.setAUTH_TOKEN(token);
  return { success: token !== "" };
};
const decrypt = async (message: string) => {
  try {
    const id = await DeviceInfo.getUniqueId();
    const info = await RSAKeychain.decrypt(message, Config.APP_BUNDLE_ID + id);
    return info;
  } catch (error) {
    return "";
  }
};
export const create = async (data: DEVICE) => {
  const id = await DeviceInfo.getUniqueId();
  const response = await API.postApi(`${Base}/`, { ...data, id });
  return response;
};

export const update = async (data: DEVICE) => {
  const id = await DeviceInfo.getUniqueId();
  const response = await API.putApi(`${Base}/${data.id}`, { ...data, id });
  return response;
};

export const getById = async () => {
  const id = await DeviceInfo.getUniqueId();
  const response = await API.getApi(`${Base}/$${Config.APP_BUNDLE_ID}${id}}`);
  return response;
};

export const deleteById = async (setToken: any) => {
  const id = await DeviceInfo.getUniqueId();
  const response = await API.deleteApi(`${Base}/${Config.APP_BUNDLE_ID}${id}`);
  setToken("auth");
  return response;
};

export const getAll = async (query: any = {}) => {
  let url = API.queryBuilder(Base, query);

  const response = await API.getApi(url);
  return response;
};