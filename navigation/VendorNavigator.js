import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import VendorDrawerNav from "./VendorDrawerNav";
const Stack = createStackNavigator();

const VendorNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VendorDrawerNav"
        component={VendorDrawerNav}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default VendorNavigator;
