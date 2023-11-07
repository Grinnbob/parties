/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import notificationControl from "./utils/notifications";
import { checkPermissions } from "./utils/permissions";
// import AsyncStorage from "@react-native-async-storage/async-storage";
notificationControl();
checkPermissions();

// AsyncStorage.clear();
AppRegistry.registerComponent(appName, () => App);
