import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { ExclamationWarningIcon, PersonIcon } from "../../Icons";
import dayjs from "dayjs";
import { ChatMessageModel } from "../../../models";

type ChatMessageProps = {
  chatMessage: ChatMessageModel;
  onErrorPress?: (id: string | number) => void;
  onImagePress?: (imageUrl: string) => void;
};

export const MyMessage: React.FC<ChatMessageProps> = ({
  chatMessage,
  onErrorPress,
  onImagePress,
}) => {
  const isDisabled = chatMessage.isLoading || !!chatMessage.error;
  const [isImageLoadError, setIsImageLoadError] = useState(false);

  const handleImagePress = () => {
    if (chatMessage?.message?.messageImage) {
      onImagePress?.(chatMessage.message.messageImage);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.infoContainer}>
        <View
          style={[
            styles.messageContainer,
            isDisabled ? styles.disabled : undefined,
          ]}
        >
          {!!chatMessage?.message && (
            <Text style={styles.messageText}>{chatMessage.message}</Text>
          )}
          {!!chatMessage?.message?.messageImage && (
            <>
              {isImageLoadError ? (
                <Image
                  source={require("../../../assets/image-not-found-icon.svg")}
                  style={styles.messageImage}
                />
              ) : (
                <TouchableOpacity onPress={handleImagePress}>
                  <Image
                    source={{
                      uri: chatMessage.message.messageImage,
                    }}
                    style={styles.messageImage}
                    onError={() => {
                      setIsImageLoadError(true);
                    }}
                  />
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
        <View style={styles.footer}>
          {chatMessage.isLoading && (
            <ActivityIndicator size={6} style={styles.activityIndicator} />
          )}
          {!!chatMessage.error && (
            <TouchableOpacity
              onPress={() => {
                onErrorPress?.(chatMessage?.id);
              }}
            >
              <ExclamationWarningIcon
                width={16}
                height={16}
                style={styles.errorIcon}
              />
            </TouchableOpacity>
          )}
          <Text style={[styles.time, isDisabled ? styles.disabled : undefined]}>
            {dayjs(chatMessage.createdAt).format("hh:mm A")}
          </Text>
        </View>
      </View>
      {chatMessage.user?.avatar ? (
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: chatMessage.user?.avatar }}
        />
      ) : (
        <PersonIcon width={32} height={32} style={styles.personIcon} />
      )}
    </View>
  );
};
