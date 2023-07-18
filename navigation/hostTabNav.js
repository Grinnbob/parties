import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Host/HomeScreen";
import ServiceSelectScreen from "../screens/Host/ServiceSelectScreen";
import BottomNavContainer from "../components/navigation/CustomBottomTabBar";
import HelpSearchScreen from "../screens/Host/HelpSearchScreen";
import ServiceDetails from "../screens/Host/ServiceDetail";
import VendorInfo from "../screens/Host/VendorInfo";

// const BottomTab = createBottomTabNavigator();

// const TabBar = (props) => {
//   return <BottomNavContainer {...props} />;
// };

const Stack = createNativeStackNavigator();

export default function BottomTabNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ServiceSelectScreen"
      // tabBar={TabBar}
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name="ServiceSelectScreen" component={HomeNavigator} />
      {/* <Stack.Screen name="Services" component={ServiceNavigator} /> */}
    </Stack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="ServiceSelectScreen"
        component={ServiceSelectScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <HomeStack.Screen
        name="HelpSearchScreen"
        component={HelpSearchScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <HomeStack.Screen
        name="ServiceDetails"
        component={ServiceDetails}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <HomeStack.Screen
        name="VendorInfo"
        component={VendorInfo}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </HomeStack.Navigator>
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
        name="Calendar"
        component={VendorProfileScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <CalendarStack.Screen
        name="Service"
        component={ServicePackageScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <CalendarStack.Screen
        name="Album"
        component={AlbumTypeScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <CalendarStack.Screen
        name="Holiday"
        component={HolidayThemeScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <CalendarStack.Screen
        name="Photo"
        component={PhotoAlbumScreen}
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
