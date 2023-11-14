import { StyleSheet, Dimensions } from "react-native";
import { Color, FontSize } from "../../../GlobalStyles";
const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  root: {
    margin: 0,
    justifyContent: "flex-end",
    marginTop: 60,
    flex: 1,
  },
  container: {
    width: "100%",
    paddingBottom: 40,
    backgroundColor: "rgba(29, 26, 31, 1)",
    //  marginHorizontal: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: height * 0.75,
    paddingHorizontal: 24,
    paddingTop: 8,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    marginBottom: 24,
    color: Color.textMainWhite,
  },
  hiddenBackButton: {
    width: 17,
    height: 11,
  },
  closeIcon: {
    color: Color.textMainWhite,
  },
  title: {
    fontSize: FontSize.textDisplayMedium_size,
    lineHeight: 34,
    color: Color.textMainWhite,
    fontWeight: "700",
  },
  submitButtonText: {
    fontSize: 16,
    lineHeight: 22,
  },
});
