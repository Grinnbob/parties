import { StyleSheet } from "react-native";
import { Color } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderColor: Color.gray300,
    borderWidth: 1,
  },
  text: {
    color: Color.textMainWhite,
    fontSize: 16,
    lineHeight: 22,
  },
});
