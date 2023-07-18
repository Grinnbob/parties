import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  FlatList,
  View,
  Pressable,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: 1,
    name: "Sonny’s First Ever Birthday Extravaganza!",
    location: "Huntington Beach. CA",
    date: "Jan 30, 2023",
    time: "8:00 PM",
  },
  {
    id: 2,
    name: "Sonny’s First Ever Birthday Extravaganza!",
    location: "Huntington Beach. CA",
    date: "Jan 30, 2023",
    time: "8:00 PM",
  },
  {
    id: 3,
    name: "Sonny’s First Ever Birthday Extravaganza!",
    location: "Huntington Beach. CA",
    date: "Jan 30, 2023",
    time: "8:00 PM",
  },
  {
    id: 4,
    name: "Sonny’s First Ever Birthday Extravaganza!",
    location: "Huntington Beach. CA",
    date: "Jan 30, 2023",
    time: "8:00 PM",
  },
];

const renderItem = () => {
  return (
    <View
      style={{
        width: 256,
        height: 288,
        borderRadius: 16,
        padding: 16,
        opacity: 20,
        alignItems: "center",
        backgroundColor: "lightgrey",
        margin: 5,
      }}
    >
      <View
        style={{
          width: 224,
          height: 150,
          borderRadius: 8,
          backgroundColor: "grey",
        }}
      ></View>
    </View>
  );
};

const renderTag = () => {
  return (
    <View
      style={{
        width: 57,
        height: 36,
        borderRadius: 100,
        backgroundColor: "lightgrey",
        alignItems: "flex-start",
        margin: 5,
      }}
    ></View>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <ImageBackground
        source={require("../../assets/rectangle-2.png")}
        resizeMode="cover"
      >
        <View style={{ height: 300, width: "100%" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 50,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Pressable onPress={() => navigation.navigate("Setting")}>
                <Image
                  resizeMode="cover"
                  source={require("../../assets/iconsaxlinearhambergermenu1.png")}
                  style={{
                    width: 20,
                    height: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </Pressable>
              <View
                style={{
                  width: 20,
                  height: 20,
                }}
              ></View>
            </View>
            <View>
              <Text style={styles.title}>
                Party <Text style={{ fontWeight: "400" }}>Favor</Text>
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Pressable>
                <Image
                  resizeMode="cover"
                  source={require("../../assets/cart.png")}
                  style={{
                    width: 20,
                    height: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </Pressable>
              <Pressable>
                <Image
                  resizeMode="cover"
                  source={require("../../assets/magnifyGlass.png")}
                  style={{
                    width: 20,
                    height: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    left: 10,
                  }}
                />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            resizeMode="cover"
            source={require("../../assets/LetsParty.png")}
            style={{ width: 282, height: 80, bottom: 40 }}
          ></Image>
        </View>
      </ImageBackground>
      <ScrollView
        style={{
          backgroundColor: "#000",
        }}
      >
        <View style={styles.curvedContainer}>
          <View style={styles.label}>
            <Text style={styles.labeltitle}>Your Parties</Text>
            <TouchableOpacity>
              <Text style={styles.labelview}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList renderItem={renderItem} data={data} horizontal={true} />
        </View>
        <View style={styles.container}>
          <View style={styles.label}>
            <Text style={styles.labeltitle}>Nearby Events</Text>
            <TouchableOpacity>
              <Text style={styles.labelview}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList renderItem={renderItem} data={data} horizontal={true} />
        </View>
        <View style={styles.container}>
          <View style={styles.label}>
            <Text style={styles.labeltitle}>Services and Venues</Text>
            <TouchableOpacity>
              <Text style={styles.labelview}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList renderItem={renderTag} data={data} horizontal={true} />
          <FlatList renderItem={renderItem} data={data} horizontal={true} />
        </View>
        <View style={styles.container}>
          <View style={styles.label}>
            <Text style={styles.labeltitle}>Trending Party Inspirations</Text>
            <TouchableOpacity>
              <Text style={styles.labelview}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList renderItem={renderItem} data={data} horizontal={true} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imgIconLayout: {
    width: "100%",
    position: "absolute",
  },
  curvedContainer: {
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopEndRadius: 24,
    backgroundColor: "#000",
    // bottom: 40,
    alignItems: "center",
  },
  container: {
    padding: 20,
    backgroundColor: "#000",
    // alignItems: "center",
  },
  label: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
  },
  labeltitle: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 18,
  },
  labelview: {
    color: "#FF077E",
    fontSize: 14,
  },
  title: {
    color: "#FFF",
    fontSize: 21,
    fontWeight: "700",
  },
});

export default HomeScreen;
