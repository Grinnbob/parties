import { useContext } from "react";
import { SocketContext } from "../SocketProvider";

export const useChat = () => {
  const { startChatSocket, sendImage, sendMessage, chatSocketDisconnect } =
    useContext(SocketContext);

  return { startChatSocket, sendImage, sendMessage, chatSocketDisconnect };
};
