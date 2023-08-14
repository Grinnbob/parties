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
        borderColor: "coolGray.500",
      }}
      _light={{
        borderColor: "coolGray.200",
      }}
    >
      <Skeleton.Text lines={3} alignItems="start" px="5" />
      <Skeleton
        borderWidth={1}
        borderColor="coolGray.200"
        endColor="warmGray.50"
        size="100px"
        mt={20}
        rounded="full"
      />

      <Skeleton mb="3" w="90%" rounded="8" />
      <Skeleton mb="3" w="90%" rounded="8" />
      <Skeleton mb="3" w="90%" rounded="8" />
      <Skeleton mb="3" w="90%" rounded="8" />
      <Skeleton mb="3" w="90%" rounded="8" />
      <Skeleton mb="3" w="90%" h={150} rounded="8" />
      <Skeleton mb="3" w="90%" rounded="8" />
    </VStack>
  );
};
