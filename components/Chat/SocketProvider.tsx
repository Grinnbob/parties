import React, { useState, createContext, useRef, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import Config from "react-native-config";
import { getAUTH_TOKEN } from "../../apis/base";
import { ChatMessageModel } from "../../models/ChatMessageModel";
type SocketResponse = {
  success: boolean;
  message: string;
  muted: boolean;
};

export type SocketContextProps = {
  receivedMessage: ChatMessageModel | null;
  isTyping: boolean;
  isMuted: boolean;
  startChatSocket: (data?: Record<string, unknown>) => Promise<void>;
  chatSocketDisconnect: () => void;
  socketDisconnect: () => void;
  sendMessage: (data: {
    conversationId: number;
    userId: number;
    message: string;
  }) => Promise<ChatMessageModel>;
  sendImage: (data: {
    conversationId: number;
    userId: number;
    image: string;
  }) => Promise<ChatMessageModel>;
  findMuted: (data: unknown) => Promise<void>;
};

export const SocketContext = createContext<SocketContextProps>({
  receivedMessage: null,
  isTyping: false,
  isMuted: false,
  startChatSocket: async (data?: Record<string, unknown>) => {},
  chatSocketDisconnect: () => {},
  socketDisconnect: () => {},
  sendMessage: async () => {},
  sendImage: async (data: unknown) => {},
  findMuted: async (data: unknown) => {},
} as unknown as SocketContextProps);

type SocketProviderProps = {
  children?: React.ReactNode;
};

const withTimeout = (
  onSuccess: (...params: any[]) => void,
  onTimeout: (...params: any[]) => void,
  timeout: number
) => {
  let called = false;

  const timer = setTimeout(() => {
    if (called) return;
    called = true;
    onTimeout();
  }, timeout);

  return (...args: any[]) => {
    if (called) return;
    called = true;
    clearTimeout(timer);
    onSuccess.apply(this, args);
  };
};

const MESSAGE_TIMEOUT = 15000;

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket = useRef<Socket | null>(null);
  const chatSocket = useRef<Socket | null>(null);
  const [receivedMessage, setReceivedMessage] =
    useState<ChatMessageModel | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (chatSocket.current) {
      // Destroys the socket reference
      // when the connection is closed
      return () => {
        chatSocketDisconnect();
      };
    }
  }, [chatSocket.current]);

  const startChatSocket = async (data: Record<string, unknown> = {}) => {
    chatSocket.current = io(`${Config.BE_URL_BASE}/chat`, {
      autoConnect: false,

      auth: { token: getAUTH_TOKEN() },
    });

    addChatSocketListeners();
    chatSocket.current.connect();
    chatSocket.current.emit("create", data);
    chatSocket.current.emit("read", data);
    chatSocket.current.emit("connection", data);
  };

  const addChatSocketListeners = () => {
    if (!chatSocket.current) {
      return;
    }
    chatSocket.current.on("receive_text", (message: ChatMessageModel) => {
      setReceivedMessage((prev) => message);
    });

    chatSocket.current.on("receive_image", (message: ChatMessageModel) => {
      setReceivedMessage((prev) => message);
    });

    chatSocket.current.on("enter", (message) => {
      setIsMuted(message.muted);
    });

    chatSocket.current.on("connect", () => {
      console.log("Chat connected!");
    });

    // chatSocket.current.on("isTyping", (data) => {
    //   setIsTyping(data.typing);
    // });

    chatSocket.current.on("disconnect", (err) => {
      console.log("Chat disconnected!");
    });
  };

  const sendMessage = async (data: {
    conversationId: string;
    userId: string;
    message: string;
  }) => {
    if (!chatSocket.current) {
      console.log("no socket");
      return;
    }

    return new Promise((resolve, reject) => {
      if (!chatSocket.current) {
        reject(null);
        return;
      }
      chatSocket.current.emit(
        "text_message",
        data,
        withTimeout(
          (response: { data: ChatMessageModel; success: boolean }) => {
            console.log("socket response", response);
            if (response?.success) {
              resolve(response.data);
            }
            reject(null);
          },
          () => {
            reject("timeout");
          },
          MESSAGE_TIMEOUT
        )
      );
    });
  };

  const findMuted = async (data: unknown) => {
    if (!chatSocket.current) {
      return;
    }
    chatSocket.current.emit("enter", data, (response: SocketResponse) => {
      if (response && response.success) {
        setIsMuted(response.muted);
        return response.message;
      }
    });
  };

  const sendImage = async (data: {
    conversationId: string;
    userId: string;
    image: string;
  }) => {
    if (!chatSocket.current) {
      return;
    }
    return new Promise((resolve, reject) => {
      if (!chatSocket.current) {
        reject(null);
        return;
      }
      chatSocket.current.emit(
        "image_message",
        data,
        withTimeout(
          (response: { data: ChatMessageModel; success: boolean }) => {
            console.log("socket response", response);
            if (response?.success) {
              resolve(response.data);
            }
            reject(null);
          },
          () => {
            reject("timeout");
          },
          MESSAGE_TIMEOUT
        )
      );
    });
  };

  const socketDisconnect = () => {
    if (socket.current) {
      socket.current.disconnect();
    }

    resetSocket();
  };

  const chatSocketDisconnect = () => {
    if (chatSocket.current) {
      chatSocket.current.disconnect();
    }
    resetChatSocket();
  };

  const resetSocket = () => {
    socket.current = null;
  };

  const resetChatSocket = () => {
    chatSocket.current = null;
    setReceivedMessage(null);
    setIsTyping(false);
  };

  const socketContext = {
    chatSocket,
    receivedMessage,
    isTyping,
    startChatSocket,
    chatSocketDisconnect,
    socketDisconnect,
    sendMessage,
    // sendIsTyping,
    sendImage,
    findMuted,
    isMuted,
  };

  return (
    <SocketContext.Provider value={socketContext}>
      {children}
    </SocketContext.Provider>
  );
};
