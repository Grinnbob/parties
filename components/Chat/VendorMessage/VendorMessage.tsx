import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import { PersonIcon } from "../../Icons";

type VendorMessageProps = {
  name: string;
  text: string;
  time: string;
  vendorImage?: string;
};

export const VendorMessage: React.FC<VendorMessageProps> = ({
  text,
  time,
  name,
  vendorImage,
}) => {
  return (
    <View style={styles.root}>
      {vendorImage ? (
        <Image style={styles.person} resizeMode="cover" source={vendorImage} />
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
          <Text style={styles.messageText}>{text}</Text>
        </View>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};
