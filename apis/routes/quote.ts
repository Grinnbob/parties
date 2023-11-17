import * as API from "../base";
const Base = "vendor";

export const create = async (data: {
  assembling: string;
  shipment: string;
  services: number[];
  VendorId: number;
  PartyId: number;
  note: string;
}) => {
  const response = await API.postApi(`${Base}/`, data);
  return response;
};
