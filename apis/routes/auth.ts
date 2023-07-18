import * as API from '../base';
import {registerForRememberDevice} from './device';

const BASE = 'auth';
export const signup = async (data: object) => {
  const response = await API.postApi(`${BASE}/signup`, data);
  await registerForRememberDevice();

  return response;
};
export const checkEmail = async (email: string) => {
  const response = await API.getApi(`${BASE}/check?email=${email}`);

  return response;
};
export const signIn = async (data: object) => {
  const response = await API.postApi(`${BASE}/login`, data);
  await registerForRememberDevice();
  return response;
};

export const forgotPassword = async (data: object) => {
  const response = await API.postApi(`${BASE}/password/change`, data);
  return response;
};

export const forgotPasswordCodeRequest = async (data: object) => {
  const response = await API.postApi(`${BASE}/password/forgot/code`, data);
  return response;
};

export const forgotPasswordCodeVerify = async (data: object) => {
  const response = await API.postApi(`${BASE}/password/forgot/verify`, data);
  return response;
};

export const passcodeRequest = async (data: object) => {
  const response = await API.postApi(`${BASE}/request`, data);
  return response;
};

export const passcodeVerify = async (data: object) => {
  const response = await API.postApi(`${BASE}/verify`, data);
  return response;
};
export const resetPassword = async (password: string) => {
  const response = await API.postApi(`${BASE}/password/reset`, {password});
  return response;
};
