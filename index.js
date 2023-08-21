/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import notificationControl from "./utils/notifications";
notificationControl();
AppRegistry.registerComponent(appName, () => App);
