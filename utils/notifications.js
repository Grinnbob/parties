import { OneSignal } from "react-native-onesignal";
import Config from "react-native-config";
// OneSignal Initialization
console.log("ONESIGNAL CHECK:", Config.ONESIGNAL_APP_ID);
OneSignal.initialize(Config.ONESIGNAL_APP_ID);

// OneSignal.Notifications.requestPermission();
const initializePushNotifications = async () => {
  const [hasPermission] = await OneSignal.Notifications.requestPermission(true);
  console.log("oneSignalPermission", hasPermission);
  if (hasPermission) {
    OneSignal.InAppMessages.addEventListener("willDisplay", (event) => {
      console.log("OneSignal: will display IAM: ", event);
    });
    OneSignal.InAppMessages.addEventListener("didDisplay", (event) => {
      console.log("OneSignal: did display IAM: ", event);
    });
    OneSignal.InAppMessages.addEventListener("willDismiss", (event) => {
      console.log("OneSignal: will dismiss IAM: ", event);
    });
    OneSignal.InAppMessages.addEventListener("didDismiss", (event) => {
      console.log("OneSignal: did dismiss IAM: ", event);
    });
    OneSignal.InAppMessages.addEventListener("click", (event) => {
      console.log("OneSignal IAM clicked: " + event);
    });
  }
};
export const loginNotifications = async (userId, email, phoneNumber) => {
  console.log("noti login", userId, email, phoneNumber);
  const res = await OneSignal.User.login(userId + "");
  console.log(res);
  if (email) OneSignal.User.addEmail(email);
  if (phoneNumber) OneSignal.User.addSms(phoneNumber);
};
export const logoutNotifications = () => {
  OneSignal.logout();
};

export default initializePushNotifications;
