import { Dimensions, StyleSheet } from "react-native";
import { Color } from "../../../../GlobalStyles";
const width = Dimensions.get("screen").width;

export const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
    color: Color.textMainWhite,
  },
  subTitle: {
    fontSize: 16,
    lineHeight: 22,
    color: "rgba(205, 204, 205, 1)",
    marginTop: 8,
  },
  partyNameInput: {
    width: "100%",
    marginTop: 40,
  },
  inputsContainer: {
    flexDirection: "column",
    gap: 24,
  },
  timePickersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  timePicker: {
    width: (width - 64) / 2,
  },
});
