import React, { useMemo, useEffect, useState } from "react"
import {
    Keyboard,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles"

const getStyleValue = (key, value) => {
    if (value === undefined) return
    return { [key]: value === "unset" ? undefined : value }
}
const MidGradientButton = ({
    onPress,
    label,
    formPosition,
    formTop,
    formLeft,
    formBackgroundColor,
    formMarginTop,
    labelColor,
    disabled,
    isLoading,
    loadingText,
    width,
}) => {
    const [isKeyboadVisible, setIsKeyboadVisible] = useState(false)

    const formStyle = useMemo(() => {
        return {
            ...getStyleValue("position", formPosition),
            ...getStyleValue("top", formTop),
            ...getStyleValue("left", formLeft),
            ...getStyleValue("backgroundColor", formBackgroundColor),
            ...getStyleValue("marginTop", formMarginTop),
            ...getStyleValue("width", width),
        }
    }, [
        formPosition,
        formTop,
        formLeft,
        formBackgroundColor,
        formMarginTop,
        width,
    ])

    const labelStyle = useMemo(() => {
        return {
            ...getStyleValue("color", labelColor),
        }
    }, [labelColor])

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", () => setIsKeyboadVisible(true))
        Keyboard.addListener("keyboardDidHide", () =>
            setIsKeyboadVisible(false)
        )
    }, [])

    return !isKeyboadVisible ? (
        <LinearGradient
            style={[styles.form, formStyle]}
            locations={[0, 1]}
            colors={
                disabled
                    ? ["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.1)"]
                    : ["#6c1b9e", "#ff077e"]
            }
            useAngle={true}
            angle={-90}
        >
            <TouchableOpacity
                style={styles.touchableopacity}
                activeOpacity={0.2}
                onPress={onPress}
                disabled={disabled}
                isLoading={isLoading}
            >
                {isLoading ? (
                    <>
                        <ActivityIndicator size="small" color="#FFF" />
                        {loadingText && (
                            <Text style={[styles.label, styles.loadingText]}>
                                {loadingText}
                            </Text>
                        )}
                    </>
                ) : (
                    <Text style={[styles.label, labelStyle]}>{label}</Text>
                )}
            </TouchableOpacity>
        </LinearGradient>
    ) : (
        <></>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: FontSize.typographyHeadingMedium_size,
        lineHeight: 20,
        fontFamily: FontFamily.typographyBodyMediumRegular,
        color: Color.labelColorDarkPrimary,
        textAlign: "center",
    },
    touchableopacity: {
        borderRadius: Border.br_11xl,
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 15,
        elevation: 15,
        shadowOpacity: 1,
        width: "100%",
        height: "100%",
        flexDirection: "row",
        paddingHorizontal: Padding.p_5xl,
        // paddingVertical: Padding.p_xs,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Color.appColorGradient,
    },
    form: {
        width: 327,
        height: 40,
        borderRadius: 30,
    },
    loadingText: {
        marginLeft: 16,
    },
})

export default MidGradientButton
