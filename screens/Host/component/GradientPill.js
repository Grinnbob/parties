import React from "react";
import { Pressable } from "react-native";
import { Text } from "native-base";
import LinearGradient from "react-native-linear-gradient";

export default function GradientPill({ title, enable, onPress }) {
  return enable ? (
    <Pressable onPress={onPress}>
      <LinearGradient
        style={{
          height: 34,
          borderWidth: 1,
          borderColor: "#232323",
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 12,
          marginLeft: 8,
        }}
        locations={[0, 1]}
        colors={["#6c1b9e", "#ff077e"]}
        useAngle={true}
        angle={-90}
      >
        <Text fontSize={14} fontWeight={"300"} color={"#FFF"}>
          {title}
        </Text>
      </LinearGradient>
    </Pressable>
  ) : (
    <Pressable
      onPress={onPress}
      style={{
        height: 34,
        borderWidth: 1,
        borderColor: "#232323",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 12,
        marginLeft: 8,
      }}
    >
      <Text fontSize={14} fontWeight={"300"} color={"#8A8A8A"}>
        {title}
      </Text>
    </Pressable>
  );
}
