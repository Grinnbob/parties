import { StyleSheet } from "react-native";
import { Color, Padding } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 50,
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  bgIcon: {
    width: "100%",
    height: "100%",
    flex: 1,
    position: "absolute",
  },
  titleText: {
    fontSize: 28,
    fontWeight: "700",
    color: Color.textMainWhite,
  },
  content: {
    flex: 1,
    paddingHorizontal: Padding.p_5xl,
    justifyContent: "space-between",
    height: "100%",
    marginTop: 20,
  },
  activityIndicator: {
    marginTop: 24,
  },
  noResultsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  noResultsText: {
    color: Color.gray300,
    marginBottom: 5,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 21,
  },
});
