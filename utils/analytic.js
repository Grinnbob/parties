import appsFlyer from "react-native-appsflyer";
import config from "react-native-config";

appsFlyer.initSdk(
  {
    devKey: config.APPS_FLYER_KEY,
    isDebug: true,
    appId: "41*****44",
    onInstallConversionDataListener: true,
    onDeepLinkListener: true,
    timeToWaitForATTUserAuthorization: 10, //for iOS 14.5
  },
  (result) => {
    console.log(result);
  },
  (error) => {
    console.error(error);
  }
);
