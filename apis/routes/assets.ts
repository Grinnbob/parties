import * as API from '../base';
const Base = 'assets';
interface ASSETS {
  key?: string;
  contentType?: string;
}

export const createRequest = async (data: ASSETS) => {
  const response = await API.putApi(`${Base}/request`, data);
  return response;
};
