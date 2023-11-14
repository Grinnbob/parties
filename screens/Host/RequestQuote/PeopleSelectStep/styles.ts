import { Dimensions, StyleSheet } from "react-native";
import { Color } from "../../../../GlobalStyles";
const width = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "700",
    color: Color.textMainWhite,
  },
  rangeSlider: {
    marginTop: 40,
    width: width - 24,
    marginLeft: -12,
  },
  partyDetailsText: {
    marginTop: 32,
  },
  textArea: {
    marginTop: 4,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    fontSize: 14,
    lineHeight: 17,
    paddingTop: 4,
    paddingBottom: 6,
    paddingLeft: 6,
    paddingRight: 6,
    minHeight: 240,
  },
});
