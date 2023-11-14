import React, { Dispatch, SetStateAction } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { RequestQuote } from "../RequestQuoteScreen";
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
        peopleRange: val,
      };
    });
  };

  const handleDescriptionChange = (text: string) => {
    setQuote((prevState) => {
      return {
        ...prevState,
        description: text,
      };
    });
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>How many guest are expected to attend?</Text>
      <RangeSlider
        low={quote.peopleRange[0]}
        high={quote.peopleRange[1]}
        step={10}
        min={5}
        max={200}
        onChange={handleSliderValueChange}
        style={styles.rangeSlider}
      />
      <Text style={[styles.title, styles.partyDetailsText]}>Party Details</Text>
      <TextInput
        inputProps={{
          multiline: true,
          placeholder: "Type details about your party here...",
          placeholderTextColor: Color.gray300,
          ...styles.textArea,
          value: quote.description,
          onChangeText: handleDescriptionChange,
        }}
      />
    </View>
  );
};
