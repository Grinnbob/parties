import { StyleSheet } from "react-native";
import { Color } from "../../../../GlobalStyles";

export const styles = StyleSheet.create({
  newPartyText: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "700",
    color: Color.textMainWhite,
  },
  existingPartyText: {
    fontSize: 18,
    lineHeight: 22,
    marginTop: 8,
    color: Color.textMainWhite,
  },
  partiesContainer: {
    flex: 1,
    width: "100%",
    marginTop: 24,
  },
  partyItem: {
    flexDirection: "row",
    height: 56,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  partyText: {
    fontSize: 15,
    lineHeight: 18,
    color: Color.textMainWhite,
  },
});
