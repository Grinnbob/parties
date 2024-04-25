import * as API from '../base';
const Base = 'user';
interface USER {
  id: string;
}

interface AVATAR {
  id: number;
  uri: string;
}

interface ResponseType<T> {
  success: boolean;
  data: T
}

type ResponseOnboardingStart = {
    object: string;
    created: number;
    expires_at: number;
    url: string;
}

export const create = async (data: USER) => {
  const response = await API.postApi(`${Base}/`, data);
  return response;
};

export const update = async (data: USER) => {
  const response = await API.putApi(`${Base}/${data.id}`, data);
  return response;
};

export const getById = async (id: string) => {
  const response = await API.getApi(`${Base}/${id}`);
  return response;
};
export const getSelf = async () => {
  const response = await API.getApi(`${Base}/self`);
  return response;
};

export const deleteById = async (id: string) => {
  console.log('deleteById', deleteById);
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

export const UploadAvatar = async (data: AVATAR) => {
  const {uri, id} = data;
  const uploadRes = await API.imageApi('avatar', id, uri);
  if (uploadRes.success) {
    const avatarBody = {
      avatar: uploadRes?.data?.key,
    };

    const response = await API.putApi(`${Base}/${id}`, avatarBody);
    return response;
  }
};

export const onboardStart = async (): Promise<ResponseType<ResponseOnboardingStart>> => {
  const response = await API.getApi(`${Base}/onboardStart`);
  return response;
};

export const onboardFinish = async () => {
  const response = await API.getApi(`${Base}/onboardFinish`);
  return response;
};

export const payToVendor = async (params: {
  amount: number;
  vendorId: number;
}) => {
  const response = await API.postApi(`${Base}/paymentIntent`, params);
  return response;
};

export const getVendorStripeStatus = async (): Promise<ResponseType<{
        configured: boolean
    }>> => 
{
    const response = await API.getApi(`${Base}/vendor/status`)
    return response
}
