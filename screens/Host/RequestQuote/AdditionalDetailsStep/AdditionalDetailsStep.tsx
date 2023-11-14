import React, { Dispatch, SetStateAction, useCallback } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { RequestQuote } from "../RequestQuoteScreen";
import { TextArea } from "../../../../components/Input/TextArea";

type AdditionalDetailsStepProps = {
  quote: RequestQuote;
  setQuote: Dispatch<SetStateAction<RequestQuote>>;
};

export const AdditionalDetailsStep: React.FC<AdditionalDetailsStepProps> = ({
  quote,
  setQuote,
}) => {
  const handleAdditionalDetailsChange = useCallback((text: string) => {
    setQuote((prevState) => {
      return {
        ...prevState,
        additionalDetails: text,
      };
    });
  }, []);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>
        Is there anything else we should know? Anything you’re looking for in
        particular?
      </Text>
      <Text style={[styles.title, styles.detailsText]}>
        Additional Details/Requirements
      </Text>
      <TextArea
        inputProps={{
          ...styles.textArea,
          onChangeText: handleAdditionalDetailsChange,
        }}
      />
    </View>
  );
};
