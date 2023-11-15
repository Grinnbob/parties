import React, { Dispatch, SetStateAction, useCallback } from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import { RequestQuote } from "../RequestQuoteScreen";
import { TextInput } from "../../../../components/Input";
import { DatePicker } from "../../../../components/Input/DatePicker";
import { LocationIcon } from "../../../../components/Icons";
import { LocationAutocomplete } from "../../../../components/Input/LocationAutocomplete";
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";
import { Party } from "../SelectPartyStep";

type CreatePartyStepProps = {
  quote: RequestQuote;
  setQuote: Dispatch<SetStateAction<RequestQuote>>;
};

export const CreatePartyStep: React.FC<CreatePartyStepProps> = ({
  quote,
  setQuote,
}) => {
  const handleFieldChange = (key: string, val?: unknown) => {
    setQuote((prevState) => {
      return {
        ...prevState,
        newParty: {
          ...prevState.newParty,
          [key]: val,
        } as Party,
      };
    });
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Create Your Party!</Text>
      <Text style={styles.subTitle}>
        After you created your party you can start to book for party services!
      </Text>
      <ScrollView
        contentContainerStyle={styles.inputsContainer}
        keyboardShouldPersistTaps="handled"
        horizontal={false}
      >
        <TextInput
          inputProps={{
            value: quote.newParty?.name,
            onChangeText: (text: string) => {
              handleFieldChange("name", text);
            },
            placeholder: "Party Name",
          }}
          formControlProps={{ style: styles.partyNameInput }}
        />
        <DatePicker
          inputProps={{ placeholder: "Date" }}
          date={quote.party?.date}
          onChange={(date) => {
            handleFieldChange("date", date);
          }}
        />
        <View style={styles.timePickersContainer}>
          <DatePicker
            inputProps={{ placeholder: "Start time" }}
            datePickerProps={{ mode: "time" }}
            date={quote.party?.date}
            onChange={(date) => {
              handleFieldChange("startTime", date);
            }}
            formControlProps={{ style: styles.timePicker }}
          />
          <DatePicker
            inputProps={{ placeholder: "End time" }}
            datePickerProps={{ mode: "time" }}
            date={quote.party?.date}
            onChange={(date) => {
              handleFieldChange("endTime", date);
            }}
            formControlProps={{ style: styles.timePicker }}
          />
        </View>
        <LocationAutocomplete
          placeholder="Location"
          value={quote.newParty?.location || ""}
          textInputProps={{
            onChangeText: (val) => {
              handleFieldChange("location", val);
            },
          }}
          onPress={(
            data: GooglePlaceData,
            detail: GooglePlaceDetail | null
          ) => {
            handleFieldChange("location", detail?.formatted_address || "");
          }}
        />
      </ScrollView>
    </View>
  );
};
