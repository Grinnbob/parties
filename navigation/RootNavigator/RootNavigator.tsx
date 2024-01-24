import React, { useState, useEffect } from "react";
import { Text, View } from "native-base";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNav from "../AuthNavigator";
import loadApp from "../loadApp";
import useGlobalState from "../../stateManagement/hook";
import StateTypes from "../../stateManagement/StateTypes";
import VendorDrawerNav from "../vendorDrawerNav";
import VerifyNav from "../VerifyNav";
import { VendorEdit } from "../../screens/Vendor/VendorEdit";
import apis from "../../apis";
import layout from "../../utils/layout";
import { ImageBackground } from "react-native";
import VendorCameraRoll from "../../screens/Vendor/Profile/VendorCameraRoll";
import { VendorQuotesStackRoutes } from "../vendorQuotesStackRoutes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DashboardIcon } from "../../components/Icons/DashboardIcon";
import { QuotesInactiveIcon } from "../../components/Icons";
import { Color } from "../../GlobalStyles";
import { styles } from "./styles";
import { HostBottomNav } from "../Host/HostBottomNav";
import { vendorProfileAtom } from "../../stateManagement";
import AlbumTypeScreen from "../../screens/Vendor/Profile/AlbumTypeScreen";
import { useRecoilState } from "recoil";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export const RootNavigator: React.FC = () => {
  const [token, setToken] = useGlobalState(
    StateTypes.token.key,
    StateTypes.token.default
  );
  const [user, setUser] = useGlobalState(
    StateTypes.user.key,
    StateTypes.user.default
  );
  const [vendor, setVendor] = useRecoilState(vendorProfileAtom);
  const [vendorEdit, setVendorEdit] = useState(false);

  useEffect(() => {
    loadApp(setToken, setUser);
  }, []);

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    grabVendor();
  }, [user]);

  const grabVendor = async () => {
    const res = await apis.vendor.getAll({ userId: user.id });

    if (res.data[0]) {
      const vendorResp = await apis.vendor.getById(res.data[0].id);
      setVendor(vendorResp.data);
    }
    if (res.data?.length === 0 && user.role === "vendor") {
      setVendorEdit(true);
    } else {
      setVendorEdit(false);
    }
  };

  console.log("vendor11111", vendor);

  const vendorCreate = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="VerifyCreate"
          component={VendorEdit}
          options={{ headerShown: false }}
          initialParams={{ isCreate: true, vendor }}
        />
        <Stack.Screen
          name="CameraEdit"
          component={VendorCameraRoll}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="Album"
          component={AlbumTypeScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Stack.Navigator>
    );
  };

  const selectStack = () => {
    switch (token) {
      case "loading":
        return (
          <View justifyContent={"center"} alignItems={"center"}>
            <ImageBackground
              style={{
                width: layout.window.width,
                height: layout.window.height,
              }}
              resizeMode="cover"
              source={require("../../assets/rectangle-2.png")}
            />
          </View>
        );
      case "auth":
        return (
          <Stack.Navigator>
            <Stack.Screen
              name="auth"
              component={AuthNav}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        );
      case "verify":
        return (
          <Stack.Navigator>
            <Stack.Screen
              name="verify"
              component={VerifyNav}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        );
      case "vendor":
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
              name="Dashboard"
              component={VendorDrawerNav}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <DashboardIcon
                      style={focused ? styles.activeIcon : styles.inactiveIcon}
                    />
                  );
                },
              }}
            />
            <BottomTab.Screen
              name="Quotes"
              component={VendorQuotesStackRoutes}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <QuotesInactiveIcon
                      style={focused ? styles.activeIcon : styles.inactiveIcon}
                    />
                  );
                },
              }}
            />
          </BottomTab.Navigator>
        );
      case "host":
        return <HostBottomNav />;
      default:
        return (
          <>
            <Text>{token}</Text>
          </>
        );
    }
  };

  return (
    <NavigationContainer theme={DarkTheme}>
      {token !== "auth" && vendorEdit ? vendorCreate() : selectStack()}
    </NavigationContainer>
  );
};
