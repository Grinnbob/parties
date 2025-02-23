import { PartyModel } from "./PartyModel";
import { QuoteModel, QuoteStatusEnum } from "./QuoteModel";

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
  userId: number;
  conversationId: number;
  quoteId?: number | null;
  quote?: QuoteModel;
  party?: PartyModel | null;
  success?: boolean;
  isLoading?: boolean;
  type: "text" | "image";
  error?: "timeout" | "unknown";
  meta?: {
    status?: QuoteStatusEnum;
  };
};
