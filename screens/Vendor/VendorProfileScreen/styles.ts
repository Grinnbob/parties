import { StyleSheet } from "react-native";
import {
  Border,
  Color,
  FontFamily,
  FontSize,
  Padding,
} from "../../../GlobalStyles";

export const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#000",
    width: "100%",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: Padding.p_base,
    paddingHorizontal: 16,
    zIndex: 10,
    left: 0,
    right: 0,
  },
  headerIcon: { width: 40, height: 40 },
  iconLayout: {
    height: 32,
    width: 32,
  },
  bgIcon: {
    width: "100%",
    height: "100%",
    left: 0,
    position: "absolute",
  },
  profileBackground: {
    width: "100%",
    height: 400,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  profileBgImageContainer: {
    width: "100%",
    height: 400,
  },
  bgGradient: {
    zIndex: 20,
    top: 200,
    height: 200,
    width: "100%",
    position: "absolute",
  },
  avatarContainer: {
    width: 76,
    height: 76,
    borderRadius: 100,
    zIndex: 40,
    bottom: 100,
    marginLeft: 24,
    // backgroundColor: Color.textMainWhite,
  },
  avatarBg: {
    width: 76,
    height: 76,
    borderRadius: 100,
  },
  businessNameText: {
    fontSize: 20,
    lineHeight: 28,
    color: Color.textMainWhite,
    fontWeight: "bold",
    zIndex: 40,
    bottom: 172,
    marginLeft: 114,
  },
  forms: {
    backgroundColor: "black",
    width: "100%",
    marginTop: -170,
    zIndex: 30,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
  },
  background: {
    height: "120%",
    position: "absolute",
    right: 0,
    top: -10,
    left: -250,
  },
  areaInfo: {
    flexDirection: "column",
    marginTop: 8,
    marginBottom: 24,
    marginLeft: 90,
  },
  milesInfo: {
    flexDirection: "row",
  },
  cityText: {
    fontSize: 16,
    lineHeight: 24,
    color: Color.textMainWhite,
  },
  areaText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    color: Color.textMainWhite,
  },
  sectionsContainer: {
    flexDirection: "column",
    gap: 40,
    flex: 1,
    paddingBottom: 48,
  },
  sectionContainer: {
    flexDirection: "column",
    gap: 16,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    color: Color.textMainWhite,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#CECDCE",
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  businessType: {
    marginTop: 20,
  },
  gradientTag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    minHeight: 32,
  },
});
