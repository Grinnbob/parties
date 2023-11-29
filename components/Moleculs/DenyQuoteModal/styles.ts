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
    paddingHorizontal: Padding.p_5xl,
    backgroundColor: Color.textMainWhite,
    paddingTop: 48,
    paddingBottom: 20,
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
    fontWeight: "700",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  button: {
    width: 130,
  },
  closeButtonText: {
    color: Color.gray300,
    borderColor: Color.gray300,
  },
  buttonTextStyle: {
    fontSize: 16,
    lineHeight: 20,
  },
  denyButtonStyle: {
    borderRadius: 30,
  },
});
