import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { Color, FontSize, FontFamily, Padding } from "../GlobalStyles";

const TermScreen = () => {
  return (
    <View style={styles.termscreen}>
      <Image
        style={styles.bgIcon}
        resizeMode="cover"
        source={require("../assets/bg19.png")}
      />
      <View style={styles.container}>
        <Text style={styles.itIsATypo}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
        <Text style={[styles.itIsA, styles.itIsATypo]}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy.
        </Text>
        <Text style={[styles.itIsA, styles.itIsATypo]}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32
        </Text>
      </View>
      <View style={styles.topnavigationContent}>
        <View style={[styles.leftAccessory, styles.header]}>
          <Text style={styles.leftTitle}>Prev. Title</Text>
          <Image
            style={[styles.iconsaxlinearhambergermenu, styles.backIconLayout]}
            resizeMode="cover"
            source={require("../assets/iconsaxlinearhambergermenu.png")}
          />
          <Image
            style={styles.backIconLayout}
            resizeMode="cover"
            source={require("../assets/back.png")}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.title1}>{`Terms & Policy`}</Text>
        </View>
        <View style={[styles.rightAccessory, styles.header]}>
          <Text style={styles.title2}>Label</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itIsATypo: {
    width: 327,
    color: Color.primaryAlmostWhite,
    lineHeight: 20,
    fontSize: FontSize.typographyBodyMediumBold_size,
    textAlign: "left",
    fontFamily: FontFamily.typographyBodyMediumRegular,
  },
  header: {
    paddingBottom: Padding.p_4xs,
    paddingTop: Padding.p_4xs,
    width: 130,
    alignItems: "center",
    flexDirection: "row",
    height: 42,
    top: 7,
    position: "absolute",
  },
  backIconLayout: {
    marginLeft: 5,
    height: 40,
    width: 40,
  },
  bgIcon: {
    top: 0,
    width: 665,
    height: 1357,
    left: 0,
    position: "absolute",
  },
  itIsA: {
    marginTop: 24,
  },
  container: {
    top: 126,
    left: 24,
    position: "absolute",
  },
  leftTitle: {
    fontSize: FontSize.textLargeBold_size,
    letterSpacing: 0,
    lineHeight: 22,
    fontFamily: FontFamily.bodyRegular,
    color: Color.defaultSystemBlueLight,
    display: "none",
    alignItems: "center",
    textAlign: "left",
    flex: 1,
  },
  iconsaxlinearhambergermenu: {
    display: "none",
    overflow: "hidden",
  },
  leftAccessory: {
    paddingLeft: Padding.p_base,
    paddingRight: Padding.p_4xs,
    alignItems: "center",
    left: 0,
  },
  title1: {
    fontSize: FontSize.typographyHeadingLarge_size,
    lineHeight: 25,
    fontWeight: "700",
    fontFamily: FontFamily.typographyBodySmallBold,
    color: Color.labelColorDarkPrimary,
    textAlign: "center",
  },
  title: {
    left: 163,
    width: 49,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 42,
    top: 7,
    position: "absolute",
  },
  title2: {
    fontSize: FontSize.typographyHeadingMedium_size,
    lineHeight: 22,
    color: Color.appColorPerfectPink,
    textAlign: "center",
    fontFamily: FontFamily.typographyBodyMediumRegular,
  },
  rightAccessory: {
    left: 245,
    paddingLeft: Padding.p_4xs,
    paddingRight: Padding.p_5xl,
    justifyContent: "flex-end",
    display: "none",
    alignItems: "center",
  },
  topnavigationContent: {
    marginLeft: -187.5,
    top: 44,
    left: "50%",
    borderStyle: "solid",
    borderColor: "rgba(77, 77, 77, 0.5)",
    borderBottomWidth: 1,
    width: 375,
    height: 56,
    position: "absolute",
  },
  termscreen: {
    backgroundColor: Color.labelColorDarkPrimary,
    width: "100%",
    height: 1208,
    overflow: "hidden",
    flex: 1,
  },
});

export default TermScreen;
