import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "./styles";
import { ExclamationWarningIcon, PersonIcon } from "../../Icons";
import dayjs from "dayjs";
import { ChatMessageModel } from "../../../models";
import FastImage from "react-native-fast-image";
import { Color } from "../../../GlobalStyles";

type ChatMessageProps = {
  chatMessage: ChatMessageModel;
  onErrorPress?: (id: string | number) => void;
  onImagePress?: (imageUrl: string) => void;
  content?: React.ReactNode;
  isMe: boolean;
  type: "vendor" | "host";
  userIconColor?: string;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export const Message: React.FC<ChatMessageProps> = ({
  chatMessage,
  onErrorPress,
  onImagePress,
  content,
  isMe,
  type,
  style,
  contentStyle,
  userIconColor,
}) => {
  const isDisabled = chatMessage.isLoading || !!chatMessage.error;
  const [isImageLoadError, setIsImageLoadError] = useState(false);

  const handleImagePress = () => {
    if (chatMessage?.messageImage) {
      onImagePress?.(chatMessage.messageImage);
    }
  };

  const isHost = type === "host";
  const isVendor = type === "vendor";

  const userIconFill = useMemo(() => {
    if (userIconColor) {
      return userIconColor;
    }
    return isHost ? "#531878" : Color.primaryPink;
  }, [isHost]);

  return (
    <View
      style={[styles.root, isMe ? undefined : styles.otherPersonMessage, style]}
    >
      <View
        style={[
          styles.infoContainer,
          isMe ? undefined : styles.otherPersonInfoContainer,
        ]}
      >
        {!isMe && (
          <View style={styles.personInnerContainer}>
            {chatMessage.user?.avatar ? (
              <FastImage
                style={styles.image}
                resizeMode="cover"
                source={{ uri: chatMessage.user?.avatar }}
              />
            ) : (
              <PersonIcon width={32} height={32} fill={userIconColor} />
            )}
            <Text style={styles.name}>{chatMessage.user?.name}</Text>
          </View>
        )}
        <View
          style={[
            isMe ? undefined : styles.otherPersonMessageContainer,
            isHost ? styles.messageHostContainer : undefined,
            isVendor ? styles.messageVendorContainer : undefined,
            isDisabled ? styles.disabled : undefined,
            contentStyle,
          ]}
        >
          {!!chatMessage?.message && (
            <Text style={styles.messageText}>{chatMessage.message}</Text>
          )}
          {!!chatMessage?.messageImage && (
            <>
              {isImageLoadError ? (
                <Image
                  source={require("../../../assets/image-not-found-icon.svg")}
                  style={styles.messageImage}
                />
              ) : (
                <TouchableOpacity onPress={handleImagePress}>
                  <FastImage
                    source={{
                      uri: chatMessage.messageImage,
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
          {content}
        </View>
        <View
          style={[styles.footer, isMe ? undefined : styles.footerOtherPerson]}
        >
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
      {isMe && (
        <>
          {chatMessage.user?.avatar ? (
            <FastImage
              style={styles.image}
              resizeMode="cover"
              source={{ uri: chatMessage.user?.avatar }}
            />
          ) : (
            <PersonIcon
              width={32}
              height={32}
              fill={userIconFill}
              style={styles.personIcon}
            />
          )}
        </>
      )}
    </View>
  );
};
