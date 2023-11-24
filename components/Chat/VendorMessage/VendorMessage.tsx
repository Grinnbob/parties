import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import { PersonIcon } from "../../Icons";
import dayjs from "dayjs";
import { ChatMessageModel } from "../../../models";
import FastImage from "react-native-fast-image";

type VendorMessageProps = {
  chatMessage: ChatMessageModel;
};

export const VendorMessage: React.FC<VendorMessageProps> = ({
  chatMessage,
}) => {
  return (
    <View style={styles.root}>
      {chatMessage.user?.avatar ? (
        <FastImage
          style={styles.person}
          resizeMode="cover"
          source={{
            uri: chatMessage.user?.avatar,
          }}
        />
      ) : (
        <PersonIcon
          width={32}
          height={32}
          fill="#6C1B9EB2"
          style={styles.person}
        />
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{chatMessage.user?.name}</Text>
        <View style={styles.messageContainer}>
          {!!chatMessage?.message && (
            <Text style={styles.messageText}>{chatMessage.message}</Text>
          )}
          {!!chatMessage?.messageImage && (
            <FastImage
              source={{ uri: chatMessage.messageImage }}
              resizeMode="contain"
            />
          )}
        </View>
        <Text style={styles.time}>
          {dayjs(chatMessage?.createdAt).format("hh:mm A")}
        </Text>
      </View>
    </View>
  );
};
