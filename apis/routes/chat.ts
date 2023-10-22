import * as API from "../base";
const Base = "chat";
export const getAllMessages = async (conversationId: string) => {
  let url = `${Base}/conversation/${conversationId}`;
  const response = await API.getApi(url);
  return response;
};

export const uploadChatImage = async (data: {
  id: number;
  uri: string;
  conversationId: string;
  userId: string;
}) => {
  const { uri, id, conversationId, userId } = data;
  const uploadRes = await API.imageApi(
    `chat-${conversationId}-${userId}`,
    id,
    uri
  );
  if (uploadRes.success) {
    const imageBody = {
      avatar: uploadRes?.data?.key,
    };

    const response = await API.putApi(`${Base}/${id}`, imageBody);
    return response;
  }
};
