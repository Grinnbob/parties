import React, { useEffect, useRef, useState } from "react";
import RNDatePicker, {
  DatePickerProps as RNDatePickerProps,
} from "react-native-date-picker";
import { TextInput, TextInputProps } from "../TextInput";
import dayjs from "dayjs";
import { CalendarIcon } from "../../Icons";
import { styles } from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { FormControl } from "native-base";

type DatePickerProps = Partial<TextInputProps> & {
  datePickerProps?: Omit<RNDatePickerProps, "date">;
  date?: Date;
  onChange?: (date?: Date) => void;
};

const formatDate = (date: Date) => {
  return dayjs(date).format("MMM DD,YYYY");
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
  error,
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
    Keyboard.dismiss();
  };

  const handleOpen = () => {
    const newVal = !isOpen;
    setIsOpen(newVal);
  };

  const handleConfirm = (date: Date) => {
    if (isTimePicker) {
      setInputValue(formatTime(date));
    } else {
      setInputValue(formatDate(date));
    }
    onChange?.(date);
    handleCancel();
  };

  useEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, []);

  // console.log("inputRef", inputRef);

  return (
    <>
      <TouchableOpacity onPress={handleOpen}>
        <TextInput
          formControlProps={formControlProps}
          inputProps={{
            ...inputProps,
            value: inputValue,
            onPressIn: handleOpen,
            isFocused: isOpen,
            isReadOnly: true,
            focusable: false,
            editable: false,
            InputRightElement: isTimePicker ? (
              <AntDesign
                name="down"
                size={15}
                style={styles.rightElement}
                onPress={handleOpen}
              />
            ) : (
              <CalendarIcon style={styles.calendarIcon} onPress={handleOpen} />
            ),
          }}
          error={error}
        />
      </TouchableOpacity>
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
