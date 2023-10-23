import { StyleSheet } from "react-native";
import { Color, FontSize, Padding } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    paddingVertical: Padding.p_base,
    borderBottomWidth: 1,
    borderBottomColor: "#232323",
  },
  selectedTab: {
    borderBottomColor: Color.primaryPink,
  },
  text: {
    textAlign: "center",
    fontSize: FontSize.size_base,
    color: "#8A8A8A",
  },
  selectedText: {
    textAlign: "center",
    fontSize: FontSize.size_base,
    color: "#FFF",
  },
});
