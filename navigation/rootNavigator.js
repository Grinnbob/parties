import React, { useState, useEffect } from "react";
import { Text, View } from "native-base";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNav from "./AuthNavigator";
import HostNavigator from "./HostNavigator";
import loadApp from "./loadApp";
import useGlobalState from "../stateManagement/hook";
import StateTypes from "../stateManagement/StateTypes";
import VendorDrawerNav from "./vendorDrawerNav";
import VerifyNav from "./VerifyNav";
import VendorCreate from "../screens/Vendor/VendorCreate";
import apis from "../apis";
import layout from "../utils/layout";
import { ImageBackground } from "react-native";
import VendorCameraRoll from "../screens/Vendor/Profile/VendorCameraRoll";
import SearchModal from "../components/Modal/SearchModal";

const Stack = createStackNavigator();

export default (props) => {
  const [token, setToken] = useGlobalState(
    StateTypes.token.key,
    StateTypes.token.default
  );
  const [user, setUser] = useGlobalState(
    StateTypes.user.key,
    StateTypes.user.default
  );
  const [vendor, setVendor] = useGlobalState(
    StateTypes.vendor.key,
    StateTypes.vendor.default
  );
  const [vendorEdit, setVendorEdit] = useState(false);

  useEffect(() => {
    loadApp(setToken, setUser);
  }, []);

  useEffect(() => {
    grabVendor();
  }, [user]);

  const grabVendor = async () => {
    const res = await apis.vendor.getAll({ UserId: user.id });

    setVendor(res.data);
    if (res.length < 1 && user.role === "vendor") {
      setVendorEdit(true);
    } else {
      setVendorEdit(false);
    }
  };

  const vendorCreate = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="VerifyCreate"
          component={VendorCreate}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifyCameraRoll"
          component={VendorCameraRoll}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchModal"
          component={SearchModal}
          options={{ headerShown: false, presentation: "modal" }}
        />
      </Stack.Navigator>
    );
  };

  const selectStack = () => {
    switch (token) {
      case "loading":
        return (
          <View justifyContent={"center"} alignItems={"center"}>
            <ImageBackground
              style={{
                width: layout.window.width,
                height: layout.window.height,
              }}
              resizeMode="cover"
              source={require("../assets/rectangle-2.png")}
            />
          </View>
        );
      case "auth":
        return (
          <Stack.Navigator>
            <Stack.Screen
              name="auth"
              component={AuthNav}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        );
      case "verify":
        return (
          <Stack.Navigator>
            <Stack.Screen
              name="verify"
              component={VerifyNav}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        );
      case "vendor":
        return (
          <Stack.Navigator>
            <Stack.Screen
              name="vendor"
              component={VendorDrawerNav}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        );
      case "host":
        return (
          <Stack.Navigator>
            <Stack.Screen
              name="host"
              component={HostNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        );
      default:
        return (
          <>
            <Text>{token}</Text>
          </>
        );
    }
  };
  return (
    <NavigationContainer theme={DarkTheme}>
      {token !== "auth" && vendorEdit ? vendorCreate() : selectStack()}
    </NavigationContainer>
  );
};
