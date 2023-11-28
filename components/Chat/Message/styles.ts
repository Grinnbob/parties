import { StyleSheet } from "react-native";
import { Border, Color, FontSize, Padding } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: "100%",
    gap: 16,
  },
  otherPersonMessage: {
    flexDirection: "row-reverse",
  },
  image: {
    borderRadius: 100,
    width: 32,
    height: 32,
    marginBottom: 32,
    marginLeft: 16,
  },
  personIcon: {
    marginBottom: 24,
  },
  infoContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    flex: 1,
  },
  otherPersonInfoContainer: {
    alignItems: "flex-start",
  },
  name: {
    width: "100%",
    fontWeight: "bold",
    fontSize: FontSize.size_sm,
    lineHeight: 21,
    color: Color.textMainWhite,
    marginBottom: 8,
    marginTop: 6,
  },
  disabled: {
    opacity: 0.5,
  },
  otherPersonMessageContainer: {
    marginLeft: 48,
    marginTop: 8,
  },
  messageHostContainer: {
    borderColor: "#a530ee",
    borderWidth: 1,
    borderRadius: Border.br_base,
    backgroundColor: "#6C1B9EB2",
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_base,
  },
  messageVendorContainer: {
    borderColor: "#FF077E33",
    borderWidth: 1,
    borderRadius: Border.br_base,
    backgroundColor: "#FF077E33",
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_base,
  },
  messageText: {
    color: Color.textMainWhite,
  },
  time: {
    fontSize: FontSize.textBody12Medium_size,
    color: "#FFFFFF",
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 6,
    minHeight: 16,
  },
  footerOtherPerson: {
    marginLeft: 48,
  },
  activityIndicator: { marginRight: 14 },
  errorIcon: {
    marginRight: 8,
    marginBottom: 0,
    color: Color.textMainWhite,
  },
  messageImage: {
    flex: 1,
    width: 150,
    height: 150,
    maxHeight: 150,
    resizeMode: "cover",
    borderRadius: Border.br_5xs,
    overflow: "hidden",
  },
});
