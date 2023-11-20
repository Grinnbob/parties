import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
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
              {groupedMessages[key].map((chatMessage) => {
                if (
                  String(chatMessage?.message?.user?._id) === String(userId)
                ) {
                  return (
                    <MyMessage
                      key={chatMessage.message._id}
                      chatMessage={chatMessage}
                      onErrorPress={onErrorPress}
                      onImagePress={handleImagePress}
                    />
                  );
                }

                return (
                  <VendorMessage
                    key={chatMessage.message._id}
                    chatMessage={chatMessage}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
        {isLoading && <ActivityIndicator size={24} />}
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
