import { Dimensions, StyleSheet } from "react-native";
import { Color } from "../../../../GlobalStyles";

const width = Dimensions.get("screen").width;

export const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    flex: 1,
    paddingBottom: 40,
  },
  title: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "700",
    color: Color.textMainWhite,
    paddingHorizontal: 24,
  },
  tagsContainer: {
    flexDirection: "column",
    marginTop: 24,
    paddingHorizontal: 24,
  },
  vendorText: {
    fontSize: 16,
    lineHeight: 19,
    color: Color.textMainWhite,
  },
  tagsInnerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
    gap: 8,
  },
  tag: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    height: 34,
    minHeight: 34,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
    lineHeight: 18,
  },
  tagTextSelected: {
    fontSize: 14,
    lineHeight: 20,
  },
  serviceContainer: {
    // flex: 1,
    flexDirection: "column",
    marginTop: 32,
  },
  lastContainer: {
    paddingBottom: 32,
  },
  serviceItemsContainer: {
    flexDirection: "column",
    gap: 16,
  },
  serviceNameText: {
    fontSize: 16,
    lineHeight: 19,
    color: Color.textMainWhite,
    fontWeight: "700",
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  serviceCard: {
    marginHorizontal: 24,
  },
  disabledService: {
    opacity: 0.5,
  },
});
