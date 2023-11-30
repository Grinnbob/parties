import * as API from "../base";
import { QuoteModel } from "../../models";
const Base = "quote";

export const create = async (data: {
  assembling: string;
  shipment: string;
  services: number[];
  VendorId: number;
  PartyId: number;
  notes: string;
}) => {
  const response = await API.postApi(`${Base}/`, data);
  return response;
};

export const getAll = async (params: { UserId?: number }) => {
  const urlSearchParams = new URLSearchParams();
  Object.keys(params).forEach((key: string) => {
    urlSearchParams.append(key, String(params[key as keyof typeof params]));
  });
  const response = await API.getApi(`${Base}/?${urlSearchParams.toString()}`);
  return response;
};

export const getMy = async () => {
  const response = await API.getApi(`${Base}/my`);
  return response;
};

export const changeStatus = async (
  id: number,
  status: QuoteModel["status"]
) => {
  const response = await API.putApi(`${Base}/${id}`, {
    status,
  });
  return response;
};

export const approveQuote = async (
  id: number,
  data: Pick<
    QuoteModel,
    | "due"
    | "downpayment"
    | "paymentOption"
    | "price"
    | "status"
    | "cancellationTerm"
  >
) => {
  const response = await API.putApi(`${Base}/${id}`, data);
  return response;
};
