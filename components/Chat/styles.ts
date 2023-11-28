import { StyleSheet } from "react-native";
import { Padding } from "../../GlobalStyles";

export const styles = StyleSheet.create({
  messagesContainer: {
    width: "100%",
    gap: 24,
    flexDirection: "column",
    paddingHorizontal: Padding.p_5xl,
    paddingTop: Padding.p_5xl,
    paddingBottom: 100,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  keyboardAvoidingView: { position: "absolute", left: 0, right: 0, bottom: 0 },
  tag: { alignSelf: "center" },
});
