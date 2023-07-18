import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import EnterPhone from "../screens/Verify/EnterPhone";
import Verify from "../screens/Verify/Verify";
import OnboardScreen from "../screens/Verify/OnboardScreen";
import OnboardSelectScreen from "../screens/Verify/Host/OnboardSelectScreen";
import OnboardHolidaySelect from "../screens/Verify/Host/OnboardHolidaySelect";
import VendorCreate from "../screens/Verify/Vendor/VendorCreate";
import VendorReadySell from "../screens/Verify/Vendor/VendorReadySell";
import ServicePackageScreen from "../screens/Verify/Vendor/ServicePackage";

const Stack = createStackNavigator();
export default (props) => {
  return (
    <Stack.Navigator>
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
        component={VendorCreate}
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
    </Stack.Navigator>
  );
};
