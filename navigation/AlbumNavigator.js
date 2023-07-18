import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HolidayThemeScreen from "../screens/Vendor/Profile/HolidayThemeScreen";
import PhotoAlbumScreen from "../screens/Vendor/Profile/PhotoAlbumScreen";
import CameraRollScreen from "../screens/Vendor/Profile/CameraRollScreen";
import ServicePackageScreen from "../screens/ServicePackageScreen";

const AlbumStack = createStackNavigator();

export default function AlbumNavigator() {
  return (
    <AlbumStack.Navigator>
      <AlbumStack.Screen
        name="Holiday"
        component={HolidayThemeScreen}
        options={{ headerShown: false }}
      />
      <AlbumStack.Screen
        name="Photo"
        component={PhotoAlbumScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <AlbumStack.Screen
        name="Camera"
        component={CameraRollScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <AlbumStack.Screen
        name="Service"
        component={ServicePackageScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </AlbumStack.Navigator>
  );
}
