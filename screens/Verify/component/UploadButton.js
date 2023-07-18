import { Input, Button, Box, Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";

export default ({}) => {
  const [show, setShow] = useState(false);

  const handleClick = () => console.log("HOT");

  return (
    <Box alignItems="center">
      <Input
        // type={show ? "text" : "Service cover image"}
        w={327}
        py="0"
        borderRadius={8}
        borderColor={"rgba(255, 255, 255, 0.2)"}
        InputRightElement={
          <Button
            size="xs"
            w={79}
            h={37}
            borderRadius={8}
            backgroundColor={"#6C1B9E"}
            margin={2}
            onPress={handleClick}
          >
            <Text
              color="#FFFFFF"
              fontWeight="300"
              fontSize={14}
              lineHeight={21}
            >
              Select
            </Text>
          </Button>
        }
        placeholder="Service cover image"
        placeholderTextColor={"#8A8A8A"}
        fontSize={14}
      />
    </Box>
  );
};
