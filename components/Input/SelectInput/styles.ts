import { StyleSheet } from "react-native";
import { Color } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderRadius: 8,
    color: Color.textMainWhite,
    borderColor: "transparent",
    elevation: 1000,
  },
  label: {
    color: Color.textMainWhite,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 8,
  },
  arrowIconContainer: {
    right: 25,
  },
  arrowIcon: {
    color: Color.primaryPink,
  },
});
