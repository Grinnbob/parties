import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HostSideNav from "../components/navigation/HostSideNav";
import Tabs from "./hostTabNav";
const Drawer = createDrawerNavigator();
export default (props) => {
  return (
    <Drawer.Navigator
      drawerContent={() => <HostSideNav />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#c6cbef",
          width: "100%",
        },
      }}
    >
      <Drawer.Screen
        name="Tab"
        component={Tabs}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};
