import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Tag } from "../Atoms";
import { MyMessage } from "./MyMessage/MyMessage";
import { VendorMessage } from "./VendorMessage/VendorMessage";
import { MessageInput } from "./MessageInput";
import { styles } from "./styles";
import dayjs from "dayjs";
import { useChatMessages } from "./hooks/useChatMessages";
import { ImageModal } from "./ImageModal";

const currentYear = dayjs().format("YYYY");

type ChatProps = {
  conversationId: string;
  userId: string;
};

export const Chat: React.FC<ChatProps> = ({ conversationId, userId }) => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const {
    isLoading,
    message,
    onMessageChange,
    onSubmitMessage,
    groupedMessages,
    onErrorPress,
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

  console.log("imagePreviewUrl", imagePreviewUrl);

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.messagesContainer}
      >
        {Object.keys(groupedMessages).map((key) => {
          const split = key.split(" ");
          const tag =
            split[0] === currentYear ? split.slice(1, 3).join(" ") : key;

          return (
            <React.Fragment key={key}>
              <Tag text={tag} style={styles.tag} />
              {groupedMessages[key].map((message) => {
                if (message.name) {
                  return (
                    <VendorMessage
                      key={message.id}
                      id={message.id}
                      name={message.name}
                      date={message.date}
                      text={message.text}
                      imageUrl={message.imageUrl}
                    />
                  );
                }

                return (
                  <MyMessage
                    key={message.id}
                    id={message.id}
                    text={message.text}
                    date={message.date}
                    imageUrl={message.imageUrl}
                    isLoading={message.isLoading}
                    error={message.error}
                    onErrorPress={onErrorPress}
                    onImagePress={handleImagePress}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
        {isLoading && <ActivityIndicator size={24} />}
      </ScrollView>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior="position"
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
