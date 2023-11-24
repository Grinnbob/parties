import * as API from "../base";
import { PartyModel } from "../../models";
const Base = "party";

export const create = async (data: Omit<PartyModel, "id">) => {
  const response = await API.postApi(`${Base}/`, data);
  return response;
};

export const getMyParties = async (params: { minDate: string }) => {
  const urlSearchParams = new URLSearchParams();
  Object.keys(params).forEach((key: string) => {
    urlSearchParams.append(key, String(params[key as keyof typeof params]));
  });
  let url = `${Base}/my?${urlSearchParams.toString()}`;
  const response = await API.getApi(url);

  return response;
};
