import React, { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import { RequestQuote, RequestQuoteStepEnum } from "../RequestQuoteScreen";
import { TextInput } from "../../../../components/Input";
import { DatePicker } from "../../../../components/Input/DatePicker";
import { LocationAutocomplete } from "../../../../components/Input/LocationAutocomplete";
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";
import { Party } from "../SelectPartyStep";
import dayjs from "dayjs";

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
        party: {
          ...prevState.party,
          [key]: val,
        } as Party,
      };
    });
  };

  const formErrors = useMemo(() => {
    const errors: Record<string, string> = {};
    if (
      !!quote.party?.startDate &&
      !!quote.party?.endDate &&
      dayjs(quote.party?.startDate).isAfter(quote.party?.endDate, "date")
    ) {
      errors.endDate = "End date can't be after start date";
    }
    if (
      !!quote.party?.startDate &&
      !!quote.party?.endDate &&
      !!quote.party?.startTime &&
      !!quote.party?.endTime &&
      dayjs(quote.party?.startDate).isSame(quote.party?.endDate, "date") &&
      dayjs(quote.party?.startTime).isAfter(quote.party?.endTime)
    ) {
      errors.endTime = "End time can't be after start time";
    }
    return errors;
  }, [quote]);

  const isValid =
    !Object.keys(formErrors).length &&
    !!quote.party?.name &&
    !!quote.party?.startDate &&
    !!quote.party?.endDate &&
    !!quote.party?.startTime &&
    !!quote.party?.endTime;

  useEffect(() => {
    setQuote((prevState) => {
      return {
        ...prevState,
        steps: {
          ...prevState.steps,
          [RequestQuoteStepEnum.PARTY_CREATE]: {
            isValid,
            errors: formErrors,
          },
        },
      } as RequestQuote;
    });
  }, [isValid]);

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
            value: quote.party?.name,
            onChangeText: (text: string) => {
              handleFieldChange("name", text);
            },
            placeholder: "Party Name",
          }}
          formControlProps={{ style: styles.partyNameInput }}
        />
        <DatePicker
          inputProps={{ placeholder: "Start Date" }}
          date={quote.party?.startDate}
          datePickerProps={{ mode: "date" }}
          onChange={(date) => {
            handleFieldChange("startDate", date);
          }}
          error={formErrors.startDate}
        />
        <DatePicker
          inputProps={{ placeholder: "End Date" }}
          date={quote.party?.endDate}
          datePickerProps={{ mode: "date" }}
          onChange={(date) => {
            handleFieldChange("endDate", date);
          }}
          error={formErrors.endDate}
        />
        <View style={styles.timePickersContainer}>
          <DatePicker
            inputProps={{ placeholder: "Start time" }}
            datePickerProps={{ mode: "time" }}
            date={quote.party?.startTime}
            onChange={(date) => {
              handleFieldChange("startTime", date);
            }}
            formControlProps={{ style: styles.timePicker }}
            error={formErrors.startTime}
          />
          <DatePicker
            inputProps={{ placeholder: "End time" }}
            datePickerProps={{ mode: "time" }}
            date={quote.party?.endTime}
            onChange={(date) => {
              handleFieldChange("endTime", date);
            }}
            formControlProps={{ style: styles.timePicker }}
            error={formErrors.endTime}
          />
        </View>
        <LocationAutocomplete
          placeholder="Location"
          value={quote.party?.street || ""}
          textInputProps={{
            onChangeText: (val) => {
              handleFieldChange("street", val);
            },
          }}
          onPress={(
            data: GooglePlaceData,
            detail: GooglePlaceDetail | null
          ) => {
            handleFieldChange("street", detail?.formatted_address || "");
          }}
        />
      </ScrollView>
    </View>
  );
};
