import { PartyModel } from "./PartyModel";

export enum QuoteStatusEnum {
  NEW = "new",
  PENDING = "pending",
  ACCEPTED = "accepted",
  DENIED_BY_HOST = "deniedByHost",
  ACCEPTED_BY_VENDOR = "acceptedByVendor",
  DENIED_BY_VENDOR = "deniedByVendor",
}

export type QuoteModel = {
  partyId: number;
  party: PartyModel;
  userId: number;
  vendorId: number;
  assembling: string;
  cancellationTerm: string;
  createdAt: string;
  downpayment: number;
  due: string;
  id: number;
  notes: string | null;
  paymentOption: string;
  shipment: string;
  status: QuoteStatusEnum;
  updatedAt: string;
  price: number;
};
