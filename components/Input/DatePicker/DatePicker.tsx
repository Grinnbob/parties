import React, { useEffect, useState } from "react";
import RNDatePicker, {
  DatePickerProps as RNDatePickerProps,
} from "react-native-date-picker";
import { TextInput, TextInputProps } from "../TextInput";
import dayjs from "dayjs";
import { Color } from "../../../GlobalStyles";
import { CalendarIcon } from "../../Icons";
import { View } from "react-native";
import { styles } from "./styles";
import { AntDesign } from "@expo/vector-icons";

type DatePickerProps = Partial<TextInputProps> & {
  datePickerProps?: Omit<RNDatePickerProps, "date">;
  date?: Date;
  onChange?: (date?: Date) => void;
};

const formatDate = (date: Date) => {
  return dayjs(date).format("MMM, DD,YYYY HH:mm");
};

const formatTime = (date: Date) => {
  return dayjs(date).format("HH:mm");
};

export const DatePicker: React.FC<DatePickerProps> = ({
  datePickerProps,
  formControlProps,
  inputProps,
  onChange,
  date,
}) => {
  const isTimePicker = datePickerProps?.mode === "time";
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(() => {
    if (date) {
      if (isTimePicker) {
        return formatTime(date);
      }
      return formatDate(date);
    }
    return "";
  });
  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleConfirm = (date: Date) => {
    console.log("datePickerProps", datePickerProps);
    if (isTimePicker) {
      console.log("date", date);
      setInputValue(formatTime(date));
    } else {
      setInputValue(formatDate(date));
    }
    onChange?.(date);
    setIsOpen(false);
  };

  useEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, []);

  return (
    <>
      <TextInput
        formControlProps={formControlProps}
        inputProps={{
          ...inputProps,
          value: inputValue,
          onPressIn: handleOpen,
          isFocused: isOpen,
          rightElement: isTimePicker ? (
            <AntDesign
              name="down"
              size={15}
              style={{ right: 26, color: Color.primaryPink }}
            />
          ) : (
            <CalendarIcon style={styles.calendarIcon} />
          ),
        }}
      />
      <RNDatePicker
        modal={true}
        open={isOpen}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        {...datePickerProps}
        date={date ? date : new Date()}
      />
    </>
  );
};
