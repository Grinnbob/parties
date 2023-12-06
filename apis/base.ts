import axios from "axios";
import Config from "react-native-config";
import { RSAKeychain } from "react-native-rsa-native";
import DeviceInfo from "react-native-device-info";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import * as assets from "./routes/assets";
let AUTH_TOKEN = "Bearer false";
const LOGGING = false;

interface EncryptedReturn {
  success?: boolean;
  data: string;
}
export const getAUTH_TOKEN = () => AUTH_TOKEN;
export const setAUTH_TOKEN = async (key: string) => {
  try {
    if (key) {
      AUTH_TOKEN = "Bearer " + key;
    }
  } catch (error) {
    return errorHandling(error);
  }
};

export const deleteApi = async (path: string) => {
  try {
    log(path, "DELETE REQUEST", "none");
    const headers = { crossorigin: true, Authorization: AUTH_TOKEN };
    const res = await axios.delete(`${Config.API_URL_BASE}/${path}`, {
      headers,
    });
    log(path, "DELETE RES", res.data);
    setAUTH_TOKEN(res.headers.authorization);
    return res.data;
  } catch (error) {
    return errorHandling(error);
  }
};

export const getBlob = async (fileUri: string) => {
  const resp = await fetch(fileUri);
  const imageBody = await resp.blob();
  return imageBody;
};

export const getApi = async (path: string) => {
  try {
    log(path, "GET REQUEST", "none");
    const headers = { crossorigin: true, Authorization: AUTH_TOKEN };
    const res = await axios.get(`${Config.API_URL_BASE}/${path}`, {
      headers,
    });
    log(path, "GET RES", res.data);
    setAUTH_TOKEN(res.headers.authorization);
    return res.data;
  } catch (error) {
    return errorHandling(error);
  }
};

export const postApi = async (path: string, data: object, token?: string) => {
  try {
    log(path, "POST REQUEST", data);
    let headers = {
      crossorigin: true,
      Authorization: token ? token : AUTH_TOKEN,
    };
    let obj = data;

    const res = await axios.post(`${Config.API_URL_BASE}/${path}`, obj, {
      headers,
    });
    log(path, "POST RES", res.data);
    setAUTH_TOKEN(res.headers.authorization);

    return res.data;
  } catch (error) {
    return errorHandling(error);
  }
};
export const putApi = async (path: string, data: object) => {
  try {
    log(path, "PUT REQUEST", data);
    const headers = { crossorigin: true, Authorization: AUTH_TOKEN };
    const res = await axios.put(`${Config.API_URL_BASE}/${path}`, data, {
      headers,
    });
    setAUTH_TOKEN(res.headers.authorization);
    log(path, "PUT RES", res.data);
    return res.data;
  } catch (error) {
    return errorHandling(error);
  }
};

export const deleteApiEncrypted = async (path: string) => {
  try {
    const headers = { crossorigin: true, Authorization: AUTH_TOKEN };
    const res = await axios.delete(`${Config.API_URL_BASE}/${path}`, {
      headers,
    });
    setAUTH_TOKEN(res.headers.authorization);
    return decrypt(res.data);
  } catch (error) {
    return errorHandling(error);
  }
};

export const getApiEncrypted = async (path: string) => {
  try {
    const headers = { crossorigin: true, Authorization: AUTH_TOKEN };
    const res = await axios.get(`${Config.API_URL_BASE}/${path}`, {
      headers,
    });
    setAUTH_TOKEN(res.headers.authorization);
    return decrypt(res.data);
  } catch (error) {
    return errorHandling(error);
  }
};

export const postApiEncrypted = async (
  path: string,
  data: object,
  token?: string
) => {
  try {
    let headers = {
      crossorigin: true,
      Authorization: token ? token : AUTH_TOKEN,
    };
    let obj = data;
    const res = await axios.post(`${Config.API_URL_BASE}/${path}`, obj, {
      headers,
    });
    setAUTH_TOKEN(res.headers.authorization);

    return decrypt(res.data);
  } catch (error) {
    return errorHandling(error);
  }
};
export const putApiEncrypted = async (path: string, data: object) => {
  try {
    const headers = { crossorigin: true, Authorization: AUTH_TOKEN };
    const res = await axios.put(`${Config.API_URL_BASE}/${path}`, data, {
      headers,
    });
    setAUTH_TOKEN(res.headers.authorization);

    return decrypt(res.data);
  } catch (error) {
    return errorHandling(error);
  }
};

export const imageApi = async (
  type: string,
  id: number | string,
  uri: string,
  compression = {
    compress: 0.5,
    format: SaveFormat.JPEG,
  }
) => {
  try {
    const manipResult = await manipulateAsync(uri, [], compression);
    const linkRes = await assets.createRequest({
      key: `${type}/${id}`,
      contentType: "image/png",
    });
    const uploadLink = linkRes.data.uploadLink;
    const resp = await fetch(manipResult.uri);
    const blob = await resp.blob();
    console.log("jsonRes", uploadLink);

    const res = await fetch(uploadLink, {
      method: "PUT",
      body: blob,
    });
    console.log("jsonRes", res.status);
    return { success: true, data: { key: linkRes.data.key } };
  } catch (error) {
    return errorHandling(error);
  }
};
const decrypt = async (data: EncryptedReturn) => {
  const id = await DeviceInfo.getUniqueId();
  if (!data.data) return { success: data.success };
  const info = await RSAKeychain.decrypt(data.data, id);
  return { success: data.success, data: JSON.parse(info) };
};
export const queryBuilder = (Base, query) => {
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
  return url;
};

const errorHandling = (error: any) => {
  if (error.response) {
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    console.log("ERROR RESPONSE", error.response);
    return {
      success: false,
      message: error?.response?.data?.message || "invalid request try again",
      status: error.response.status,
    };
  } else if (error.request) {
    console.log("ERROR REQUEST", error.request);
    /*
     * request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
    return {
      success: false,
      request:
        error.request || "The request was made but no response was received",
      message: "The request was made but no response was received",
    };
  } else {
    console.log("ERROR MESSAGE", error);
    // Something happened in setting up the request and triggered an Error
    return {
      success: false,
      message:
        error.message ||
        "Something happened in setting up the request and triggered an Error",
    };
  }
};

const log = (path = "", type = "", body: any, shouldLog = false) => {
  if (LOGGING || shouldLog) {
    console.log(`${Config.API_URL_BASE}/${path}`, type, body);
  }
};
