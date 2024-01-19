import { StyleSheet } from "react-native";
import { Color } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    gap: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
  },
  label: {
    color: Color.textMainWhite,
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 24,
  },
  optionalText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "400",
    color: Color.gray300,
    marginBottom: 1,
  },
  content: {
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
});
