import { StyleSheet } from "react-native";
import { Color } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    gap: 24,
  },
  progressContainer: {
    flexDirection: "column",
    gap: 16,
  },
  completeText: {
    fontSize: 16,
    lineHeight: 22,
    color: Color.textMainWhite,
    fontWeight: "300",
  },
  completeContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  completeProfileText: {
    fontSize: 16,
    lineHeight: 22,
    color: Color.textMainWhite,
    fontWeight: "700",
  },
  checksContainer: {
    flexDirection: "column",
    gap: 18,
  },
  checkItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkText: {
    fontSize: 14,
    lineHeight: 19,
    color: Color.primaryAlmostGrey,
    fontWeight: "300",
  },
  unchecked: {
    opacity: 0.5,
  },
});
