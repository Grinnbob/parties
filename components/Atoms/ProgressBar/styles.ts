import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    position: "relative",
    width: "100%",
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
  },
  progress: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 8,
    borderRadius: 4,
  },
});
