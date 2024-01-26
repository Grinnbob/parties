/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from "react";
import { View } from "react-native";
import { RecoilRoot } from "recoil";
import Wrapper from "./theme/Wrapper";
import { RootNavigator } from "./navigation/RootNavigator";
import TestFairy from "react-native-testfairy";
import Config from "react-native-config";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { SocketProvider } from "./components/Chat";
import { MenuProvider } from "react-native-popup-menu";

const App = () => {
  useEffect(() => {
    TestFairy.begin(Config.TEST_FAIRY_KEY);
  }, []);
  return (
    <MenuProvider>
      <View
        style={{
          flex: 1,
        }}
      >
        <Wrapper>
          <RecoilRoot>
            <ActionSheetProvider>
              <SocketProvider>
                <RootNavigator />
              </SocketProvider>
            </ActionSheetProvider>
          </RecoilRoot>
        </Wrapper>
      </View>
    </MenuProvider>
  );
};

export default App;
