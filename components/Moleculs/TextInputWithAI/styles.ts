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
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  input: {
    marginBottom: 16,
    color: Color.textMainWhite,
    fontSize: 16,
    lineHeight: 22,
  },
  activityIndicator: {
    width: 20,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    borderRadius: 30,
    backgroundColor: Color.labelColorLightPrimary,
    borderColor: "transparent",
    padding: 9,
    alignItems: "center",
  },
  buttonText: {
    position: "relative",
    fontSize: 16,
    lineHeight: 22,
    color: Color.textMainWhite,
    marginRight: 20,
  },
});
