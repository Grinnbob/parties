import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import EnterPhone from "../screens/Verify/EnterPhone";
import Verify from "../screens/Verify/Verify";
import OnboardScreen from "../screens/Verify/OnboardScreen";
import OnboardSelectScreen from "../screens/Verify/Host/OnboardSelectScreen";
import OnboardHolidaySelect from "../screens/Verify/Host/OnboardHolidaySelect";
import { VendorEdit } from "../screens/Vendor/VendorEdit";
import VendorCameraRoll from "../screens/Vendor/Profile/VendorCameraRoll";
import VendorReadySell from "../screens/Verify/Vendor/VendorReadySell";
import { ServicePackageScreen } from "../screens/ServicePackageScreen";
import VendorCreateCameraRoll from "../screens/Vendor/Profile/VendorCreateCameraRoll";
import SearchOnboardModal from "../components/Modal/SearchOnboardModal";
import WelcomeScreen from "../screens/Auth/WelcomeScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen";
import PasswordScreen from "../screens/Auth/PasswordScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import VerifyScreen from "../screens/Auth/VerifyScreen";
import AccountSettingScreen from "../screens/Auth/AccountSettingScreen";
import AlbumTypeScreen from "../screens/Vendor/Profile/AlbumTypeScreen";
import AlbumNavigator from "./AlbumNavigator";

const Stack = createStackNavigator();
export default (props) => {
  return (
    <Stack.Navigator initialRouteName="EnterPhone">
      {/* <Stack.Screen
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
      /> */}
      <Stack.Screen
        name="EnterPhone"
        component={EnterPhone}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Verify"
        component={Verify}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OnboardScreen"
        component={OnboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OnboardSelectScreen"
        component={OnboardSelectScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OnboardHolidaySelect"
        component={OnboardHolidaySelect}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorCreate"
        component={VendorEdit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorCamera"
        component={VendorCameraRoll}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorCreateCamera"
        component={VendorCreateCameraRoll}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorReadySell"
        component={VendorReadySell}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Service"
        component={ServicePackageScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="SearchOnboardModal"
        component={SearchOnboardModal}
        options={{ headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen
        name="CameraEdit"
        component={VendorCameraRoll}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Album"
        component={AlbumTypeScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="AlbumNavigator"
        component={AlbumNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
