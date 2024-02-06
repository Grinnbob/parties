import React, { useState, useEffect } from "react"
import {
    Image,
    StyleSheet,
    View,
    ScrollView,
    ImageBackground,
    FlatList,
    Pressable,
    TextInput,
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import {
    FontSize,
    Color,
    FontFamily,
    Padding,
    Border,
} from "../../GlobalStyles"
import { useNavigation } from "@react-navigation/core"
import HorizontalBar from "../../assets/horizontalbar.svg"
import { HStack, Text } from "native-base"

import MagnifyGlass from "../../assets/magnifyGlassSearch.svg"
import Filter from "../../assets/filter.svg"

const services = [
    {
        id: 1,
        name: "Party Decorations",
        asset: require("../../assets/img4.png"),
    },
    {
        id: 2,
        name: "Food & Beverages",
        asset: require("../../assets/img5.png"),
    },
    { id: 3, name: "Performers", asset: require("../../assets/img6.png") },
    { id: 4, name: "Music", asset: require("../../assets/img7.png") },
    { id: 5, name: "Rentals", asset: require("../../assets/img8.png") },
    {
        id: 6,
        name: "Cleaning Service",
        asset: require("../../assets/img9.png"),
    },
]

const VendorProfileScreen = () => {
    const { navigate, toggleDrawer } = useNavigation()
    const [venue, setVenue] = useState([])

    // const grabVendor = async () => {
    //   const res = await apis.vendor.getAll({ service: "Venue" });
    //   console.log("RES GRAB", res);
    //   setVenue(res.data);
    // };

    // useEffect(() => {
    //   grabVendor();
    // }, []);

    const renderItem = ({ item }) => {
        return (
            <Pressable
                onPress={() => navigate("ServiceDetails", { service: item })}
                style={{
                    width: "50%",
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                }}
            >
                <ImageBackground
                    source={
                        item.asset
                            ? item.asset
                            : require("../../assets/img7.png")
                    }
                    style={{
                        width: "100%",
                        height: 155,
                        margin: 10,
                        padding: 10,
                    }}
                    imageStyle={{ borderRadius: 12 }}
                >
                    <Text
                        style={{
                            color: "#FFF",
                            fontSize: 16,
                            fontWeight: "700",
                            position: "absolute",
                            marginTop: 90,
                            padding: 10,
                        }}
                    >
                        {item.name}
                    </Text>
                </ImageBackground>
            </Pressable>
        )
    }

    return (
        <ScrollView
            style={{ backgroundColor: "#000" }}
            showsVerticalScrollIndicator={false}
        >
            <View
                style={[styles.vendorprofilescreen, styles.progressIconLayout]}
            >
                <ImageBackground
                    style={[
                        styles.vendorprofilescreenChild,
                        styles.topnavigationContentLayout,
                    ]}
                    resizeMode="cover"
                    source={require("../../assets/img3.png")}
                >
                    <Pressable
                        style={{ marginVertical: 70, marginLeft: 30 }}
                        onPress={toggleDrawer}
                        hitSlop={20}
                    >
                        <HorizontalBar />
                    </Pressable>

                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={[
                                styles.manuelsRentals,
                                styles.descriptionTypo,
                            ]}
                        >
                            What Can We Help {"\n"} You With?
                        </Text>
                    </View>
                </ImageBackground>

                <LinearGradient
                    style={styles.vendorDesc}
                    locations={[0, 1]}
                    colors={["#000", "#000"]}
                    useAngle={true}
                    angle={180}
                >
                    <Pressable
                        onPress={() => navigate("HelpSearchScreen")}
                        style={{
                            width: "95%",
                            borderRadius: 100,
                            backgroundColor: "rgba(255, 255, 255, 0.08)",
                            paddingHorizontal: 24,
                            paddingVertical: 12,
                            marginTop: 25,
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <HStack>
                            <MagnifyGlass />
                            <Text
                                fontSize={15}
                                fontWeight={"300"}
                                color={"#8A8A8A"}
                                ml={3}
                            >
                                Search
                            </Text>
                        </HStack>
                        <Filter />
                    </Pressable>
                </LinearGradient>
                <ImageBackground
                    style={styles.bgIcon}
                    resizeMode="cover"
                    source={require("../../assets/bg14.png")}
                >
                    <View style={[styles.title, styles.titleFlexBox]}>
                        <Text style={[styles.title3Typo]}>Services</Text>
                        {/* <Pressable onPress={() => navigate("ServiceDetails")}> */}
                        <Text style={styles.viewAll}>View all</Text>
                        {/* </Pressable> */}
                    </View>
                    <View
                        style={{
                            alignItems: "center",
                            margin: 15,
                            justifyContent: "center",
                        }}
                    >
                        <FlatList
                            data={services}
                            renderItem={renderItem}
                            numColumns={2}
                        />
                    </View>
                    <View style={[styles.title, styles.titleFlexBox]}>
                        <Text style={[styles.title3Typo]}>Venue</Text>
                        <Text style={styles.viewAll}>View all</Text>
                    </View>
                    <View
                        style={{
                            alignItems: "center",
                            margin: 15,
                            justifyContent: "center",
                        }}
                    >
                        {/* <FlatList data={venue} renderItem={renderItem} numColumns={2} /> */}
                    </View>
                </ImageBackground>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    progressIconLayout: {
        width: "100%",
        overflow: "hidden",
    },
    topnavigationContentLayout: {
        width: "100%",
        position: "absolute",
        zIndex: 100,
    },
    viewAll: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: "300",
        color: "rgba(255, 7, 126, 1)",
        textAlign: "right",
    },
    bgIcon: {
        // top: 0,
        // width: "100%",
        // height: "100%",
        // position: "absolute",
    },
    titleFlexBox: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    title3Typo: {
        color: Color.labelColorDarkPrimary,
        fontWeight: "700",
        fontSize: 18,
    },
    descriptionTypo: {
        fontFamily: FontFamily.textLargeBold,
        fontWeight: "700",
        color: Color.labelColorDarkPrimary,
    },
    search: {
        borderRadius: Border.br_81xl,
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        width: 330,
        height: 48,
        paddingVertical: Padding.p_xs,
        paddingHorizontal: Padding.p_5xl,
        shadowOpacity: 1,
        elevation: 16,
        shadowRadius: 16,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        marginTop: 20,
        shadowColor: "rgba(27, 27, 27, 0.16)",
        justifyContent: "space-between",
    },
    vendorprofilescreenChild: {
        height: 400,
        left: 0,
        top: 0,
    },
    title: {
        paddingHorizontal: 30,
    },
    background: {
        width: "100%",
        height: "100%",
    },
    bgIconPosition: {
        left: 0,
        position: "absolute",
    },
    vendorDesc: {
        marginTop: 340,
        borderTopLeftRadius: Border.br_13xl,
        borderTopRightRadius: Border.br_13xl,
        shadowColor: "rgba(27, 27, 27, 0.16)",
        shadowRadius: 16,
        // elevation: 16,
        paddingTop: Padding.p_61xl,
        paddingBottom: Padding.p_5xl,
        backgroundColor: Color.appColorGradient,
        paddingHorizontal: Padding.p_5xl,
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        width: "100%",
        zIndex: 1000,
    },
    manuelsRentals: {
        fontSize: 28,
        lineHeight: 33,
        textAlign: "center",
    },
    vendorprofilescreen: {
        backgroundColor: Color.labelColorLightPrimary,
        overflow: "hidden",
        flex: 1,
    },
})

export default VendorProfileScreen
