import { StyleSheet } from "react-native";
import { Color } from "../../../../GlobalStyles";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
    color: Color.textMainWhite,
    maxWidth: 201,
    textAlign: "center",
    marginTop: 32,
  },
  textContainer: {
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(35, 35, 35, 1)",
    width: "100%",
    paddingVertical: 24,
    paddingTop: 24,
    paddingBottom: 40,
    marginTop: 32,
  },
  textInnerContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    maxWidth: 279,
  },
  subTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: Color.textMainWhite,
  },
  textItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: Color.textMainWhite,
  },
  round: {
    fontSize: 4,
    marginRight: 10,
    marginTop: 2,
    color: Color.textMainWhite,
  },
});
