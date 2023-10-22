import React from "react";
import { Image, Modal, View, Pressable } from "react-native";
import { styles } from "./styles";

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
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </Pressable>
      )}
    </Modal>
  );
};
