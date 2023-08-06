import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Progress, Box, Center } from "native-base";

export default ({ value = "" }) => {
  return (
    <Center
      w="100%"
      style={{
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 10,
      }}
    >
      <View
        flexDirection="column"
        width={"100%"}
        style={{ bottom: 3, marginTop: 10 }}
      >
        <Box
          bg={{
            linearGradient: {
              colors: ["#6c1b9e", "#ff077e"],
              start: [0.3, 1],
              end: [1, 0],
            },
          }}
          p="0.5"
          rounded="xl"
          style={{ height: 6, zIndex: 1, top: 6 }}
          w={value}
        ></Box>
        <Box
          bg="white"
          opacity={0.2}
          p="0.5"
          rounded="xl"
          style={{ height: 6, zIndex: -1 }}
          w="100%"
        ></Box>
      </View>
    </Center>
  );
};
