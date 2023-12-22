import React, { useState } from "react";
import { Modal, Text, View } from "react-native";
import { styles } from "./styles";
import { CloseCircleIcon } from "../../Icons";
import { Button, GradientButton } from "../../Atoms";

type ConfirmationModalProps = {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  title: string;
  onAccept: () => void;
};

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  isOpen,
  onClose,
  isLoading,
  onAccept,
}) => {
  const handleClose = () => {
    if (isLoading) {
      return;
    }
    onClose();
  };

  const handleAccept = async () => {
    onAccept();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={handleClose}
    >
      <View style={styles.root}>
        <View style={styles.innerContainer}>
          <CloseCircleIcon style={styles.closeIcon} onPress={handleClose} />
          <Text style={styles.title}>{title}</Text>
          <View style={styles.actions}>
            <Button
              text="Close"
              textStyle={styles.closeButtonText}
              style={styles.button}
              onPress={handleClose}
            />
            <GradientButton
              text="Confirm"
              style={[styles.button, styles.denyButtonStyle]}
              textStyle={styles.buttonTextStyle}
              onPress={handleAccept}
              loading={isLoading}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
