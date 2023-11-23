import { StyleSheet } from "react-native";
import { Color, Padding } from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  partyImage: {
    height: 300,
    width: "100%",
    position: "absolute",
  },
  partyImageNotFound: {
    height: 300,
    width: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.gray300,
  },
  notFoundImageIcon: {
    color: Color.textMainWhite,
  },
  header: {
    height: 300,
    position: "relative",
  },
  headerInnerContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 60,
    paddingHorizontal: Padding.p_5xl,
  },
  backButtonContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.70)",
    padding: 8,
    borderRadius: 48,
    width: 44,
  },
  backButton: {
    height: 40,
    width: 40,
  },
  bgIcon: {
    width: "100%",
    height: "100%",
    flex: 1,
    position: "absolute",
  },
  content: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-start",
    height: "100%",
    marginTop: 24,
  },
  eventDetailsContainer: {
    flexDirection: "column",
    flex: 1,
    gap: 24,
    justifyContent: "flex-start",
    paddingHorizontal: Padding.p_5xl,
  },
  contentTitle: {
    color: Color.textMainWhite,
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 22,
  },
  divider: {
    marginBottom: 0,
  },
  marginTop16: {
    marginTop: 16,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 19,
    color: Color.primaryAlmostGrey,
  },
  partyInfoContainer: {
    flexDirection: "column",
    gap: 16,
  },
  partyItemRowInfo: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  icon: {
    color: Color.primaryPink,
  },
  descriptionContainer: {
    flexDirection: "column",
    gap: 16,
  },
  tabContainer: {
    display: "none",
    flexDirection: "column",
    flex: 1,
  },
  visibleTab: {
    display: "flex",
  },
  activityIndicator: {
    marginTop: 24,
    color: Color.primaryPink,
  },
});
