import { StyleSheet } from "react-native";
import { Color, Padding } from "../../../../GlobalStyles";

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
    paddingHorizontal: Padding.p_5xl,
    backgroundColor: Color.textMainWhite,
    paddingTop: 48,
    paddingBottom: 20,
    borderRadius: 20,
    position: "relative",
    minWidth: 320,
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
    fontWeight: "700",
  },
  closeButtonText: {
    color: Color.gray300,
    borderColor: Color.gray300,
  },
});
