export type ChatMessageModel = {
  message: {
    _id: number | string;
    createdAt: string | Date;
    text?: string;
    image?: string;
    type: "text" | "image";
    user?: { _id: number | string; avatar: string; name: string };
  };
  success?: boolean;
  isLoading?: boolean;
  error?: "timeout" | "unknown";
};
