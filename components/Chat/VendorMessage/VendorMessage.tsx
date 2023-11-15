import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import { PersonIcon } from "../../Icons";
import dayjs from "dayjs";
import { ChatMessageModel } from "../../../models";

type VendorMessageProps = {
  chatMessage: ChatMessageModel;
};

export const VendorMessage: React.FC<VendorMessageProps> = ({
  chatMessage,
}) => {
  return (
    <View style={styles.root}>
      {chatMessage.message.user?.avatar ? (
        <Image
          style={styles.person}
          resizeMode="cover"
          source={{
            uri: chatMessage.message.user?.avatar,
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
        <Text style={styles.name}>{chatMessage.message.user?.name}</Text>
        <View style={styles.messageContainer}>
          {!!chatMessage.message.text && (
            <Text style={styles.messageText}>{chatMessage.message.text}</Text>
          )}
          {!!chatMessage.message.messageImage && (
            <Image
              source={{ uri: chatMessage.message.messageImage }}
              resizeMode="contain"
            />
          )}
        </View>
        <Text style={styles.time}>
          {dayjs(chatMessage.message.createdAt).format("hh:mm A")}
        </Text>
      </View>
    </View>
  );
};
