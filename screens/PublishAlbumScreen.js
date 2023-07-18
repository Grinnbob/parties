import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import TopNavigationContent from "../components/TopNavigationContent";
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";

const PublishAlbumScreen = () => {
  return (
    <View style={styles.publishalbumscreen}>
      <Image
        style={styles.bgIcon}
        resizeMode="cover"
        source={require("../assets/bg17.png")}
      />
      <LinearGradient
        style={[styles.form, styles.formBg]}
        locations={[0, 1]}
        colors={["#6c1b9e", "#ff077e"]}
        useAngle={true}
        angle={-90}
      >
        <Text style={[styles.label, styles.labelLayout]}>Publish Album</Text>
      </LinearGradient>
      <View style={styles.photoAlbumParent}>
        <View>
          <View style={styles.title}>
            <Text style={[styles.title1, styles.titleFlexBox]}>
              Photo album
            </Text>
            <Text style={[styles.title2, styles.title2Typo]}>
              Add some photos here so guest can see your amazing work!
            </Text>
          </View>
          <View style={styles.images}>
            <View style={styles.viewFlexBox}>
              <Image
                style={[styles.photoIcon, styles.photoIconLayout]}
                resizeMode="cover"
                source={require("../assets/photo.png")}
              />
              <Image
                style={[styles.photoIcon1, styles.photoIconLayout]}
                resizeMode="cover"
                source={require("../assets/photo1.png")}
              />
              <Image
                style={[styles.photoIcon2, styles.photoIconLayout]}
                resizeMode="cover"
                source={require("../assets/photo2.png")}
              />
              <Image
                style={[
                  styles.iconsaxlinearclosecircle,
                  styles.iconsaxlinearclosecircleLayout,
                ]}
                resizeMode="cover"
                source={require("../assets/iconsaxlinearclosecircle3.png")}
              />
              <Image
                style={[
                  styles.iconsaxlinearclosecircle1,
                  styles.iconsaxlinearclosecircleLayout,
                ]}
                resizeMode="cover"
                source={require("../assets/iconsaxlinearclosecircle4.png")}
              />
              <Image
                style={[
                  styles.iconsaxlinearclosecircle2,
                  styles.iconsaxlinearclosecircleLayout,
                ]}
                resizeMode="cover"
                source={require("../assets/iconsaxlinearclosecircle5.png")}
              />
            </View>
            <View style={[styles.view1, styles.viewFlexBox]}>
              <Image
                style={[styles.photoIcon, styles.photoIconLayout]}
                resizeMode="cover"
                source={require("../assets/photo3.png")}
              />
              <Image
                style={[styles.photoIcon1, styles.photoIconLayout]}
                resizeMode="cover"
                source={require("../assets/photo4.png")}
              />
              <Image
                style={[styles.photoIcon2, styles.photoIconLayout]}
                resizeMode="cover"
                source={require("../assets/photo5.png")}
              />
              <Image
                style={[
                  styles.iconsaxlinearclosecircle,
                  styles.iconsaxlinearclosecircleLayout,
                ]}
                resizeMode="cover"
                source={require("../assets/iconsaxlinearclosecircle6.png")}
              />
              <Image
                style={[
                  styles.iconsaxlinearclosecircle1,
                  styles.iconsaxlinearclosecircleLayout,
                ]}
                resizeMode="cover"
                source={require("../assets/iconsaxlinearclosecircle7.png")}
              />
              <Image
                style={[
                  styles.iconsaxlinearclosecircle2,
                  styles.iconsaxlinearclosecircleLayout,
                ]}
                resizeMode="cover"
                source={require("../assets/iconsaxlinearclosecircle8.png")}
              />
            </View>
          </View>
        </View>
        <View style={styles.nameThisAlbum}>
          <Text style={[styles.title3, styles.titleFlexBox]}>
            Name this album
          </Text>
          <View style={[styles.form1, styles.form1Border]}>
            <View style={styles.icon} />
            <Text style={[styles.label1, styles.title2Typo]}>
              New Years Party
            </Text>
          </View>
        </View>
        <View style={styles.nameThisAlbum}>
          <Text style={[styles.title3, styles.titleFlexBox]}>
            Add key words
          </Text>
          <View style={[styles.keywords, styles.form1Border]}>
            <View style={styles.view2}>
              <View style={[styles.view3, styles.viewSpaceBlock]}>
                <Text style={[styles.redTables, styles.titleFlexBox]}>
                  Red Tables
                </Text>
                <Image
                  style={[styles.unionIcon, styles.unionIconLayout]}
                  resizeMode="cover"
                  source={require("../assets/union4.png")}
                />
              </View>
              <View style={[styles.view4, styles.viewSpaceBlock]}>
                <Text style={[styles.redTables, styles.titleFlexBox]}>
                  Gold
                </Text>
                <Image
                  style={[styles.unionIcon, styles.unionIconLayout]}
                  resizeMode="cover"
                  source={require("../assets/union4.png")}
                />
              </View>
            </View>
            <View style={styles.view5}>
              <View style={[styles.view6, styles.viewSpaceBlock]}>
                <Text style={[styles.redTables, styles.titleFlexBox]}>
                  Balloons
                </Text>
                <Image
                  style={[styles.unionIcon2, styles.unionIconLayout]}
                  resizeMode="cover"
                  source={require("../assets/union4.png")}
                />
              </View>
              <View style={[styles.view4, styles.viewSpaceBlock]}>
                <Text style={[styles.redTables, styles.titleFlexBox]}>
                  Glitter
                </Text>
                <Image
                  style={[styles.unionIcon, styles.unionIconLayout]}
                  resizeMode="cover"
                  source={require("../assets/union5.png")}
                />
              </View>
              <LinearGradient
                style={[styles.lineargradient, styles.viewSpaceBlock]}
                locations={[0, 1]}
                colors={["#6c1b9e", "#ff077e"]}
                useAngle={true}
                angle={-90}
              >
                <Image
                  style={styles.unionIcon4}
                  resizeMode="cover"
                  source={require("../assets/union6.png")}
                />
              </LinearGradient>
            </View>
          </View>
        </View>
      </View>
      <TopNavigationContent
        title="New Years, Holiday Party"
        rightAccessoryDisplay="unset"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formBg: {
    backgroundColor: Color.appColorGradient,
    justifyContent: "center",
  },
  labelLayout: {
    lineHeight: 22,
    fontSize: FontSize.typographyHeadingMedium_size,
  },
  titleFlexBox: {
    textAlign: "left",
    color: Color.labelColorDarkPrimary,
  },
  title2Typo: {
    fontFamily: FontFamily.typographyBodyMediumLight,
    fontWeight: "300",
    textAlign: "left",
    lineHeight: 22,
    fontSize: FontSize.typographyHeadingMedium_size,
  },
  photoIconLayout: {
    height: 91,
    width: 91,
    borderRadius: Border.br_5xs,
  },
  iconsaxlinearclosecircleLayout: {
    height: 24,
    width: 24,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  viewFlexBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: 327,
  },
  form1Border: {
    marginTop: 16,
    paddingVertical: Padding.p_base,
    backgroundColor: Color.gray_700,
    borderWidth: 1,
    borderColor: "#8a8a8a",
    borderStyle: "solid",
    borderRadius: Border.br_5xs,
    paddingHorizontal: Padding.p_5xl,
    width: 327,
  },
  viewSpaceBlock: {
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_81xl,
    alignItems: "center",
    flexDirection: "row",
  },
  unionIconLayout: {
    height: 8,
    width: 8,
    marginLeft: 8,
  },
  bgIcon: {
    left: 0,
    width: 665,
    height: 927,
    top: 0,
    position: "absolute",
  },
  label: {
    textAlign: "center",
    color: Color.labelColorDarkPrimary,
    fontFamily: FontFamily.typographyBodyMediumRegular,
  },
  form: {
    top: 732,
    borderRadius: Border.br_11xl,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 15,
    elevation: 15,
    shadowOpacity: 1,
    height: 40,
    paddingVertical: Padding.p_xs,
    alignItems: "center",
    paddingHorizontal: Padding.p_5xl,
    backgroundColor: Color.appColorGradient,
    flexDirection: "row",
    width: 327,
    left: 24,
    position: "absolute",
  },
  title1: {
    fontSize: FontSize.typographyMediumTitle_size,
    lineHeight: 28,
    fontFamily: FontFamily.textLargeBold,
    fontWeight: "700",
    textAlign: "left",
    alignSelf: "stretch",
  },
  title2: {
    color: Color.primaryAlmostGrey,
    marginTop: 8,
    alignSelf: "stretch",
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    width: 327,
  },
  photoIcon: {
    zIndex: 0,
  },
  photoIcon1: {
    zIndex: 1,
  },
  photoIcon2: {
    zIndex: 2,
  },
  iconsaxlinearclosecircle: {
    left: 67,
    zIndex: 3,
  },
  iconsaxlinearclosecircle1: {
    left: 185,
    zIndex: 4,
  },
  iconsaxlinearclosecircle2: {
    left: 303,
    zIndex: 5,
  },
  view1: {
    marginTop: 24,
  },
  images: {
    marginTop: 24,
  },
  title3: {
    fontFamily: FontFamily.textLargeBold,
    fontWeight: "700",
    textAlign: "left",
    alignSelf: "stretch",
    lineHeight: 22,
    fontSize: FontSize.typographyHeadingMedium_size,
  },
  icon: {
    backgroundColor: Color.dimgray_200,
    width: 21,
    height: 21,
    display: "none",
  },
  label1: {
    marginLeft: 16,
    color: Color.labelColorDarkPrimary,
  },
  form1: {
    alignItems: "center",
    flexDirection: "row",
  },
  nameThisAlbum: {
    marginTop: 32,
  },
  redTables: {
    fontSize: FontSize.size_smi,
    lineHeight: 18,
    fontFamily: FontFamily.typographyBodyMediumRegular,
  },
  unionIcon: {
    marginLeft: 8,
    display: "none",
  },
  view3: {
    borderWidth: 1,
    borderColor: "#8a8a8a",
    borderStyle: "solid",
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_81xl,
  },
  view4: {
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "#8a8a8a",
    borderStyle: "solid",
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_81xl,
  },
  view2: {
    flexDirection: "row",
  },
  unionIcon2: {
    marginLeft: 8,
  },
  view6: {
    backgroundColor: Color.appColorPartyPurple,
  },
  unionIcon4: {
    width: 11,
    height: 11,
  },
  lineargradient: {
    marginLeft: 8,
    alignSelf: "stretch",
    backgroundColor: Color.appColorGradient,
    justifyContent: "center",
  },
  view5: {
    marginTop: 8,
    flexDirection: "row",
  },
  keywords: {
    justifyContent: "center",
  },
  photoAlbumParent: {
    top: 116,
    left: 24,
    position: "absolute",
  },
  publishalbumscreen: {
    backgroundColor: Color.labelColorDarkPrimary,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default PublishAlbumScreen;
