import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';

import { RootStack } from './src/navigation';
import { AlbuminTheme } from './src/Theme';
import { initStore } from './src/redux/store';

export const store = initStore();

export default class App extends React.Component {
  render() {
    return (
      <StoreProvider store={store}>
        <PaperProvider theme={AlbuminTheme}>
          <NavigationContainer>
            <RootStack/>
          </NavigationContainer>
        </PaperProvider>
      </StoreProvider>
    );
  }
}
