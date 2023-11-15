import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";

import MidGradientButton from "../../../components/MidGradientButton";
import {
  FontFamily,
  FontSize,
  Color,
  Padding,
  Border,
} from "../../../GlobalStyles";
import { useToast } from "native-base";
import SelectTagLayout from "../../../components/Onboard/SelectTagLayout";
import Christmas from "../../../assets/onboard/christmas.svg";
import Fourth from "../../../assets/onboard/fourth.svg";
import Hat from "../../../assets/onboard/hat.svg";
import loadApp from "../../../navigation/loadApp";
import useGlobalState from "../../../stateManagement/hook";
import StateTypes from "../../../stateManagement/StateTypes";
import apis from "../../../apis";
import { GhostButton } from "../../../components/GhostButton";
import BackButton from "../../../components/navigation/BackButton";

const selections = [
  {
    id: 10,
    title: "Christmas",
    asset: <Christmas />,
  },
  {
    id: 11,
    title: "Fourth of July",
    asset: <Fourth />,
  },
  {
    id: 12,
    title: "St. Patrick Day",
    asset: <Hat />,
  },
];

const OnboardHolidaySelect = () => {
  const toast = useToast();
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(false);

  const loadMainApp = async () => {
    setIsAppLoading(true);
    await loadApp(setToken, setUser);
    setIsAppLoading(false);
    setSelectedTiles(StateTypes.selectedTiles.default);
  };

  const [token, setToken] = useGlobalState(
    StateTypes.token.key,
    StateTypes.token.default
  );
  const [user, setUser] = useGlobalState(
    StateTypes.user.key,
    StateTypes.user.default
  );

  const [selectedTiles, setSelectedTiles] = useGlobalState(
    StateTypes.selectedTiles.key,
    StateTypes.selectedTiles.default
  );

  const handleNext = async () => {
    try {
      setIsLoading(true);
      console.log("tags---", tags);
      const res = await apis.joinUserCategory.createMulti({
        UserId: user.id,
        tags: tags.map((item) => {
          return {
            id: item.id,
            title: item.title,
          };
        }),
      });

      if (res && res.success === false) {
        toast.show({
          placement: "top",
          description: res.message,
        });
        setIsLoading(false);
      }
      if (res && res.success) {
        await loadApp(setToken, setUser);
        setIsLoading(false);
        setSelectedTiles(StateTypes.selectedTiles.default);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTags(selectedTiles);
  }, [selectedTiles]);

  return (
    <View style={[styles.onboardselectscreen, styles.alertmodalbgLayout1]}>
      <View style={[styles.alertmodalbg, styles.alertmodalbgLayout]} />
      {/* <Image
        style={styles.thumbIcon}
        resizeMode="cover"
        source={require("../../assets/thumb.png")}
      /> */}
      <View style={{ flex: 1, justifyContent: "space-around" }}>
        <View>
          <View style={styles.title2}>
            <BackButton />
            <Text style={[styles.title3, styles.titleClr]}>
              <Text style={styles.party}>PARTY</Text>
              <Text style={styles.text}>{` `}</Text>
              <Text style={styles.favor}>FAVOR</Text>
            </Text>
            <View style={styles.hidden} />
          </View>
          <View style={styles.divider}></View>
          <View style={styles.title}>
            <Text style={[styles.title1, styles.titleClr]}>
              What kind of Holidays do you celebrate?
            </Text>
          </View>
          <ScrollView style={{ minHeight: "60%" }}>
            <View style={[styles.container, styles.buttonsPosition]}>
              <SelectTagLayout data={selections} />
            </View>
          </ScrollView>
        </View>
        <View style={styles.buttons}>
          <MidGradientButton
            onPress={handleNext}
            isLoading={isLoading}
            label="Confirm Choices"
            formPosition="unset"
            formTop="unset"
            formLeft="unset"
            formBackgroundColor="unset"
            formMarginTop="unset"
            labelColor="#fff"
          />
          <View style={styles.form}>
            <GhostButton onPress={loadMainApp} isLoading={isAppLoading}>
              <Text style={[styles.skip, styles.skipTypo]}>Skip</Text>
            </GhostButton>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  alertmodalbgLayout1: {
    overflow: "hidden",
    height: "100%",
  },
  bgIconPosition: {
    top: 0,
    left: 0,
  },
  alertmodalbgLayout: {
    width: "100%",
    position: "absolute",
  },
  buttonsPosition: {
    width: "100%",
    alignItems: "center",
  },
  skipTypo: {
    fontFamily: FontFamily.typographyBodyMediumRegular,
    lineHeight: 15,
    fontSize: FontSize.typographyHeadingMedium_size,
  },
  titleClr: {
    color: Color.labelColorDarkPrimary,
    textAlign: "center",
  },
  accessoryPosition: {
    paddingBottom: Padding.p_4xs,
    paddingTop: Padding.p_4xs,
    width: 130,
    display: "none",
    height: 42,
    marginTop: -21,
    alignItems: "center",
    flexDirection: "row",
  },
  backIconLayout: {
    width: 40,
    marginLeft: 5,
    height: 40,
  },
  alertmodalbg: {
    backgroundColor: Color.labelColorLightPrimary,
    left: 0,
    top: 0,
    overflow: "hidden",
    height: "100%",
  },
  skip: {
    color: Color.primaryAlmostGrey,
    textAlign: "center",
  },
  form: {
    borderRadius: Border.br_11xl,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 15,
    elevation: 15,
    shadowOpacity: 1,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_xs,
    justifyContent: "center",
    height: 40,
    alignItems: "center",
    flexDirection: "row",
    width: 327,
  },
  buttons: {
    alignItems: "center",
  },
  party01: {
    flexDirection: "row",
    overflow: "hidden",
  },
  container: {
    marginTop: 30,
  },
  thumbIcon: {
    top: 163,
    left: 110,
    width: 24,
    height: 24,
    position: "absolute",
  },
  title1: {
    fontFamily: FontFamily.typographyBodyMediumRegular,
    lineHeight: 22,
    fontSize: FontSize.typographyHeadingMedium_size,
  },
  title: {
    alignItems: "center",
    marginTop: 20,
  },
  leftTitle: {
    letterSpacing: 0,
    lineHeight: 22,
    fontFamily: FontFamily.bodyRegular,
    color: Color.defaultSystemBlueLight,
    textAlign: "left",
    fontSize: FontSize.textLargeBold_size,
    display: "none",
    alignItems: "center",
    flex: 1,
  },
  iconsaxlineararrowleft2: {
    width: 18,
    marginLeft: 5,
    display: "none",
    height: 24,
    overflow: "hidden",
  },
  backIcon: {
    display: "none",
  },
  leftAccessory: {
    paddingLeft: Padding.p_base,
    paddingRight: Padding.p_4xs,
    display: "none",
    left: 0,
  },
  party: {
    fontWeight: "700",
    fontFamily: FontFamily.dMSansBold,
  },
  text: {
    fontWeight: "500",
    fontFamily: FontFamily.dMSansMedium,
  },
  favor: {
    fontFamily: FontFamily.dMSansRegular,
  },
  title3: {
    letterSpacing: 2,
    fontSize: FontSize.textLargeBold_size,
  },
  title2: {
    marginTop: 30,
    padding: Padding.p_4xs,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  divider: {
    borderStyle: "solid",
    borderColor: "rgba(77, 77, 77, 0.5)",
    borderBottomWidth: 1,
  },
  onboardselectscreen: {
    backgroundColor: Color.labelColorDarkPrimary,
    width: "100%",
    flex: 1,
  },
  hidden: {
    width: 19,
  },
});

export default OnboardHolidaySelect;
