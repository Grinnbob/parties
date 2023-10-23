/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import notificationControl from "./utils/notifications";
import { checkPermissions } from "./utils/permissions";
notificationControl();
checkPermissions();
AppRegistry.registerComponent(appName, () => App);
