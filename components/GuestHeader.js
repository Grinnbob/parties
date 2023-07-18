import React from "react";
// import {Box, IconButton, StatusBar, View, Text} from 'native-base';
import { View, Text, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default ({ subTitle }) => {
  const navigation = useNavigation();
  const onLeftPress = () => {
    return navigation.canGoBack() ? navigation.goBack() : null;
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Box
        safeAreaTop
        bg="transparent"
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        {/* <IconButton
          borderRadius={110}
          size={5}
          onPress={onLeftPress}
          icon={<AntDesign name="arrowleft" size={22} color="#FFF" />}
        /> */}
        <Text color="#FFF" fontSize={18} fontWeight="700">
          {subTitle}
        </Text>
        <View style={{ width: 30, height: 30 }}></View>
      </Box>
    </>
  );
};
