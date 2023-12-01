import { SetterOrUpdater } from "recoil";
import apis from "../apis";

import * as LocalAuthentication from "expo-local-authentication";

export default async (setToken, setUser) => {
  try {
    const grabbedUser = await grabUserAndNav(setToken, setUser, true);
    if (grabbedUser) return;
    const res = await apis.device.grabAuthToken();

    if (res.success) {
      return grabUserAndNav(setToken, setUser);
    }
    if (res.isRegisteredForBiometrics) {
      const authenticate = await LocalAuthentication.authenticateAsync();
      if (!authenticate) {
        return setToken("auth");
      }
      await apis.device.loginWithBiometrics();
      return grabUserAndNav(setToken, setUser);
    }
    if (res.isRegisteredForPassCode) {
      return grabUserAndNav(setToken, setUser);
    }
    return setToken("auth");
    // return setToken('app');
  } catch (e) {
    setToken("auth");
  }
};

const grabUserAndNav = async (setToken, setUser, shouldNotNav) => {
  const res = await apis.user.getSelf();
  console.log("res from self:", res.data);
  if (res.success) {
    setUser(res.data);
    console.log("!!---res.data", res.data);
    setToken(res.data.isVerified ? res.data.role : "verify");
    return true;
  }
  if (!shouldNotNav) setToken("auth");
  return false;
};
