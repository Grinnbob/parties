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
  messageContainer: {
    borderColor: "#6C1B9E",
    borderWidth: 1,
    borderRadius: Border.br_base,
    backgroundColor: "#6C1B9EB2",
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_base,
  },
  messageText: {
    color: Color.textMainWhite,
  },
  time: {
    fontSize: FontSize.textBody12Medium_size,
    marginTop: 8,
    color: "#FFFFFF",
  },
});
