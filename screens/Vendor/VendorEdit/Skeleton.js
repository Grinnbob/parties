import React from "react";

import { Progress, Skeleton, VStack } from "native-base";

export default ({}) => {
  return (
    <VStack
      w="100%"
      maxW="400"
      space={6}
      rounded="md"
      mt={50}
      alignItems="center"
      justifyContent={"center"}
      _dark={{
        borderColor: "#8A8A8A",
      }}
      _light={{
        borderColor: "#8A8A8A",
      }}
    >
      <Skeleton.Text lines={1} alignItems="start" px="5" />
      <Skeleton
        borderWidth={1}
        borderColor="#8A8A8A"
        endColor="#8A8A8A"
        size="100px"
        mt={10}
        mb={10}
        rounded="full"
      />

      <Skeleton mb="3" w="90%" rounded="8" />
      <Skeleton mb="3" w="90%" rounded="8" />
      <Skeleton mb="3" w="90%" rounded="8" />
      <Skeleton mb="3" w="90%" h={150} rounded="8" />
      <Skeleton mb="3" w="90%" rounded="8" />
    </VStack>
  );
};
