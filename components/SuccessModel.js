import * as React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles"

const SuccessModel = () => {
    return (
        <View style={styles.checkParent}>
            <Image
                style={styles.checkIcon}
                resizeMode="cover"
                source={require("../assets/check1.png")}
            />
            <View style={styles.successfulyUploadedWrapper}>
                <Text style={styles.successfulyUploaded}>
                    Successfuly Uploaded
                </Text>
            </View>
            <Image
                style={styles.iconsaxlinearclosecircle}
                resizeMode="cover"
                source={require("../assets/iconsaxlinearclosecircle.png")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    checkIcon: {
        width: 64,
        height: 64,
        zIndex: 0,
    },
    successfulyUploaded: {
        fontSize: FontSize.typographyMediumTitle_size,
        lineHeight: 30,
        fontFamily: FontFamily.sFProDisplayRegular,
        color: Color.labelColorDarkPrimary,
        textAlign: "center",
        width: 279,
    },
    successfulyUploadedWrapper: {
        zIndex: 1,
        marginTop: 24,
    },
    iconsaxlinearclosecircle: {
        position: "absolute",
        top: 16,
        left: 287,
        width: 24,
        height: 24,
        overflow: "hidden",
        zIndex: 2,
    },
    checkParent: {
        borderRadius: Border.br_xl,
        backgroundColor: Color.gray_200,
        shadowColor: "rgba(27, 27, 27, 0.16)",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowRadius: 16,
        elevation: 16,
        shadowOpacity: 1,
        borderStyle: "solid",
        borderColor: "#fff",
        borderWidth: 1,
        width: 327,
        height: 256,
        padding: Padding.p_5xl,
        alignItems: "center",
        justifyContent: "center",
    },
})

export default SuccessModel
