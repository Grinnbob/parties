import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VendorHomeScreen from "../screens/Vendor/VendorHomeScreen";
import VendorProfileScreen from "../screens/Vendor/VendorProfileScreen";
import AlbumTypeScreen from "../screens/Vendor/Profile/AlbumTypeScreen";
import BottomNavContainer from "../components/navigation/CustomBottomTabBar";
import Notifications from "../screens/Vendor/Notifications";
import ServicePackageScreen from "../screens/ServicePackageScreen";
import HolidayThemeScreen from "../screens/Vendor/Profile/HolidayThemeScreen";
import Quotes from "../screens/Vendor/Quotes";
import Services from "../screens/Vendor/Services";
import PhotoAlbumScreen from "../screens/Vendor/Profile/PhotoAlbumScreen";
import HelpSearchScreen from "../screens/Host/HelpSearchScreen";
// import CameraRollScreen from "../screens/Vendor/Profile/CameraRollScreen";
import EditVendorCameraRoll from "../screens/Vendor/Profile/EditVendorCameraRoll";
import VendorEdit from "../screens/Vendor/VendorEdit";

// const BottomTab = createBottomTabNavigator();

// const TabBar = (props) => {
//   return <BottomNavContainer {...props} />;
// };

const Stack = createNativeStackNavigator();

export default function BottomTabNavigator() {
  return (
    <Stack.Navigator
      // initialRouteName="Dashboard"
      // tabBar={TabBar}
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      {/* <Stack.Screen name="Dashboard" component={DashboardNavigator} /> */}
      {/* <Stack.Screen name="Services" component={ServiceNavigator} />
      <Stack.Screen name="Quotes" component={QuoteNavigator} /> */}
      <Stack.Screen name="Calendar" component={CalendarNavigator} />
      {/* <Stack.Screen
        name="Notifications"
        component={NotificationNavigator}
      /> */}
    </Stack.Navigator>
  );
}

const DashboardStack = createNativeStackNavigator();

function DashboardNavigator() {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name="Dashboard"
        component={VendorHomeScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <DashboardStack.Screen
        name="Help"
        component={HelpSearchScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </DashboardStack.Navigator>
  );
}

const ServiceStack = createNativeStackNavigator();

function ServiceNavigator() {
  return (
    <ServiceStack.Navigator>
      <ServiceStack.Screen
        name="Services"
        component={Services}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </ServiceStack.Navigator>
  );
}

const QuoteStack = createNativeStackNavigator();

function QuoteNavigator() {
  return (
    <QuoteStack.Navigator>
      <QuoteStack.Screen
        name="Quotes"
        component={Quotes}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </QuoteStack.Navigator>
  );
}

const CalendarStack = createNativeStackNavigator();

function CalendarNavigator() {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="Profile"
        component={VendorProfileScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <CalendarStack.Screen
        name="Album"
        component={AlbumTypeScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <CalendarStack.Screen
        name="Edit"
        component={VendorEdit}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <CalendarStack.Screen
        name="CameraEdit"
        component={EditVendorCameraRoll}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </CalendarStack.Navigator>
  );
}

const NotificationStack = createNativeStackNavigator();

function NotificationNavigator() {
  return (
    <NotificationStack.Navigator>
      <NotificationStack.Screen
        name="Notification"
        component={Notifications}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </NotificationStack.Navigator>
  );
}
