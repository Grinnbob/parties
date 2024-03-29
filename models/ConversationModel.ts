import {VendorModel} from './VendorModel';

export type ConversationModel = {
  partyId: number;
  createdAt: string;
  id: number;
  latestMessage: null;
  updatedAt: string;
  vendor: VendorModel;
};
