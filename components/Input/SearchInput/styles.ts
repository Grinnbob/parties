import { StyleSheet } from "react-native";
import { Color } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    color: Color.textMainWhite,
    paddingTop: 4,
    paddingBottom: 8,
    paddingVertical: 12,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    fontSize: 14,
    lineHeight: 19,
  },
  leftIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingLeft: 24,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  rightIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingRight: 8,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  activityIndicator: {
    color: Color.textMainWhite,
    marginLeft: 6,
    marginRight: 6,
  },
});
