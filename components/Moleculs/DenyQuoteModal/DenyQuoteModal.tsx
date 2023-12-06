import React, { useState } from "react";
import { Modal, Text, View } from "react-native";
import { styles } from "./styles";
import { CloseCircleIcon, DenyQuoteIcon } from "../../Icons";
import { Button, GradientButton } from "../../Atoms";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "native-base";
import { useRecoilState } from "recoil";
import { quotesListAtom } from "../../../stateManagement";
import cloneDeep from "lodash/cloneDeep";
import apis from "../../../apis";

type DenyQuoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  quoteId: number;
};

export const DenyQuoteModal: React.FC<DenyQuoteModalProps> = ({
  isOpen,
  onClose,
  quoteId,
}) => {
  const toast = useToast();
  const navigation = useNavigation();
  const [quotes, setQuotes] = useRecoilState(quotesListAtom);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    if (isLoading) {
      return;
    }
    onClose();
  };

  const handleDenyQuote = async () => {
    setIsLoading(true);
    const response = await apis.quote.changeStatus(quoteId, "deniedByVendor");
    setIsLoading(false);
    if (response.success) {
      const newQuotes = cloneDeep(quotes);
      const index = newQuotes.findIndex((item) => item.id === quoteId);
      if (index >= 0) {
        newQuotes[index].status = "deniedByVendor";
      }
      setQuotes(newQuotes);
      toast.show({
        placement: "top",
        description: "You denied this job",
      });
      onClose();
      navigation.navigate("AllJobsScreen");
    } else {
      toast.show({
        placement: "top",
        description: "Something went wrong. Please try again.",
      });
    }
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
          <DenyQuoteIcon />
          <Text style={styles.title}>Are sure to denied this request?</Text>
          <View style={styles.actions}>
            <Button
              text="Close"
              textStyle={styles.closeButtonText}
              style={styles.button}
              onPress={handleClose}
            />
            <GradientButton
              text="Deny"
              style={[styles.button, styles.denyButtonStyle]}
              textStyle={styles.buttonTextStyle}
              onPress={handleDenyQuote}
              loading={isLoading}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
