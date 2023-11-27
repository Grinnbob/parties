import React from "react";
import { EventMessageScreen, EventScreen } from "../screens/Quote";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { AllJobsScreen } from "../screens/Quote";

export type VendorQuotesStackParamList = {
  AllJobsScreen: undefined;
  EventScreen: undefined;
  EventMessageScreen: undefined;
};

const Stack = createStackNavigator<VendorQuotesStackParamList>();
type Props = BottomTabScreenProps<VendorQuotesStackParamList>;

export const VendorQuotesStackRoutes: React.FC<Props> = ({
  navigation,
  route,
}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "EventScreen" || routeName === "EventMessageScreen") {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AllJobsScreen"
    >
      <Stack.Screen
        name="AllJobsScreen"
        component={AllJobsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EventScreen"
        component={EventScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EventMessageScreen"
        component={EventMessageScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
