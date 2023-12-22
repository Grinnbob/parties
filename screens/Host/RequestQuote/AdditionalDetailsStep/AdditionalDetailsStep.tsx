import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { RequestQuote, RequestQuoteStepEnum } from "../RequestQuoteScreen";
import { TextArea } from "../../../../components/Input/TextArea";
import DismissKeyboard from "../../../../layouts/DismissKeyboard";

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
        notes: text,
      };
    });
  }, []);

  const isValid = true;

  useEffect(() => {
    setQuote((prevState) => {
      return {
        ...prevState,
        steps: {
          ...prevState.steps,
          [RequestQuoteStepEnum.ADDITIONAL_DETAILS]: { isValid },
        },
      } as RequestQuote;
    });
  }, [isValid]);

  return (
    <DismissKeyboard>
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
            value: quote.notes,
            onChangeText: handleAdditionalDetailsChange,
            returnKeyType: "done",
            blurOnSubmit: true,
          }}
        />
      </View>
    </DismissKeyboard>
  );
};
