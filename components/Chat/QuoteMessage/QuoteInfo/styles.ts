import { StyleSheet } from "react-native";
import { Color, Padding } from "../../../../GlobalStyles";

export const styles = StyleSheet.create({
  acceptedByVendorContent: {
    paddingHorizontal: Padding.p_base,
  },
  quoteTitle: {
    color: Color.textMainWhite,
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "700",
    marginTop: 8,
  },
  quoteFields: {
    flexDirection: "column",
    marginTop: 16,
    gap: 24,
    marginBottom: 24,
  },
  quoteFieldsRow: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  quoteFieldLabel: {
    color: Color.textMainWhite,
    fontSize: 14,
    lineHeight: 21,
  },
  quoteFieldValue: {
    color: Color.textMainWhite,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "700",
  },
});
