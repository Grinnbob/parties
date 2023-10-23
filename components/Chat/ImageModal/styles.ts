import { StyleSheet } from "react-native";
import { Color, Padding } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    // backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Padding.p_base,
    backgroundColor: Color.primaryGrey,
  },
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
    minHeight: 100,
  },
});
