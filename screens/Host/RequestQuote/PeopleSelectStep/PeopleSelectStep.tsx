import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { RequestQuote, RequestQuoteStepEnum } from "../RequestQuoteScreen";
import { RangeSlider } from "../../../../components/Atoms";
import { TextInput } from "../../../../components/Input";
import { Color } from "../../../../GlobalStyles";

type PeopleSelectStepProps = {
  quote: RequestQuote;
  setQuote: Dispatch<SetStateAction<RequestQuote>>;
};

export const PeopleSelectStep: React.FC<PeopleSelectStepProps> = ({
  quote,
  setQuote,
}) => {
  const handleSliderValueChange = (val: [number, number]) => {
    setQuote((prevState) => {
      return {
        ...prevState,
        party: {
          ...prevState.party,
          peopleRange: val,
        },
      };
    });
  };

  const isValid = true;

  useEffect(() => {
    setQuote((prevState) => {
      return {
        ...prevState,
        steps: {
          ...prevState.steps,
          [RequestQuoteStepEnum.PEOPLE_SELECT]: { isValid },
        },
      } as RequestQuote;
    });
  }, [isValid]);

  const handleDescriptionChange = (text: string) => {
    setQuote((prevState) => {
      return {
        ...prevState,
        party: {
          ...prevState.party,
          description: text,
        },
      };
    });
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>How many guest are expected to attend?</Text>
      <RangeSlider
        low={quote.party?.peopleRange?.[0] || 30}
        high={quote.party?.peopleRange?.[1] || 50}
        step={10}
        min={5}
        max={200}
        onChange={handleSliderValueChange}
        style={styles.rangeSlider}
      />
      <Text style={[styles.title, styles.partyDetailsText]}>Party Details</Text>
      <View style={styles.textAreaContainer}>
        <TextInput
          inputProps={{
            multiline: true,
            textAlignVertical: "top",
            placeholder: "Type details about your party here...",
            placeholderTextColor: Color.gray300,
            ...styles.textArea,
            value: quote.party?.description,
            onChangeText: handleDescriptionChange,
            returnKeyType: "done",
            blurOnSubmit: true,
          }}
        />
      </View>
    </View>
  );
};
