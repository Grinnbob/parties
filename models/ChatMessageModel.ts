export type ChatMessageModel = {
  id: string;
  date: Date;
  text?: string;
  imageUrl?: string;
  name?: string;
  isLoading?: boolean;
  error?: "timeout" | "unknown";
};
