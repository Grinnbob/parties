import { useContext } from "react";
import { SocketContext } from "../SocketProvider";

export const useChat = () => {
  const {
    chatSocket,
    receivedMessage,
    startChatSocket,
    sendImage,
    sendMessage,
    chatSocketDisconnect,
  } = useContext(SocketContext);

  return {
    chatSocket,
    startChatSocket,
    sendImage,
    sendMessage,
    chatSocketDisconnect,
    receivedMessage,
  };
};
