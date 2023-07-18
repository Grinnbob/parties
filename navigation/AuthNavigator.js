const Stack = createNativeStackNavigator();
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/Auth/WelcomeScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import PasswordScreen from "../screens/Auth/PasswordScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen";
import VerifyScreen from "../screens/Auth/VerifyScreen";
import AccountSettingScreen from "../screens/Auth/AccountSettingScreen";

const AuthNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="WelcomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PasswordScreen"
        component={PasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerifyScreen"
        component={VerifyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AccountSettingScreen"
        component={AccountSettingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default AuthNav;
