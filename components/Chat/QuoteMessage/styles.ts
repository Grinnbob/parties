import { Dimensions, StyleSheet } from "react-native";
import { Border, Color, FontSize, Padding } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  personIcon: {
    marginBottom: 24,
    marginLeft: 16,
  },
  partyNameText: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "700",
    color: Color.textMainWhite,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 19,
    color: Color.textMainWhite,
  },
  partyInfoContainer: {
    flexDirection: "column",
    gap: 16,
    paddingTop: Padding.p_5xl,
    paddingBottom: 8,
  },
  partyItemRowInfo: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  icon: {
    color: Color.primaryPink,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 19,
    color: Color.textMainWhite,
    marginTop: 8,
    marginBottom: 8,
  },
  innerContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 16,
  },
  image: {
    borderRadius: 100,
    width: 32,
    height: 32,
    marginBottom: 32,
    marginLeft: 16,
  },
  actionsRoot: {
    flex: 1,
    borderColor: "rgba(255, 7, 126, 0.20)",
    borderWidth: 1,
    borderRadius: Border.br_base,
    backgroundColor: "#FF077E33",
    padding: Padding.p_base,
    flexDirection: "column",
    gap: 16,
  },
  actionTitle: {
    fontSize: 18,
    lineHeight: 27,
    color: Color.textMainWhite,
    fontWeight: "700",
  },
  createQuoteText: {
    fontSize: 16,
    lineHeight: 22,
  },
  denyRequestButton: {
    borderColor: Color.primaryPink,
  },
  acceptedByVendorContainer: {
    flex: 1,
    paddingHorizontal: 0,
    paddingBottom: 0,
    width: Dimensions.get("window").width - 96,
  },
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
  hostActions: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: "#6c1a9e",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  bookVendorText: {
    width: "100%",
    textAlign: "center",
    color: Color.textMainWhite,
    fontSize: 14,
    lineHeight: 21,
  },
  acceptButton: {
    marginTop: 16,
  },
  acceptButtonText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
  },
  declineButton: {
    marginTop: 8,
    alignItems: "center",
  },
  declineText: {
    color: Color.textMainWhite,
    fontSize: 16,
    lineHeight: 22,
  },
});
