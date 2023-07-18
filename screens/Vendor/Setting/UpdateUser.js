import React, { useEffect, useState } from "react";
import { Text, Divider, Pressable, VStack, HStack } from "native-base";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import StateTypes from "../../../stateManagement/StateTypes";
import useGlobalState from "../../../stateManagement/hook";
import MidGradientButton from "../../../components/MidGradientButton";
import TopNavigationContent from "../../../components/TopNavigationContent";
import Email from "../../../assets/email.svg";
import Person from "../../../assets/onboard/profilecircle.svg";
import Mobile from "../../../assets/mobile.svg";
import LabelInput from "../../../components/Input/LabelInput";
import apis from "../../../apis";

function formatPhoneNumber(value) {
  var cleaned = ("" + value).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return null;
}

export default ({ route, navigation }) => {
  const [user, setUser] = useGlobalState(
    StateTypes.user.key,
    StateTypes.user.default
  );
  const [firstName, setFirstName] = useState(user.firstName || " ");
  const [lastName, setLastName] = useState(user.lastName || " ");
  const [email, setEmail] = useState(user.email || " ");
  const [phone, setPhone] = useState(user.phoneNumber || " ");

  const handleUpdate = () => {
    navigation.navigate("EnterPhone", {
      updateInfo: { firstName, lastName },
    });
  };

  const handlePhone = () => {
    navigation.navigate("EnterPhone");
  };

  const getUser = async () => {
    try {
      const getUserRes = await apis.user.getSelf();
      setFirstName(getUserRes.data.firstName);
      setLastName(getUserRes.data.lastName);
      setPhone(getUserRes.data.phoneNumber);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (route) {
      getUser();
    }
  }, [route]);

  return (
    <>
      <Image
        style={[styles.background, styles.bgIconPosition]}
        resizeMode="cover"
        source={require("../../../assets/bg16.png")}
      />
      <View style={{ width: "100%", height: 20 }}></View>
      <TopNavigationContent
        title={"Account Setting"}
        backStyle={{ marginLeft: 20 }}
        LeftComponent={() => navigation.navigate("EditAccount")}
      />
      <Divider backgroundColor={"rgba(255, 255, 255, 0.2)"}></Divider>
      <View
        style={{
          justifyContent: "space-between",
          height: "80%",
        }}
      >
        <View style={{ alignItems: "center", marginTop: 25 }}>
          <Text fontWeight="300" lineHeight={22} fontSize={16} color="#FFF">
            Change your phone number or name
          </Text>

          <View
            style={{
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <VStack my={2} width="90%">
              <LabelInput
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
                returnKeyType="default"
                blurOnSubmit={true}
                variant="underlined"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder={"First Name"}
                LeftComponent={<Person />}
                color="#FFF"
              />
            </VStack>
            <VStack my={2} width="90%">
              <LabelInput
                value={lastName}
                onChangeText={(text) => setLastName(text)}
                returnKeyType="default"
                blurOnSubmit={true}
                variant="underlined"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder={"Last Name"}
                LeftComponent={<View style={{ width: 21 }} />}
                color="#FFF"
              />
            </VStack>
          </View>
          <VStack my="2" width="90%">
            <HStack
              alignItems={"center"}
              borderBottomWidth={1}
              borderBottomColor={"#8A8A8A"}
              width={"100%"}
              paddingVertical={10}
            >
              <Email />
              <Text ml={7} color={"#FFF"} fontWeight={"700"}>
                {email}
              </Text>
            </HStack>
          </VStack>
          <VStack my="2" width="90%">
            <Pressable onPress={handlePhone}>
              <HStack
                alignItems={"center"}
                borderBottomWidth={1}
                borderBottomColor={"#8A8A8A"}
                width={"100%"}
                paddingVertical={10}
              >
                <Mobile />
                <Text ml={7} color={"#FFF"} fontWeight={"700"}>
                  {formatPhoneNumber(phone)}
                </Text>
              </HStack>
            </Pressable>
          </VStack>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <MidGradientButton
            onPress={handleUpdate}
            label="Next"
            disabled={!firstName && !lastName}
            formBackgroundColor="rgba(255, 255, 255, 0.1)"
            formMarginTop="unset"
            labelColor="#FFF"
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  bgIconPosition: {
    position: "absolute",
  },
});
