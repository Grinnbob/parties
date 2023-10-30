import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ImagePickerResponse } from "react-native-image-picker";
import uuid from "react-native-uuid";
import { useActionSheet } from "@expo/react-native-action-sheet";
import groupBy from "lodash/groupBy";
import dayjs from "dayjs";
import { useChat } from "./useChat";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllMessages, uploadChatImage } from "../../../apis/routes/chat";
import { ChatMessageModel } from "../../../models/ChatMessageModel";

export const useChatMessages = ({
  conversationId,
  userId,
  scrollViewRef,
}: {
  conversationId: string;
  userId: string;
  scrollViewRef: MutableRefObject<ScrollView | null>;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    receivedMessage,
    startChatSocket,
    chatSocketDisconnect,
    sendImage,
    sendMessage,
  } = useChat();
  const [messages, setMessages] = useState<ChatMessageModel[]>([]);
  const messagesRef = useRef(messages);
  const groupedMessages = useMemo(() => {
    return groupBy(messages, (record) =>
      dayjs(record.message.createdAt).format("YYYY MMM DD")
    );
  }, [messages]);

  const [message, setMessage] = useState("");
  const onMessageChange = useCallback((val: string) => {
    setMessage(val);
  }, []);

  const setMessageData = useCallback(
    (
      id: string | number,
      values: Partial<{
        isLoading: boolean;
        id: ChatMessageModel["message"]["_id"];
        createdAt: ChatMessageModel["message"]["createdAt"];
        user: ChatMessageModel["message"]["user"];
      }>
    ) => {
      setMessages((prevState) => {
        const newState = prevState.slice();
        const item = newState.find((item) => item.message._id === id);
        if (item) {
          if (values?.isLoading !== undefined) {
            item.isLoading = values?.isLoading;
            if (item.isLoading) {
              item.error = undefined;
            }
          }
          if (values.id) {
            item.message._id = values.id;
          }
          if (values.createdAt) {
            item.message.createdAt = new Date(values.createdAt);
          }
          if (values.user) {
            item.message.user = values.user;
          }
        }
        return newState;
      });
    },
    []
  );

  const setMessageError = useCallback((id: string | number) => {
    setMessages((prevState) => {
      const newState = prevState.slice();
      const message = newState.find((item) => item.message._id === id);
      if (message) {
        message.isLoading = false;
        message.error = "timeout";
      }
      return newState;
    });
  }, []);

  const onSubmitMessage = async (params: {
    message?: string;
    image?: ImagePickerResponse;
  }) => {
    const id = uuid.v4() as string;
    if (params.image) {
      console.log("params.image", params.image);
      try {
        const imageUrl = params.image?.assets?.[0].uri || "";
        setMessages([
          ...messages,
          {
            message: {
              _id: id,
              createdAt: new Date(),
              type: "image",
              image: imageUrl,
              user: {
                _id: userId,
                avatar: "",
                name: "",
              },
            },
            isLoading: true,
          },
        ]);
        setTimeout(() => {
          scrollViewRef?.current?.scrollToEnd();
        });
        const uploadedImage = await uploadChatImage({
          conversationId,
          userId,
          id,
          uri: imageUrl,
        });
        console.log("uploadedImage", uploadedImage);
        if (uploadedImage.success) {
          const response = await sendImage({
            userId,
            conversationId,
            image: imageUrl,
          });
          setMessageData(id, {
            isLoading: false,
            id: response.message._id,
            createdAt: response.message.createdAt,
            user: response.message.user,
          });
        } else {
          setMessageError(id);
        }
      } catch (e) {
        setMessageError(id);
      }
    } else if (params.message) {
      setMessages([
        ...messages,
        {
          message: {
            _id: id,
            createdAt: new Date(),
            type: "text",
            text: params.message,
            user: {
              _id: userId,
              avatar: "",
              name: "",
            },
          },
          isLoading: true,
        },
      ]);
      setMessage("");
      setTimeout(() => {
        scrollViewRef?.current?.scrollToEnd();
      });
      try {
        const response = await sendMessage({
          userId,
          conversationId,
          message: params.message,
        });
        console.log("response", response);
        setMessageData(id, {
          isLoading: false,
          id: response.message._id,
          createdAt: response.message.createdAt,
          user: response.message.user,
        });
      } catch (e) {
        console.log("error", e);
        setMessageError(id);
      }
    }
  };

  const onErrorPress = useCallback(async (id: string | number) => {
    const options = ["Retry", "Delete", "Cancel"];
    const [retryButtonIndex, deleteButtonIndex, cancelButtonIndex] = [0, 1, 2];

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (selectedIndex: number) => {
        switch (selectedIndex) {
          case retryButtonIndex:
            const item = messages.find((item) => item.message._id === id);
            if (!item?.message.text) {
              return;
            }
            try {
              setMessageData(id, { isLoading: true });
              const response = await sendMessage({
                userId,
                conversationId,
                message: item.message.text,
              });
              console.log("response", response);
              setMessageData(id, {
                isLoading: false,
                id: response.message._id,
                createdAt: response.message.createdAt,
                user: response.message.user,
              });
            } catch (e) {
              setMessageError(id);
            }
            return;
          case deleteButtonIndex:
            setMessages((prevState) => {
              return prevState
                .slice()
                .filter((item) => item.message._id !== id);
            });
            return;
        }
      }
    );
  }, []);

  const { showActionSheetWithOptions } = useActionSheet();

  useEffect(() => {
    startChatSocket({ conversationId });

    return () => {
      chatSocketDisconnect();
    };
  }, [startChatSocket]);

  useEffect(() => {
    AsyncStorage.getItem(`chat-${conversationId}`)
      .then((messagesString) => {
        if (messagesString) {
          try {
            setMessages(JSON.parse(messagesString));
          } catch {}
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [conversationId]);

  useEffect(() => {
    return () => {
      AsyncStorage.setItem(
        `chat-${conversationId}`,
        JSON.stringify(
          messagesRef.current.map((item) => {
            if (item.isLoading) {
              item.isLoading = false;
              item.error = "timeout";
            }
            return item;
          })
        )
      );
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        scrollViewRef?.current?.scrollToEnd();
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if (receivedMessage) {
      setTimeout(() => {
        setMessages((prevState) => {
          if (
            prevState.find(
              (item) => item.message._id === receivedMessage.message._id
            )
          ) {
            return prevState;
          } else {
            setTimeout(() => {
              scrollViewRef?.current?.scrollToEnd();
            });
            return [...prevState, receivedMessage];
          }
        });
      });
    }
  }, [receivedMessage]);

  useEffect(() => {
    getAllMessages(conversationId).then((response) => {
      console.log("getAllMessages", response);
    });
  }, [conversationId]);

  messagesRef.current = messages;

  return {
    isLoading,
    message,
    onMessageChange,
    onSubmitMessage,
    groupedMessages,
    onErrorPress,
  };
};
