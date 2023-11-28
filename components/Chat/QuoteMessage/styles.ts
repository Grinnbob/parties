import { StyleSheet } from "react-native";
import { Border, Color, FontSize, Padding } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: "100%",
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
    marginLeft: 16,
  },
  infoContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    flex: 1,
  },
  partyNameText: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "700",
    color: Color.textMainWhite,
  },
  messageContainer: {
    borderColor: "#a530ee",
    borderWidth: 1,
    borderRadius: Border.br_base,
    backgroundColor: "#6C1B9EB2",
    padding: Padding.p_base,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 19,
    color: Color.textMainWhite,
  },
  partyInfoContainer: {
    flexDirection: "column",
    gap: 16,
    paddingVertical: Padding.p_5xl,
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
  },
  actionsRoot: {
    borderColor: "#FF077E33",
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
  },
});
