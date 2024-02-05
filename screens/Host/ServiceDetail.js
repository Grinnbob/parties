import React, { useState, useEffect } from "react"
import { Image, StyleSheet, View, Pressable, FlatList } from "react-native"
import { Text } from "native-base"
import { Color } from "../../GlobalStyles"
import { useNavigation } from "@react-navigation/core"
import apis from "../../apis"
import { SearchInput } from "../../components/Input/SearchInput"
import SearchServiceCard from "../../components/SearchServiceCard"
import useDebounce from "../../utils/useDebounce"

// filterSelections = [
//   { id: 1, title: "Latest" },
//   { id: 2, title: "Trending" },
//   { id: 3, title: "Mixologist" },
//   { id: 4, title: "Nearby" },
//   { id: 5, title: "Top Rated" },
// ];

const ServiceDetails = ({ route }) => {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [vendorList, setVendorList] = useState([])
    const [searchText, setSearchText] = useState(route?.params?.search || "")
    const debounceSearchText = useDebounce(searchText)
    const { name, id } = route.params.service || {}

    useEffect(() => {
        const grabAllVendor = async () => {
            try {
                setIsLoading(true)
                const res = await apis.vendor.getSearchResults({
                    search: debounceSearchText,
                    serviceTypeId: id,
                })

                setVendorList(res.data)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        grabAllVendor()
    }, [debounceSearchText, id])

    // useEffect(() => {
    //   switch (selectedFilter) {
    //     case "Latest":
    //       setFilterChoice("Latest");
    //       return;
    //     case "Trending":
    //       setFilterChoice("Trending");
    //       return;
    //     case "Mixologist":
    //       setFilterChoice("Mixologist");
    //       return;
    //     case "Nearby":
    //       setFilterChoice("Nearby");
    //       return;
    //     case "Top Rated":
    //       setFilterChoice("Top Rated");
    //       return;
    //     default:
    //       setFilterChoice("All");
    //       return;
    //   }
    // }, [selectedFilter]);

    const handleSearchTextChange = (text) => {
        setSearchText(text)
    }

    // const renderTag = ({ item }) => {
    //   return (
    //     <GradientPill
    //       title={item.title}
    //       enable={filterChoice === item.title}
    //       onPress={() => setSelectedFilter(item.title)}
    //     />
    //   );
    // };

    return (
        <View style={styles.helpsearchscreen}>
            <Image
                style={styles.bgIcon}
                resizeMode="cover"
                source={require("../../assets/bg8.png")}
            />
            <View style={[styles.alertmodalbg, styles.alertmodalbgLayout]} />
            <View
                style={[styles.topnavigationContent, { paddingHorizontal: 12 }]}
            >
                <Pressable
                    style={styles.backLayout}
                    onPress={() => navigation.pop()}
                >
                    <Image
                        style={styles.vectorIcon}
                        resizeMode="cover"
                        source={require("../../assets/vector14.png")}
                    />
                </Pressable>
                <View style={styles.title2}>
                    <Text style={styles.title3}>{name}</Text>
                </View>
                <View style={{ width: 40, height: 40 }}></View>
            </View>
            <View
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    borderRadius: 100,
                    // marginHorizontal: 10,
                    marginTop: 10,
                    // marginBottom: 20,
                }}
            />
            <SearchInput
                value={searchText}
                onChangeText={handleSearchTextChange}
                containerStyle={{ paddingHorizontal: 24, width: "100%" }}
                loading={isLoading}
            />
            <FlatList
                data={vendorList}
                renderItem={({ item }) => (
                    <SearchServiceCard
                        manuelsRentals={item.name}
                        imgBg={require("../../assets/imgbg2.png")}
                        price={item.price}
                        service={item.service}
                        vendor={item}
                    />
                )}
                contentContainerStyle={{
                    margin: 20,
                    minHeight: "100%",
                }}
                ListEmptyComponent={
                    isLoading ? (
                        <></>
                    ) : (
                        <View style={styles.noResultsContainer}>
                            <Text style={styles.noResultsText}>
                                No results found
                            </Text>
                        </View>
                    )
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    border: {
        marginHorizontal: 13,
        marginVertical: 9,
    },
    backLayout: {
        marginTop: 20,
        marginLeft: 15,
        height: 40,
        width: 40,
    },
    bgIcon: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },
    left: {
        alignItems: "center",
        flexDirection: "row",
    },
    searchTerm: {
        color: "#8A8A8A",
        marginBottom: 5,
        fontWeight: "400",
        fontSize: 14,
        lineHeight: 21,
    },
    vectorIcon: {
        overflow: "hidden",
    },
    title3: {
        fontSize: 18,
        lineHeight: 25,
        fontWeight: "700",
        textAlign: "center",
        color: Color.labelColorDarkPrimary,
    },
    title2: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    topnavigationContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
    },
    helpsearchscreen: {
        backgroundColor: Color.labelColorLightPrimary,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        flex: 1,
    },
    alertmodalbg: {
        backgroundColor: Color.primarySoBlack,
        left: 0,
        top: 0,
        height: "100%",
        overflow: "hidden",
    },
    alertmodalbgLayout: {
        width: "100%",
        position: "absolute",
    },
    noResultsContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    noResultsText: {
        color: Color.gray300,
        marginBottom: 5,
        fontWeight: "400",
        fontSize: 14,
        lineHeight: 21,
    },
})

export default ServiceDetails
