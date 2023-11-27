import { StyleSheet } from "react-native";
import { Color, Padding } from "../../GlobalStyles";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  bgIcon: {
    width: "100%",
    height: "100%",
    flex: 1,
    position: "absolute",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    paddingHorizontal: 12,
  },
  titleContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "700",
    textAlign: "center",
    color: Color.labelColorDarkPrimary,
  },
  hiddenElem: { width: 40, height: 40 },
  content: {
    flex: 1,
    paddingHorizontal: Padding.p_5xl,
    justifyContent: "space-between",
    height: "100%",
    marginTop: 12,
  },
  flatList: {
    marginBottom: 12,
    minHeight: "100%",
    gap: 16,
    marginTop: 24,
    paddingBottom: 40,
  },
  noResultsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsText: {
    color: Color.gray300,
    marginBottom: 5,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 21,
  },
});
