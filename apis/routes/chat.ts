import * as API from "../base";
const Base = "chat";
export const getAllMessages = async (conversationId: string) => {
  let url = `/message/?ConversationId=${conversationId}`;
  const response = await API.getApi(url);
  return response;
};

export const uploadChatImage = async (data: {
  id: string | number;
  uri: string;
  conversationId: string;
  userId: string;
}) => {
  const { uri, id, conversationId, userId } = data;
  const uploadRes = await API.imageApi(
    `conversationId-${conversationId}-userId-${userId}`,
    id,
    uri
  );
  if (uploadRes.success) {
    console.log("uploadRes", uploadRes);
    return uploadRes;
  }
};
