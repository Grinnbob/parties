import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import { PersonIcon } from "../../Icons";
import dayjs from "dayjs";
import { ChatMessageModel } from "../../../models";

type VendorMessageProps = ChatMessageModel & {
  vendorImage?: string;
};

export const VendorMessage: React.FC<VendorMessageProps> = ({
  text,
  imageUrl,
  date,
  name,
  vendorImage,
}) => {
  return (
    <View style={styles.root}>
      {vendorImage ? (
        <Image
          style={styles.person}
          resizeMode="cover"
          source={{
            uri: vendorImage,
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
        <Text style={styles.name}>{name}</Text>
        <View style={styles.messageContainer}>
          {!!text && <Text style={styles.messageText}>{text}</Text>}
          {!!imageUrl && (
            <Image source={{ uri: imageUrl }} resizeMode="contain" />
          )}
        </View>
        <Text style={styles.time}>{dayjs(date).format("hh:mm A")}</Text>
      </View>
    </View>
  );
};
