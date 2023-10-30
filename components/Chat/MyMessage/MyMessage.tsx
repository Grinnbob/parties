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
    if (chatMessage.message.image) {
      onImagePress?.(chatMessage.message.image);
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
          {!!chatMessage.message.text && (
            <Text style={styles.messageText}>{chatMessage.message.text}</Text>
          )}
          {!!chatMessage.message.image && (
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
                      uri: chatMessage.message.image,
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
                onErrorPress?.(chatMessage.message._id);
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
            {dayjs(chatMessage.message.createdAt).format("hh:mm A")}
          </Text>
        </View>
      </View>
      {chatMessage.message.user?.avatar ? (
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: chatMessage.message.user?.avatar }}
        />
      ) : (
        <PersonIcon width={32} height={32} style={styles.personIcon} />
      )}
    </View>
  );
};
