import React from 'react';
import { createAppContainer } from 'react-navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';

import { RootStack } from './src/navigation';
import { AlbuminTheme } from './src/Theme';
import { initStore } from './src/redux/store';

const AppContainer = createAppContainer(RootStack);

export const store = initStore();

export default class App extends React.Component {
  render() {
    return (
      <StoreProvider store={store}>
        <PaperProvider theme={AlbuminTheme}>
          <AppContainer />
        </PaperProvider>
      </StoreProvider>
    );
  }
}