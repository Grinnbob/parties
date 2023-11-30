import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Tag } from "../Atoms";
import { Message } from "./Message/Message";
import { MessageInput } from "./MessageInput";
import { styles } from "./styles";
import dayjs from "dayjs";
import { useChatMessages } from "./hooks/useChatMessages";
import { ImageModal } from "./ImageModal";
import { QuoteMessage } from "./QuoteMessage";
import { Color } from "../../GlobalStyles";

const currentYear = dayjs().format("YYYY");

type ChatProps = {
  conversationId: number;
  userId: number;
  vendorId: number;
};

export const Chat: React.FC<ChatProps> = ({
  conversationId,
  userId,
  vendorId,
}) => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const {
    isLoading,
    message,
    onMessageChange,
    onSubmitMessage,
    groupedMessages,
    onErrorPress,
    setMessages,
  } = useChatMessages({
    conversationId,
    userId,
    scrollViewRef,
  });

  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleImagePress = (url: string) => {
    setImagePreviewUrl(url);
  };

  const handleCloseModal = () => {
    setImagePreviewUrl("");
  };

  const handleContentSizeChange = useCallback((w: number, h: number) => {
    scrollViewRef.current?.scrollToEnd({ animated: false });
  }, []);

  const getType = (id: number) => {
    if (vendorId) {
      return id === vendorId ? "vendor" : "host";
    }
    return userId === id ? "host" : "vendor";
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={handleContentSizeChange}
      >
        {Object.keys(groupedMessages).map((key) => {
          const split = key.split(" ");
          const tag =
            split[0] === currentYear ? split.slice(1, 3).join(" ") : key;

          return (
            <React.Fragment key={key}>
              <Tag text={tag} style={styles.tag} />
              {groupedMessages[key].map((chatMessage) => {
                const isMe = chatMessage?.user?._id === userId;

                if (chatMessage.QuoteId) {
                  return (
                    <QuoteMessage
                      key={chatMessage.id}
                      chatMessage={chatMessage}
                      isMe={isMe}
                      setMessages={setMessages}
                    />
                  );
                }

                return (
                  <Message
                    key={chatMessage.id}
                    chatMessage={chatMessage}
                    onErrorPress={onErrorPress}
                    onImagePress={handleImagePress}
                    isMe={isMe}
                    type={getType(chatMessage?.user?._id)}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
        {isLoading && <ActivityIndicator color={Color.primaryPink} size={24} />}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : null}
        style={styles.keyboardAvoidingView}
      >
        <MessageInput
          value={message}
          onChangeText={onMessageChange}
          onSubmit={onSubmitMessage}
          scrollViewRef={scrollViewRef}
        />
      </KeyboardAvoidingView>
      <ImageModal
        isVisible={!!imagePreviewUrl}
        onClose={handleCloseModal}
        imageUrl={imagePreviewUrl}
      />
    </>
  );
};
