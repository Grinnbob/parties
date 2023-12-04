import { StyleSheet } from "react-native";
import { Color } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    width: "100%",
    flexDirection: "column",
    gap: 16,
  },
  contentTitle: {
    color: Color.textMainWhite,
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 22,
  },
  divider: {
    marginBottom: 0,
  },
  marginTop16: {
    marginTop: 16,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 19,
    color: Color.primaryAlmostGrey,
  },
  partyInfoContainer: {
    flexDirection: "column",
    gap: 16,
  },
  partyItemRowInfo: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  icon: {
    color: Color.primaryPink,
  },
  descriptionContainer: {
    flexDirection: "column",
    gap: 16,
    marginTop: 8,
  },
});
