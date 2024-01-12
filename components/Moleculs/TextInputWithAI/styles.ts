import { StyleSheet } from "react-native";
import { Color } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    gap: 16,
  },
  label: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    color: Color.textMainWhite,
  },
  content: {
    borderColor: "#FFFFFF33",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  input: {
    marginBottom: 16,
    color: Color.textMainWhite,
    fontSize: 16,
    lineHeight: 22,
  },
  button: {
    width: "100%",
    borderRadius: 30,
    backgroundColor: Color.labelColorLightPrimary,
    borderColor: "transparent",
    padding: 9,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 22,
    color: Color.textMainWhite,
  },
});
