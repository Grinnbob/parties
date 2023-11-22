import React from "react";
import { styles } from "../RootNavigator/styles";
import { Color } from "../../GlobalStyles";
import { PartyIcon, ServicesIcon } from "../../components/Icons";
import { HostMyPartiesStackRoutes } from "../hostMyPartiesStackRoutes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HostServicesStackNav } from "./HostServicesStackNav";

const BottomTab = createBottomTabNavigator();
export const HostBottomNav: React.FC = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{ headerShown: false }}
      tabBarOptions={{
        tabStyle: styles.tabStyle,
        labelStyle: styles.labelStyle,
        activeTintColor: Color.primaryPink,
        inactiveTintColor: Color.gray300,
        showLabel: true,
      }}
    >
      <BottomTab.Screen
        name="Services"
        component={HostServicesStackNav}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <ServicesIcon
                style={focused ? styles.activeIcon : styles.inactiveIcon}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="My Party"
        component={HostMyPartiesStackRoutes}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <PartyIcon
                style={focused ? styles.activeIcon : styles.inactiveIcon}
              />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
};
