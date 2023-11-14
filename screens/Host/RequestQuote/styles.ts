import { StyleSheet } from "react-native";
import { Color } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
  },
  content: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  topContent: {
    flex: 1,
  },
  bgIcon: {
    width: "100%",
    height: "100%",
    flex: 1,
    position: "absolute",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
  },
  backLayout: {
    height: 40,
    width: 40,
  },
  hidden: {
    opacity: 0,
  },
  closeIcon: {
    color: Color.textMainWhite,
  },
  progressBar: {
    marginBottom: 16,
  },
  nextButton: {
    borderRadius: 30,
  },
  nextButtonText: {
    fontSize: 16,
    lineHeight: 22,
  },
  skipButton: {
    marginTop: 16,
  },
  skipPartyText: {
    fontSize: 13,
    lineHeight: 15,
    marginTop: 16,
    width: "100%",
    textAlign: "center",
    color: Color.gray300,
  },
});
