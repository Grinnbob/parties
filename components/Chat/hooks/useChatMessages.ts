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
import { ChatMessageModel } from "../../../models";
import groupBy from "lodash/groupBy";
import dayjs from "dayjs";
import { useChat } from "./useChat";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uploadChatImage } from "../../../apis/routes/chat";
// {
//   id: uuid.v4() as string,
//   text: "How early can you arrive?",
//   date: new Date(),
// },
// {
//   id: uuid.v4() as string,
//   name: "All American Vendor Truck",
//   text: "I can arrive 1 hour before the party, to set up my Taco Truck. I’ll even throw in free Horchata!",
//   date: new Date(),
// },
// {
//   id: uuid.v4() as string,
//   text: "OMG! We love Horchata! That is si kind. Please send an invoice over, and i will pay it on Friday, when i get paid!",
//   date: new Date(),
// },
// {
//   id: uuid.v4() as string,
//   text: "How early can you arrive?",
//   date: new Date(),
// },
// {
//   id: uuid.v4() as string,
//   name: "All American Vendor Truck",
//   text: "I can arrive 1 hour before the party, to set up my Taco Truck. I’ll even throw in free Horchata!",
//   date: new Date(),
// },
// {
//   id: uuid.v4() as string,
//   text: "OMG! We love Horchata! That is si kind. Please send an invoice over, and i will pay it on Friday, when i get paid!",
//   date: new Date(),
// },

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
  const { startChatSocket, chatSocketDisconnect, sendImage, sendMessage } =
    useChat();

  const [messages, setMessages] = useState<ChatMessageModel[]>([]);
  const messagesRef = useRef(messages);
  const groupedMessages = useMemo(() => {
    return groupBy(messages, (record) =>
      dayjs(record.date).format("YYYY MMM DD")
    );
  }, [messages]);

  const [message, setMessage] = useState("");
  const onMessageChange = useCallback((val: string) => {
    setMessage(val);
  }, []);

  const setMessageLoading = useCallback((id: string, val: boolean) => {
    setMessages((prevState) => {
      const newState = prevState.slice();
      const message = newState.find((item) => item.id === id);
      if (message) {
        message.isLoading = val;
        if (val) {
          message.error = undefined;
        }
      }
      return newState;
    });
  }, []);

  const setMessageError = useCallback((id: string) => {
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
    console.log("params", params);
    if (params.image) {
      console.log("params.image", params.image);
      try {
        const imageUrl = params.image?.assets?.[0].uri || "";
        setMessages([
          ...messages,
          {
            id,
            imageUrl,
            date: new Date(),
            isLoading: true,
          },
        ]);
        setTimeout(() => {
          scrollViewRef?.current?.scrollToEnd();
        });
        const message = await sendImage({
          userId,
          conversationId,
          image: imageUrl,
        });
        // setMessageLoading(id, false);
        // uploadChatImage({conversationId, userId});
      } catch (e) {
        setMessageError(id);
      }
    } else if (params.message) {
      setMessages([
        ...messages,
        {
          id,
          text: params.message,
          date: new Date(),
          isLoading: true,
        },
      ]);
      setMessage("");
      setTimeout(() => {
        scrollViewRef?.current?.scrollToEnd();
      });
      try {
        const message = await sendMessage({
          userId,
          conversationId,
          message: params.message,
        });
        console.log("message", message);
        setMessageLoading(id, false);
      } catch (e) {
        console.log("error", e);
        setMessageError(id);
      }
    }
  };

  const onErrorPress = useCallback(async (id: string) => {
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
            const message = messages.find((item) => item.id === id);
            if (!message?.text) {
              return;
            }
            try {
              setMessageLoading(id, true);
              const response = await sendMessage({
                userId,
                conversationId,
                message: message.text,
              });
              console.log("response", response);
              setMessageLoading(id, false);
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
    startChatSocket();

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
