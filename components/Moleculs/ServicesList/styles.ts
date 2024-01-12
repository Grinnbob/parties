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
  content: {
    flexDirection: "column",
  },
  serviceContainer: {
    flexDirection: "column",
    marginTop: 16,
  },
  serviceItemsContainer: {
    flexDirection: "column",
    gap: 16,
  },
  serviceNameText: {
    fontSize: 16,
    lineHeight: 19,
    color: Color.textMainWhite,
    marginBottom: 16,
  },
  lastContainer: {
    paddingBottom: 32,
  },
});
