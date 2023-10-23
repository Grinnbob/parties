import { StyleSheet } from "react-native";
import { Border, Color, FontSize, Padding } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: "100%",
  },
  person: {
    width: 32,
    height: 32,
    marginBottom: "auto",
    marginRight: 16,
    borderRadius: 100,
  },
  infoContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
  },
  messageContainer: {
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
    marginTop: 8,
    color: Color.textMainWhite,
    fontSize: FontSize.textBody12Medium_size,
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
});
