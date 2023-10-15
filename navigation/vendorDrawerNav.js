import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Tab from "./tabNav";

import VendorSideNav from "../components/navigation/VendorSideNav";
import AlbumNavigator from "./AlbumNavigator";
import FAQ from "../screens/Setting/FAQ";
import Report from "../screens/Setting/Report";
import Privacy from "../screens/Setting/Privacy";
import Term from "../screens/Setting/Term";
import EditAccount from "../screens/Vendor/Setting/EditAccount";
import DeleteAccountModal from "../screens/Vendor/Setting/DeleteAccountModal";
import UpdateUser from "../screens/Vendor/Setting/UpdateUser";
import ChangePassword from "../screens/Vendor/Setting/ChangePassword";
import SuccessPassword from "../screens/Vendor/Setting/SuccessPasswordModal";
import EnterPhone from "../screens/Vendor/Setting/Verify/EnterPhone";
import VerifyPhone from "../screens/Vendor/Setting/Verify/VerifyPhone";
import { Text } from "native-base";
import VendorBackButton from "../components/navigation/VendorBackButton";
import VendorCameraRoll from "../screens/Vendor/Profile/VendorCameraRoll";
import { EventMessageScreen, EventScreen } from "../screens/Event";

const Drawer = createDrawerNavigator();
export default (props) => {
  return (
    <Drawer.Navigator
      drawerContent={() => <VendorSideNav />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#c6cbef",
          width: "100%",
        },
      }}
    >
      <Drawer.Screen
        name="Tab"
        component={Tab}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="AlbumNavigator"
        component={AlbumNavigator}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="VerifyCameraRoll"
        component={VendorCameraRoll}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="EditAccount"
        component={EditAccount}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="DeleteAccountModal"
        component={DeleteAccountModal}
        options={{ headerShown: false, presentation: "transparentModal" }}
      />
      <Drawer.Screen
        name="SuccessPassword"
        component={SuccessPassword}
        options={{ headerShown: false, presentation: "transparentModal" }}
      />
      <Drawer.Screen
        name="UpdateUser"
        component={UpdateUser}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="EnterPhone"
        component={EnterPhone}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="VerifyPhone"
        component={VerifyPhone}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="FAQ"
        component={FAQ}
        options={{
          headerShown: true,
          headerBackTitle: (
            <Text fontSize={18} fontWeight={"700"}>
              FAQ
            </Text>
          ),
          headerLeft: VendorBackButton,
        }}
      />
      <Drawer.Screen
        name="Report"
        component={Report}
        options={{
          headerShown: true,
          headerBackTitle: (
            <Text fontSize={18} fontWeight={"700"}>
              Report
            </Text>
          ),
          headerLeft: VendorBackButton,
        }}
      />
      <Drawer.Screen
        name="Privacy"
        component={Privacy}
        options={{
          headerShown: true,
          headerBackTitle: (
            <Text fontSize={18} fontWeight={"700"}>
              Privacy
            </Text>
          ),
          headerLeft: VendorBackButton,
        }}
      />
      <Drawer.Screen
        name="Term"
        component={Term}
        options={{
          headerShown: true,
          headerBackTitle: (
            <Text fontSize={18} fontWeight={"700"}>
              Term
            </Text>
          ),
          headerLeft: VendorBackButton,
        }}
      />
      <Drawer.Screen
        name="Event"
        component={EventScreen}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="EventMessages"
        component={EventMessageScreen}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};
