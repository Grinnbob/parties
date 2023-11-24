import { Dimensions, StyleSheet } from "react-native";
import { Color } from "../../../../GlobalStyles";
const width = Dimensions.get("screen").width;

export const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    color: Color.textMainWhite,
  },
  detailsText: {
    marginTop: 40,
  },
  textArea: {
    marginTop: 4,
    minHeight: 330,
  },
});
