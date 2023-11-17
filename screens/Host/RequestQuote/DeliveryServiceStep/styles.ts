import { StyleSheet } from "react-native";
import { Color } from "../../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    paddingHorizontal: 24,
  },
  activityIndicator: {
    color: Color.textMainWhite,
    marginTop: 24,
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    color: Color.textMainWhite,
  },
  breakDownText: {
    marginTop: 72,
  },
  listItemContainer: {
    marginTop: 16,
  },
  listItem: {
    flexDirection: "row",
    height: 56,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  listItemText: {
    fontSize: 14,
    lineHeight: 20,
    color: Color.textMainWhite,
  },
});
