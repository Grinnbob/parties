import { Platform, StyleSheet } from "react-native";
import { Color } from "../../GlobalStyles";

export const styles = StyleSheet.create({
  tabStyle: { paddingTop: 14 },

  labelStyle: {
    marginTop: 12,
    fontWeight: "bold",
    marginBottom: Platform.select({ ios: 0, android: 4 }),
  },
  activeIcon: {
    color: Color.primaryPink,
  },
  inactiveIcon: {
    color: Color.gray300,
  },
});
