import { StyleSheet } from "react-native";
import { Color } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  input: {
    borderRightWidth: 0,
  },
  calendarIcon: {
    marginRight: 24,
  },
  rightElement: {
    right: 16,
    color: Color.primaryPink,
    borderColor: "red",
    borderRightColor: "red",
  },
});
