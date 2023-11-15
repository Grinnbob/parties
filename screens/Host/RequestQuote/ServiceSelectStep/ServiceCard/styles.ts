import { Dimensions, StyleSheet } from "react-native";
import { Color } from "../../../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    position: "relative",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: Color.textMainWhite,
    marginHorizontal: 24,
  },
  header: {
    flexDirection: "row",
  },
  priceContainer: {
    flexDirection: "column",
    backgroundColor: "#323232",
    borderTopLeftRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: "40%",
  },
  startAtText: {
    color: Color.textMainWhite,
    fontWeight: "300",
    fontSize: 12,
    lineHeight: 15,
  },
  priceValueContainer: {
    marginTop: 4,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  priceText: {
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 19,
    color: Color.textMainWhite,
  },
  unitText: {
    fontSize: 16,
    lineHeight: 19,
    color: Color.textMainWhite,
  },
  nameContainer: {
    width: "60%",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderTopRightRadius: 16,
  },
  nameText: {
    color: Color.textMainWhite,
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 19,
  },
  descriptionContainer: {
    paddingTop: 16,
    paddingBottom: 23,
    paddingHorizontal: 23,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  descriptionText: {
    color: Color.textMainWhite,
    textAlign: "left",
    fontSize: 14,
    lineHeight: 21,
  },
  checkIcon: {
    position: "absolute",
    left: -13,
    width: 26,
    height: 26,
    top: "43%",
  },
});
