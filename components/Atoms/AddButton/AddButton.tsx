import React from "react";
import { styles } from "./styles";
import { PlusIcon } from "../../Icons";
import { Color } from "../../../GlobalStyles";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

export const AddButton: React.FC<TouchableOpacityProps> = ({
  style,
  ...rest
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} {...rest}>
      <PlusIcon color={Color.primaryPink} />
      <Text style={styles.addText}>Add New</Text>
    </TouchableOpacity>
  );
};
