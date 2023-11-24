import { StyleSheet } from "react-native";
import { Color } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    width: "100%",
  },
  rail: {
    flex: 1,
    backgroundColor: "rgba(48, 127, 226, 0.3)",
    height: 8,
    borderRadius: 8,
    width: "100%",
  },
  railSelected: {
    height: 8,
    borderRadius: 4,
  },
  label: {
    color: Color.textMainWhite,
  },
  rangesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  rangeValue: {
    color: Color.textMainWhite,
    fontSize: 16,
    lineHeight: 19,
  },
  rangeText: {
    color: Color.gray300,
    fontSize: 16,
    lineHeight: 18,
  },
  rangeLeft: {
    paddingLeft: 12,
  },
  rangeRight: {
    paddingRight: 12,
  },
});
