import { useContext } from "react";
import { SocketContext } from "../SocketProvider";

export const useChat = () => {
  const {
    receivedMessage,
    startChatSocket,
    sendImage,
    sendMessage,
    chatSocketDisconnect,
  } = useContext(SocketContext);

  return {
    startChatSocket,
    sendImage,
    sendMessage,
    chatSocketDisconnect,
    receivedMessage,
  };
};
