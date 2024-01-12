import { StyleSheet } from "react-native";
import { Color } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#FFFFFF1A",
    gap: 8,
    alignItems: "center",
    flexDirection: "row",
  },
  addText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "300",
    color: Color.textMainWhite,
  },
});
