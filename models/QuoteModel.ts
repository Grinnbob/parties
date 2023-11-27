import { PartyModel } from "./PartyModel";

export type QuoteModel = {
  PartyId: number;
  Party: PartyModel;
  UserId: number;
  VendorId: number;
  assembling: string;
  cancellationTerm: string;
  createdAt: string;
  downpayment: number;
  due: string;
  id: number;
  notes: string | null;
  paymentOption: string;
  shipment: string;
  status: "new" | "pending" | "accepted";
  updatedAt: string;
};
