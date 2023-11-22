import React from "react";
import { EventMessageScreen, EventScreen } from "../screens/Event";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type VendorQuotesStackParamList = {
  Event: undefined;
  EventMessages: undefined;
};

const Stack = createStackNavigator<VendorQuotesStackParamList>();
type Props = BottomTabScreenProps<VendorQuotesStackParamList>;

export const VendorQuotesStackRoutes: React.FC<Props> = ({
  navigation,
  route,
}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "EventMessages") {
      console.log("hit");
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Event"
    >
      <Stack.Screen
        name="Event"
        component={EventScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EventMessages"
        component={EventMessageScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
