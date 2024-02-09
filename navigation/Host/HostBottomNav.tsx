import React from "react"
import { styles } from "../RootNavigator/styles"
import { Color } from "../../GlobalStyles"
import { PartyIcon, ServicesIcon } from "../../components/Icons"
import { HostMyPartiesStackRoutes } from "../hostMyPartiesStackRoutes"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HostServicesStackNav } from "./HostServicesStackNav"

const BottomTab = createBottomTabNavigator()
export const HostBottomNav: React.FC = (props) => {
    return (
        <BottomTab.Navigator
            screenOptions={{ headerShown: false }}
            tabBarOptions={{
                tabStyle: styles.tabStyle,
                labelStyle: styles.labelStyle,
                activeTintColor: Color.primaryPink,
                inactiveTintColor: Color.gray300,
                showLabel: true,
                // tabBarVisible: false,
                // tabBarStyle: { display: "none" },
                // tabBarHideOnKeyboard: true,
            }}
        >
            <BottomTab.Screen
                name="Services"
                component={HostServicesStackNav}
                options={{
                    tabBarHideOnKeyboard: true,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <ServicesIcon
                                style={
                                    focused
                                        ? styles.activeIcon
                                        : styles.inactiveIcon
                                }
                            />
                        )
                    },
                }}
            />
            <BottomTab.Screen
                name="My Party"
                component={HostMyPartiesStackRoutes}
                options={{
                    tabBarHideOnKeyboard: true,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <PartyIcon
                                style={
                                    focused
                                        ? styles.activeIcon
                                        : styles.inactiveIcon
                                }
                            />
                        )
                    },
                }}
            />
        </BottomTab.Navigator>
    )
}
