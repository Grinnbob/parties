import { Dimensions, StyleSheet } from "react-native";
import { Color } from "../../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
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
  textAreaContainer: {
    minHeight: 350,
  },
  textArea: {
    marginTop: 4,
    minHeight: 330,
  },
});
