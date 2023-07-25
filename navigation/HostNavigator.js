import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import HostDrawerNav from "./hostDrawerNav";
import EditAccount from "../screens/Host/EditAccount";
import DeleteAccountModal from "../screens/Host/DeleteAccountModal";
import UpdateUser from "../screens/Host/UpdateUser";
import ChangePassword from "../screens/Host/ChangePassword";
import SuccessPassword from "../screens/Host/SuccessPasswordModal";
import EnterPhone from "../screens/Host/Verify/EnterPhone";
import VerifyPhone from "../screens/Host/Verify/VerifyPhone";
import FAQ from "../screens/Setting/FAQ";
import Report from "../screens/Setting/Report";
import Privacy from "../screens/Setting/Privacy";
import Term from "../screens/Setting/Term";
import { Text } from "native-base";
import BackButton from "../components/navigation/BackButton";
const Stack = createStackNavigator();
const HostNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HostDrawerNav"
        component={HostDrawerNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditAccount"
        component={EditAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeleteAccountModal"
        component={DeleteAccountModal}
        options={{ headerShown: false, presentation: "transparentModal" }}
      />
      <Stack.Screen
        name="SuccessPassword"
        component={SuccessPassword}
        options={{ headerShown: false, presentation: "transparentModal" }}
      />
      <Stack.Screen
        name="UpdateUser"
        component={UpdateUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EnterPhone"
        component={EnterPhone}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerifyPhone"
        component={VerifyPhone}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FAQ"
        component={FAQ}
        options={{
          headerShown: true,
          headerBackTitle: (
            <Text fontSize={18} fontWeight={"700"}>
              FAQ
            </Text>
          ),
          headerLeft: BackButton,
        }}
      />
      <Stack.Screen
        name="Report"
        component={Report}
        options={{
          headerShown: true,
          headerBackTitle: (
            <Text fontSize={18} fontWeight={"700"}>
              Report
            </Text>
          ),
          headerLeft: BackButton,
        }}
      />
      <Stack.Screen
        name="Privacy"
        component={Privacy}
        options={{
          headerShown: true,
          headerBackTitle: (
            <Text fontSize={18} fontWeight={"700"}>
              Privacy
            </Text>
          ),
          headerLeft: BackButton,
        }}
      />
      <Stack.Screen
        name="Term"
        component={Term}
        options={{
          headerShown: true,
          headerBackTitle: (
            <Text fontSize={18} fontWeight={"700"}>
              Term
            </Text>
          ),
          headerLeft: BackButton,
        }}
      />
    </Stack.Navigator>
  );
};

export default HostNavigator;
