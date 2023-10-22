import React, { useState, createContext, useRef, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import useGlobalState from "../../stateManagement/hook";
import StateTypes from "../../stateManagement/StateTypes";
import Config from "react-native-config";

type SocketResponse = {
  success: boolean;
  message: string;
  muted: boolean;
};

export type SocketContextProps = {
  message: string;
  isTyping: boolean;
  isMuted: boolean;
  startChatSocket: (data?: Record<string, unknown>) => Promise<void>;
  chatSocketDisconnect: () => void;
  socketDisconnect: () => void;
  sendMessage: (data: {
    conversationId: string;
    userId: string;
    message: string;
  }) => Promise<unknown>;
  sendImage: (data: string) => Promise<unknown>;
  findMuted: (data: unknown) => Promise<void>;
};

export const SocketContext = createContext<SocketContextProps>({
  message: "",
  isTyping: false,
  isMuted: false,
  startChatSocket: async (data?: Record<string, unknown>) => {},
  chatSocketDisconnect: () => {},
  socketDisconnect: () => {},
  sendMessage: async () => {},
  sendImage: async (data: unknown) => {},
  findMuted: async (data: unknown) => {},
});

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

const MESSAGE_TIMEOUT = 5000;

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket = useRef<Socket | null>(null);
  const chatSocket = useRef<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  // const [users, setUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const [token] = useGlobalState(
    StateTypes.token.key,
    StateTypes.token.default
  );

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
    chatSocket.current = io(`${Config.API_URL_BASE}`, {
      autoConnect: false,
    });
    chatSocket.current.auth = {
      ...data,
      token: token,
    };
    addChatSocketListeners();
    chatSocket.current.connect();
    chatSocket.current.emit("create", data);
    chatSocket.current.emit("read", data);
  };

  const addChatSocketListeners = () => {
    if (!chatSocket.current) {
      return;
    }
    chatSocket.current.on("receive_message", (message: string) => {
      setMessage((prev) => message);
    });

    chatSocket.current.on("receive_image", (message: string) => {
      setMessage((prev) => message);
    });

    chatSocket.current.on("enter", (message) => {
      setIsMuted(message.muted);
    });

    chatSocket.current.on("connect", () => {
      console.warn("Chat connected!");
    });

    // chatSocket.current.on("isTyping", (data) => {
    //   setIsTyping(data.typing);
    // });

    chatSocket.current.on("disconnect", (err) => {
      console.warn("Chat disconnected!");
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
        console.log("error");
        reject(null);
        return;
      }
      console.log("emit", data);
      chatSocket.current?.connect();
      console.log("connected", chatSocket.current?.connected);
      chatSocket.current.emit(
        "send_message",
        data,
        withTimeout(
          (response: SocketResponse) => {
            console.log("socket response", response);
            if (response && response.success) {
              setMessage(response.message);
              resolve(response.message);
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

  const sendImage = async (data: string) => {
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
          (response: SocketResponse) => {
            console.log("socket response", response);
            if (response && response.success) {
              setMessage(response.message);
              resolve(response.message);
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
    setMessage("");
    setIsTyping(false);
  };

  const socketContext = {
    message,
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
