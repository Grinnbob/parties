import React from "react";
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

type ChatMessageProps = ChatMessageModel & {
  userImage?: string;
  isLoading?: boolean;
  onErrorPress?: (id: string) => void;
};

export const MyMessage: React.FC<ChatMessageProps> = ({
  id,
  text,
  imageUrl,
  date,
  userImage,
  isLoading,
  error,
  onErrorPress,
}) => {
  const isDisabled = isLoading || !!error;

  return (
    <View style={styles.root}>
      <View style={styles.infoContainer}>
        <View
          style={[
            styles.messageContainer,
            isDisabled ? styles.disabled : undefined,
          ]}
        >
          {!!text && <Text style={styles.messageText}>{text}</Text>}
          {!!imageUrl && (
            <Image source={{ uri: imageUrl }} resizeMode="contain" />
          )}
        </View>
        <View style={styles.footer}>
          {isLoading && (
            <ActivityIndicator size={6} style={styles.activityIndicator} />
          )}
          {!!error && (
            <TouchableOpacity
              onPress={() => {
                onErrorPress?.(id);
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
            {dayjs(date).format("hh:mm A")}
          </Text>
        </View>
      </View>
      {userImage ? (
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: userImage }}
        />
      ) : (
        <PersonIcon width={32} height={32} style={styles.personIcon} />
      )}
    </View>
  );
};
