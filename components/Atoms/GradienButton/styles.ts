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
    position: "relative",
  },
  disabledRoot: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  text: {
    fontSize: FontSize.textBody13Regular_size,
    lineHeight: 15.51,
    color: Color.textMainWhite,
  },
  disabledText: {
    color: "rgba(138, 138, 138, 1)",
  },
  activityIndicator: {
    color: Color.textMainWhite,
  },
});
