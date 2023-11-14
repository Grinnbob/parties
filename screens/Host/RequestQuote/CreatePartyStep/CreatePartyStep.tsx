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

type CreatePartyStepProps = {
  quote: RequestQuote;
  setQuote: Dispatch<SetStateAction<RequestQuote>>;
};

export const CreatePartyStep: React.FC<CreatePartyStepProps> = ({
  quote,
  setQuote,
}) => {
  const handleChangePartyName = (text: string) => {
    setQuote((prevState) => {
      return {
        ...prevState,
        newParty: {
          name: text,
        },
      };
    });
  };

  const handleDateChange = (date?: Date) => {
    setQuote((prevState) => {
      return {
        ...prevState,
        newParty: {
          date,
        },
      };
    });
  };

  const handleLocationTextChange = useCallback(
    (text: string) => {
      setQuote((prevState) => {
        return {
          ...prevState,
          newParty: {
            ...prevState.newParty,
            location: text,
          },
        };
      });
    },
    [setQuote]
  );

  const handleLocationPress = useCallback(
    (data: GooglePlaceData, detail: GooglePlaceDetail | null) => {
      setQuote((prevState) => {
        return {
          ...prevState,
          newParty: {
            ...prevState.newParty,
            location: detail?.formatted_address,
          },
        };
      });
    },
    []
  );

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
            onChangeText: handleChangePartyName,
            placeholder: "Party Name",
          }}
          formControlProps={{ style: styles.partyNameInput }}
        />
        <DatePicker
          inputProps={{ placeholder: "Date" }}
          date={quote.party?.date}
          onChange={handleDateChange}
        />
        <View style={styles.timePickersContainer}>
          <DatePicker
            inputProps={{ placeholder: "Start time" }}
            datePickerProps={{ mode: "time" }}
            date={quote.party?.date}
            onChange={handleDateChange}
            formControlProps={{ style: styles.timePicker }}
          />
          <DatePicker
            inputProps={{ placeholder: "End time" }}
            datePickerProps={{ mode: "time" }}
            date={quote.party?.date}
            onChange={handleDateChange}
            formControlProps={{ style: styles.timePicker }}
          />
        </View>
        <LocationAutocomplete
          placeholder="Location"
          value={quote.newParty?.location || ""}
          textInputProps={{
            onChangeText: handleLocationTextChange,
          }}
          onPress={handleLocationPress}
        />
      </ScrollView>
    </View>
  );
};
