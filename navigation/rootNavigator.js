import React, { useEffect } from "react";
import { Text, View } from "native-base";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNav from "./AuthNavigator";
import HostNavigator from "./HostNavigator";
// import VendorNavigator from "./VendorNavigator";
import loadApp from "./loadApp";
import useGlobalState from "../stateManagement/hook";
import StateTypes from "../stateManagement/StateTypes";
// import Drawer from "./drawerNav";
import VendorDrawerNav from "./VendorDrawerNav";
import VerifyNav from "./VerifyNav";

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
  useEffect(() => {
    loadApp(setToken, setUser);
  }, []);

  const selectStack = () => {
    switch (token) {
      case "loading":
        return (
          <View justifyContent={"center"} alignItems={"center"} marginTop={40}>
            <Text>load</Text>
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
    <NavigationContainer theme={DarkTheme}>{selectStack()}</NavigationContainer>
  );
};
