import React from "react";

import { Skeleton as RBSkeleton, VStack } from "native-base";
import { Color } from "../../../GlobalStyles";

export const Skeleton = () => {
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
        borderColor: Color.gray300,
      }}
      _light={{
        borderColor: Color.gray300,
      }}
    >
      <RBSkeleton.Text lines={1} alignItems="start" px="5" />
      <RBSkeleton
        borderWidth={1}
        borderColor="#8A8A8A"
        endColor="#8A8A8A"
        size="100px"
        mt={10}
        mb={10}
        rounded="full"
      />

      <RBSkeleton mb="3" w="90%" rounded="8" />
      <RBSkeleton mb="3" w="90%" rounded="8" />
      <RBSkeleton mb="3" w="90%" rounded="8" />
      <RBSkeleton mb="3" w="90%" h={150} rounded="8" />
      <RBSkeleton mb="3" w="90%" rounded="8" />
    </VStack>
  );
};
