import React from "react";
import { Modal, Text, View } from "react-native";
import { styles } from "./styles";
import { CloseCircleIcon, QuoteSubmittedIcon } from "../../../Icons";

type QuoteSubmittedModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const QuoteSubmittedModal: React.FC<QuoteSubmittedModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.root}>
        <View style={styles.innerContainer}>
          <CloseCircleIcon style={styles.closeIcon} onPress={onClose} />
          <QuoteSubmittedIcon />
          <Text style={styles.title}>Quote Submitted!</Text>
        </View>
      </View>
    </Modal>
  );
};
