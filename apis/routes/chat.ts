import * as API from "../base";
const Base = "chat";
export const getAllMessages = async (conversationId: number) => {
  let url = `/message/?conversationId=${conversationId}`;
  const response = await API.getApi(url);
  return response;
};

export const uploadChatImage = async (data: {
  id: string | number;
  uri: string;
  conversationId: number;
  userId: number;
}) => {
  const { uri, id, conversationId, userId } = data;
  const uploadRes = await API.imageApi(
    `conversationId-${conversationId}-userId-${userId}`,
    id,
    uri
  );
  if (uploadRes.success) {
    return uploadRes;
  }
};
