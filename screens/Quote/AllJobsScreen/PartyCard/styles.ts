import { StyleSheet } from "react-native";
import { Color } from "../../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    gap: 32,
    alignItems: "stretch",
    justifyContent: "space-between",
    width: "100%",
    padding: 16,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
    borderTopColor: "rgba(255, 255, 255, 0.05)",
  },
  partyContainer: {
    gap: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    maxWidth: "60%",
  },
  partyInnerContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  partyImageNotFound: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.gray300,
    borderRadius: 100,
  },
  notFoundIcon: {
    color: Color.textMainWhite,
  },
  titleText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    color: Color.textMainWhite,
  },
  partyDateContainer: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  partyDateText: {
    fontSize: 12,
    lineHeight: 18,
    color: Color.gray300,
  },
  rightContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  arrowIcon: {
    color: Color.primaryPink,
  },
});
