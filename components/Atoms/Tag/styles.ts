import { StyleSheet } from "react-native";
import { Color, Padding } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    paddingHorizontal: Padding.p_5xs,
    paddingVertical: Padding.p_11xs,
    borderColor: Color.textMainWhite,
    borderWidth: 1,
    borderRadius: 16,
  },
  text: {
    fontSize: 12,
    lineHeight: 18,
    color: Color.textMainWhite,
    fontWeight: "bold",
  },
});
