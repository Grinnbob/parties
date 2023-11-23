export type ChatMessageModel = {
  id: number | string;
  message?:
    | {
        _id: number | string;
        createdAt: string | Date;
        text?: string;
        messageImage?: string;
        type: "text" | "image";
        user?: { _id: number | string; avatar: string; name: string };
      }
    | string;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
    _id: number;
    avatar: string;
  };
  UserId: number;
  ConversationId: number;
  QuoteId?: number;
  party: any;
  success?: boolean;
  isLoading?: boolean;
  error?: "timeout" | "unknown";
};
