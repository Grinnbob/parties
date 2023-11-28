import React from "react";
import { Modal, Text, View } from "react-native";
import { styles } from "./styles";
import { CloseCircleIcon, DenyQuoteIcon } from "../../Icons";
import { Button, GradientButton } from "../../Atoms";

type DenyQuoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const DenyQuoteModal: React.FC<DenyQuoteModalProps> = ({
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
        <CloseCircleIcon style={styles.closeIcon} onPress={onClose} />
        <DenyQuoteIcon />
        <Text style={styles.title}>Are sure to denied this request?</Text>
        <View style={styles.actions}>
          <Button text="Close" />
          <GradientButton text="Deny" />
        </View>
      </View>
    </Modal>
  );
};
