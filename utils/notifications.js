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
/**
 * The function `loginNotifications` logs in a user, adds their email and phone number to OneSignal if
 * provided.
 * @param userId - The userId parameter is the unique identifier for the user. It is typically a string
 * or a number that uniquely identifies the user in your system.
 * @param email - The `email` parameter is the email address of the user.
 * @param phoneNumber - The `phoneNumber` parameter is a string that represents the user's phone
 * number.
 */
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
