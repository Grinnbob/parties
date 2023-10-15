import { StyleSheet } from "react-native";
import { Padding } from "../../GlobalStyles";

export const styles = StyleSheet.create({
  messagesContainer: {
    flex: 1,
    width: "100%",
    gap: 24,
    flexDirection: "column",
    paddingHorizontal: Padding.p_5xl,
    paddingTop: Padding.p_5xl,
    paddingBottom: Padding.p_45xl,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  keyboardAvoidingView: { position: "absolute", left: 0, right: 0, bottom: 0 },
});
