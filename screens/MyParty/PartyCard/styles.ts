import { StyleSheet } from "react-native";
import { Color } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    padding: 10,
    flexDirection: "column",
    borderRadius: 24,
    backgroundColor: "#000000B2",
  },
  imageContainer: {
    height: 128,
    width: "100%",
    position: "relative",
  },
  dateContainer: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    position: "absolute",
    top: 8,
    left: 6,
    zIndex: 100,
    backgroundColor: "rgba(0, 0, 0, 0.70)",
    borderRadius: 8,
  },
  partyImage: { width: "100%", resizeMode: "cover", borderRadius: 18 },
  startDateText: {
    fontSize: 12,
    lineHeight: 16,
    color: Color.textMainWhite,
    borderRadius: 8,
    textTransform: "uppercase",
  },
  descriptionContainer: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    flexDirection: "column",
  },
  partyNameText: {
    fontSize: 14,
    lineHeight: 19,
    color: Color.textMainWhite,
  },
  questsText: {
    fontSize: 12,
    lineHeight: 16,
    color: Color.gray300,
    marginTop: 4,
  },
});
