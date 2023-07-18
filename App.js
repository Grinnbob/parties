/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from "react";
import { View } from "react-native";
import { RecoilRoot } from "recoil";
import Wrapper from "./theme/Wrapper";
import RootNavigator from "./navigation/rootNavigator";

const App = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Wrapper>
        <RecoilRoot>
          <RootNavigator />
        </RecoilRoot>
      </Wrapper>
    </View>
  );
};

export default App;
