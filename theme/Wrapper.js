import React from 'react';
import {NativeBaseProvider} from 'native-base';

import Theme from './Theme';

export default ({children}) => {
  return (
    <NativeBaseProvider theme={Theme} config={Theme}>
      {children}
    </NativeBaseProvider>
  );
};