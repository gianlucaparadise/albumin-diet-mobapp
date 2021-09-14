import React from 'react';
import { loginScreens as screens } from '../screens';

import { createStackNavigator } from '@react-navigation/stack';
import { commonStackConfig } from './helpers';

const Stack = createStackNavigator<LoginStackParamList>()

export type LoginStackParamList = {
  Welcome: undefined,
  Login: undefined
}

export function LoginStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      headerMode="float"
      screenOptions={commonStackConfig}>
      <Stack.Screen
        name="Welcome"
        component={screens.Welcome} />
      <Stack.Screen
        name="Login"
        component={screens.Login} />
    </Stack.Navigator>
  )
}
