import { StyleSheet } from "react-native";
import { Color } from "../../GlobalStyles";

export const styles = StyleSheet.create({
  tabStyle: { paddingTop: 14 },
  labelStyle: { marginTop: 8, fontWeight: "bold" },
  activeIcon: {
    color: Color.primaryPink,
  },
  inactiveIcon: {
    color: Color.gray300,
  },
});
