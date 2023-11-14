import { StyleSheet } from "react-native";
import { Padding } from "../../GlobalStyles";

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
  },
  backButton: {
    marginLeft: 15,
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
    flex: 1,
    paddingHorizontal: Padding.p_5xl,
    justifyContent: "space-between",
    height: "100%",
    marginTop: 20,
  },
  hidden: {
    width: 19,
  },
  divider: {
    marginVertical: 24,
  },
  actionsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    marginTop: 24,
  },
  actionButtonContainer: {
    width: "50%",
  },
  leftButton: {
    borderRadius: 8,
    marginRight: 8,
    // height: 40,
  },
  rightButton: {
    borderRadius: 8,
    marginLeft: 8,
    height: 40,
  },
  actionButtonText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
