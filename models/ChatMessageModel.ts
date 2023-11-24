import { PartyModel } from "./PartyModel";

export type ChatMessageModel = {
  id: number | string;
  message?: string | null;
  createdAt: string | Date;
  updatedAt?: string | Date;
  image?: string | null;
  messageImage?: string | null;
  user: {
    name: string;
    _id: number;
    avatar: string;
  };
  UserId: number;
  ConversationId: number;
  QuoteId?: number | null;
  party?: PartyModel | null;
  success?: boolean;
  isLoading?: boolean;
  type: "text" | "image";
  error?: "timeout" | "unknown";
};
