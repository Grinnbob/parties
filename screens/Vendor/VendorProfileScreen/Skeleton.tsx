import React from "react";

import { Skeleton as RBSkeleton, VStack } from "native-base";
import { Color } from "../../../GlobalStyles";

export const Skeleton = () => {
  return (
    <VStack
      w="100%"
      space={6}
      rounded="md"
      mt={8}
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
      <RBSkeleton.Text lines={1} alignItems="start" px="5" />
      <RBSkeleton mt="3" mb="3" w="100%" height="100" rounded="8" />
      <RBSkeleton mb="3" w="100%" height="100" rounded="8" />
    </VStack>
  );
};
