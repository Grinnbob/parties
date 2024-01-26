import { StyleSheet } from "react-native";
import { Color } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    gap: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    color: Color.textMainWhite,
    fontWeight: "700",
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderColor: Color.primaryPink,
  },
  closeIcon: {
    color: Color.textMainWhite,
  },
  tagText: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "300",
  },
  tagDeleteIndicator: {
    marginLeft: 5,
  },
  maxCountText: {
    fontSize: 14,
    lineHeight: 19,
    color: Color.primaryAlmostGrey,
  },
  modal: {
    margin: 0,
    justifyContent: "flex-end",
    marginTop: 60,
    flex: 1,
    zIndex: 10,
  },
  modalContent: {
    height: "85%",
    marginTop: "auto",
    backgroundColor: "rgba(29, 26, 31, 1)",
    borderRadius: 20,
  },
  search: {
    color: Color.textMainWhite,
    marginBottom: 5,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 21,
  },
  border: {
    marginHorizontal: 70,
    marginVertical: 20,
  },
  hidden: {
    opacity: 0,
  },
});
