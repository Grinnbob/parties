import { PartyModel } from "./PartyModel";

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
  status: "new" | "pending" | "accepted" | "denied";
  updatedAt: string;
  price: number;
};
