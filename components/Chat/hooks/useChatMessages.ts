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
  conversationId: number;
  userId: string;
  scrollViewRef: MutableRefObject<ScrollView | null>;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isStorageInitialized, setIsStorageInitialized] = useState(false);
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
      dayjs(record.createdAt).format("YYYY MMM DD")
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
        id: ChatMessageModel["id"];
        createdAt: ChatMessageModel["createdAt"];
        user: ChatMessageModel["user"];
        messageImage: ChatMessageModel["message"]["messageImage"];
      }>
    ) => {
      setMessages((prevState) => {
        const newState = prevState.slice();
        const item = newState.find((item) => item.id === id);
        if (item) {
          if (values?.isLoading !== undefined) {
            item.isLoading = values?.isLoading;
            if (item.isLoading) {
              item.error = undefined;
            }
          }
          if (values.id) {
            item.id = values.id;
          }
          if (values.createdAt) {
            item.createdAt = new Date(values.createdAt);
          }
          if (values.user) {
            item.user = values.user;
          }
          // if (values.messageImage) {
          //   item.message?.messageImage = values.messageImage;
          // }
        }
        return newState;
      });
    },
    []
  );

  const setMessageError = useCallback((id: string | number) => {
    setMessages((prevState) => {
      const newState = prevState.slice();
      const message = newState.find((item) => item.id === id);
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
      try {
        const imageUrl = params.image?.assets?.[0].uri || "";
        setMessages([
          ...messages,
          {
            id: id,
            createdAt: new Date(),
            type: "image",
            messageImage: imageUrl,
            user: {
              _id: Number(userId),
              avatar: "",
              name: "",
            },
            isLoading: true,
            UserId: Number(userId),
            ConversationId: conversationId,
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
        if (uploadedImage?.success) {
          const response = await sendImage({
            UserId: userId, // ToDO remove after BE fix
            ConversationId: conversationId, // ToDO remove after BE fix
            conversationId,
            userId,
            image: uploadedImage.data.key,
          });
          console.log("response image", response);
          setMessageData(id, {
            isLoading: false,
            id: response.id,
            createdAt: response.createdAt,
            user: response.user,
            messageImage: response.messageImage,
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
          id: id,
          createdAt: new Date(),
          type: "text",
          message: params.message,
          user: {
            _id: Number(userId),
            avatar: "",
            name: "",
          },
          isLoading: true,
          UserId: Number(userId),
          ConversationId: conversationId,
        },
      ]);
      setMessage("");
      setTimeout(() => {
        scrollViewRef?.current?.scrollToEnd();
      });
      try {
        const response = await sendMessage({
          UserId: userId, // ToDO remove after BE fix
          ConversationId: conversationId, // ToDO remove after BE fix
          userId,
          conversationId,
          UserId: userId, // ToDO remove after BE fix
          ConversationId: conversationId, // ToDO remove after BE fix
          message: params.message,
        });
        console.log("response text", response);
        setMessageData(id, {
          isLoading: false,
          id: response?.id,
          createdAt: response?.createdAt,
          user: response?.user,
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
            const item = messages.find((item) => item.id === id);
            try {
              setMessageData(id, { isLoading: true });
              const response = await sendMessage({
                userId,
                conversationId,
                message: item.message,
              });
              console.log("response", response);
              setMessageData(id, {
                isLoading: false,
                id: response.id,
                createdAt: response.createdAt,
                user: response.user,
              });
            } catch (e) {
              setMessageError(id);
            }
            return;
          case deleteButtonIndex:
            setMessages((prevState) => {
              return prevState.slice().filter((item) => item.id !== id);
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
        setIsStorageInitialized(true);
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
        console.log("scrollToEnd");
        scrollViewRef?.current?.scrollToEnd();
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if (receivedMessage) {
      setTimeout(() => {
        setMessages((prevState) => {
          console.log("receivedMessage", receivedMessage);
          if (prevState.find((item) => item.id === receivedMessage.id)) {
            console.log("find");
            return prevState;
          } else {
            console.log("not found");
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
    if (isStorageInitialized) {
      getAllMessages(conversationId).then((response) => {
        // console.log("getAllMessages", JSON.stringify(response));
        setMessages(response.data);
        setIsLoading(false);
      });
    }
  }, [conversationId, isStorageInitialized]);

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
