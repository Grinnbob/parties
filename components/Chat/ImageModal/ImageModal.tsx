import React from "react";
import { Modal, Pressable } from "react-native";
import { styles } from "./styles";
import FastImage from "react-native-fast-image";

type ImageModalProps = {
  imageUrl?: string;
  isVisible: boolean;
  onClose: () => void;
};

export const ImageModal: React.FC<ImageModalProps> = ({
  isVisible,
  onClose,
  imageUrl,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      {!!imageUrl && (
        <Pressable onPress={onClose} style={styles.root}>
          <FastImage
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        </Pressable>
      )}
    </Modal>
  );
};
