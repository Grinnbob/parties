import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { MyPartyScreen } from "../screens/MyParty";
import { PartyDetailsScreen } from "../screens/MyParty/PartyDetailsScreen";
import { PartyMessageScreen } from "../screens/MyParty/PartyMessageScreen";

export type VendorQuotesStackParamList = {
  MyPartyScreen: undefined;
  PartyDetailsScreen: undefined;
};

const Stack = createStackNavigator<VendorQuotesStackParamList>();
type Props = BottomTabScreenProps<VendorQuotesStackParamList>;

export const HostMyPartiesStackRoutes: React.FC<Props> = ({
  navigation,
  route,
}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "PartyDetailsScreen") {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MyPartyScreen"
    >
      <Stack.Screen
        name="MyPartyScreen"
        component={MyPartyScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PartyDetailsScreen"
        component={PartyDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PartyMessageScreen"
        component={PartyMessageScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
