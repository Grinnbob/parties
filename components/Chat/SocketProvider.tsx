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
  sendMessage: (data: unknown) => void;
  sendImage: (data: unknown) => void;
  findMuted: (data: unknown) => Promise<void>;
};

export const SocketContext = createContext<SocketContextProps>({
  message: "",
  isTyping: false,
  isMuted: false,
  startChatSocket: async (data?: Record<string, unknown>) => {},
  chatSocketDisconnect: () => {},
  socketDisconnect: () => {},
  sendMessage: () => {},
  sendImage: (data: unknown) => {},
  findMuted: async (data: unknown) => {},
});

type SocketProviderProps = {
  children?: React.ReactNode;
};

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
    chatSocket.current = io(`${Config.API_URL_BASE}/chat`, {
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

    // chatSocket.current.on("isTyping", (data) => {
    //   setIsTyping(data.typing);
    // });

    chatSocket.current.on("disconnect", (err) => {});
  };

  const sendMessage = (data: unknown) => {
    if (!chatSocket.current) {
      return;
    }
    chatSocket.current.emit(
      "send_message",
      data,
      (response: SocketResponse) => {
        if (response && response.success) {
          setMessage(response.message);
          return response.message;
        }
      }
    );
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

  const sendImage = (data: unknown) => {
    if (!chatSocket.current) {
      return;
    }
    chatSocket.current.emit(
      "image_message",
      data,
      (response: SocketResponse) => {
        if (response && response.success) {
          setMessage(response.message);
          return response.message;
        }
      }
    );
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
