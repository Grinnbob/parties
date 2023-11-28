import { StyleSheet } from "react-native";
import { Border, Color, Padding } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Padding.p_base,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  innerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    paddingVertical: Padding.p_13xl,
    paddingHorizontal: Padding.p_5xl,
    backgroundColor: Color.textMainWhite,
    borderRadius: 20,
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    right: 8,
    top: 8,
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    color: Color.labelColorLightPrimary,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
});
