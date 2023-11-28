import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { styles } from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { GradientButton } from "../../Atoms";

type Quote = {
  price: string;
  downPayment: string;
  remainder: string;
};

type CreateQuoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
export const CreateQuoteModal: React.FC<CreateQuoteModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [quote, setQuote] = useState<Quote>({
    price: "",
    downPayment: "",
    remainder: "",
  });

  const handleFieldChange = (field: keyof Quote, text: string) => {
    const newQuote = { ...quote };
    quote[field] = text;
    setQuote(newQuote);
  };

  return (
    <Modal
      isVisible={isOpen}
      onBackdropPress={onClose}
      backdropOpacity={0}
      style={styles.root}
    >
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <View style={styles.hiddenBackButton} />
            <TouchableOpacity onPress={onClose}>
              <AntDesign name="close" size={20} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Submit your quote</Text>
        </View>
        <GradientButton
          text="Submit"
          disabled={true}
          textStyle={styles.submitButtonText}
        />
      </View>
    </Modal>
  );
};
