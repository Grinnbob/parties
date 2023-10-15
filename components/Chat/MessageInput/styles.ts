import { StyleSheet } from "react-native";
import { Border, Color, FontSize, Padding } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 60,
    marginBottom: 0,
    width: "100%",
    paddingVertical: 17,
    paddingHorizontal: Padding.p_5xl,
    backgroundColor: "#FFFFFF1A",
  },
  input: {
    backgroundColor: "#FFFFFF14",
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_xs,
    color: Color.textMainWhite,
    borderRadius: Border.br_5xs,
    fontSize: FontSize.textBody13Regular_size,
    lineHeight: 15.51,
    flex: 1,
  },
  submitButton: {
    width: 66,
    height: 40,
  },
});
