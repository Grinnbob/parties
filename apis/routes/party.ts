import * as API from "../base";
import { PartyModel } from "../../models";
const Base = "party";

export const create = async (data: Omit<PartyModel, "id">) => {
  const response = await API.postApi(`${Base}/`, data);
  return response;
};
