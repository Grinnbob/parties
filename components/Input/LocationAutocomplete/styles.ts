import { StyleSheet } from "react-native";
import { Color } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    placeholderTextColor: Color.gray300,
    color: Color.textMainWhite,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.primaryGrey,
    minHeight: 54,
    paddingTop: 2,
  },
  containerFocused: {
    borderColor: Color.textMainWhite,
  },
  textInput: {
    backgroundColor: "transparent",
    color: Color.textMainWhite,
    placeholderTextColor: Color.gray300,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 24,
    fontSize: 16,
    lineHeight: 22,
  },
  clearIcon: {
    color: Color.primaryPink,
    marginRight: 8,
  },
  actionsContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 24,
    flexDirection: "row",
  },
  description: {
    color: Color.textMainWhite,
  },
  listView: {
    color: Color.textMainWhite,
    backgroundColor: Color.primaryGrey,
  },
});
