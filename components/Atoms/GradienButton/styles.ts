import { StyleSheet } from "react-native";
import { Border, Color, FontSize, Padding } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    paddingVertical: Padding.p_7xs,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_base,
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: FontSize.textBody13Regular_size,
    lineHeight: 15.51,
    color: Color.textMainWhite,
  },
});
