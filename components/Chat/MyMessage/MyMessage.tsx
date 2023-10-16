import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import { PersonIcon } from "../../Icons";

type ChatMessageProps = {
  text: string;
  time: string;
  userImage?: string;
};

export const MyMessage: React.FC<ChatMessageProps> = ({
  text,
  time,
  userImage,
}) => {
  return (
    <View style={styles.root}>
      <View style={styles.infoContainer}>
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{text}</Text>
        </View>
        <Text style={styles.time}>{time}</Text>
      </View>
      {userImage ? (
        <Image style={styles.image} resizeMode="cover" source={userImage} />
      ) : (
        <PersonIcon width={32} height={32} style={styles.personIcon} />
      )}
    </View>
  );
};
