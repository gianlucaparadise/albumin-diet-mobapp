import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { commonStackConfig, headerMode } from './helpers';
import { LoginScreen, WelcomeScreen } from '../screens';

export type LoginStackParamList = {
  Welcome: undefined;
  Login: undefined;
}

const Stack = createStackNavigator<LoginStackParamList>();

export function LoginStack() {
  return (
    <Stack.Navigator initialRouteName="Welcome" headerMode={headerMode} screenOptions={commonStackConfig}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}