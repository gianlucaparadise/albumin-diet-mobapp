import React from 'react';
import { createAppContainer } from 'react-navigation';
import { Provider as PaperProvider } from 'react-native-paper';

import { RootStack } from './src/navigation';
import { AlbuminTheme } from './src/Theme';

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <PaperProvider theme={AlbuminTheme}>
        <AppContainer />
      </PaperProvider>
    );
  }
}