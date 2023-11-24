import React from "react";
import { TextInput, TextInputProps } from "../TextInput";
import { Color } from "../../../GlobalStyles";
import { styles } from "./styles";

type TextAreaProps = TextInputProps;

export const TextArea: React.FC<TextAreaProps> = (props) => {
  return (
    <TextInput
      {...props}
      inputProps={{
        ...styles.root,
        multiline: true,
        placeholderTextColor: Color.gray300,
        ...props.inputProps,
      }}
    />
  );
};
