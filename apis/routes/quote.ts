import * as API from "../base";
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
