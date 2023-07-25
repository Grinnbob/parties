import { VStack } from "native-base";
import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  ImageBackground,
  View,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import TopNavigationContent from "../../../components/TopNavigationContent";
import {
  Padding,
  Border,
  Color,
  FontFamily,
  FontSize,
} from "../../../GlobalStyles";

import AlbumSelect from "./component/AlbumSelect";

const selections = [
  { id: 1, title: "Favorites", asset: require("../../../assets/1.png") },
  {
    id: 2,
    title: "Holiday Themes",
    asset: require("../../../assets/2.png"),
  },
  { id: 3, title: "Food Ideas", asset: require("../../../assets/11.png") },
  {
    id: 4,
    title: "Top Rated Parties",
    asset: require("../../../assets/21.png"),
  },
  {
    id: 5,
    title: "Bachelor Party",
    asset: require("../../../assets/12.png"),
  },
  {
    id: 6,
    title: "Bachelorette Party",
    asset: require("../../../assets/22.png"),
  },
  {
    id: 7,
    title: "Birthday Parties",
    asset: require("../../../assets/13.png"),
  },
  { id: 8, title: "Anniversary", asset: require("../../../assets/23.png") },
  {
    id: 9,
    title: "Gender Reveal",
    asset: require("../../../assets/14.png"),
  },
  { id: 10, title: "Retirement", asset: require("../../../assets/24.png") },
];

const renderItem = ({ item }) => {
  return <AlbumSelect title={item.title} asset={item.asset} />;
};

const AlbumTypeScreen = ({ navigation }) => {
  return (
    <View style={styles.albumtypescreen}>
      <ImageBackground
        style={[styles.background, styles.bgIconPosition]}
        resizeMode="cover"
        source={require("../../../assets/bg16.png")}
      />
      <VStack paddingLeft={5} paddingTop={10}>
        <TopNavigationContent
          title="What kind of album this is"
          rightAccessoryDisplay="none"
          LeftComponent={() => navigation.navigate("Profile")}
        />
      </VStack>

      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{
            paddingBottom: 220,
          }}
          data={selections}
          numColumns={2}
          keyExtractor={(item, index) => item.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title1FlexBox: {
    textAlign: "center",
    color: Color.labelColorDarkPrimary,
  },
  bgIcon: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  favorites: {
    marginTop: 8,
    fontFamily: FontFamily.typographyBodySmallBold,
    fontWeight: "700",
    fontSize: FontSize.textLargeBold_size,
    textAlign: "center",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  bgIconPosition: {
    left: 0,
    position: "absolute",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  albumtypescreen: {
    width: "100%",
    overflow: "hidden",
    flex: 1,
  },
});

export default AlbumTypeScreen;
