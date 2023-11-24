import { StyleSheet } from "react-native";
import { Color, Padding } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Padding.p_base,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  image: {
    width: "100%",
    flex: 100,
  },
});
