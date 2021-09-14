import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';

import SplashScreen from './../screens/SplashScreen';
import { LoginStack, LoginStackParamList } from './LoginStack';
import { HomeDrawer, HomeDrawerParamList } from './HomeDrawer';

const Stack = createStackNavigator<RootStackParamList>()

export type RootStackParamList = {
  Splash: undefined,
  HomeFlow: NavigatorScreenParams<HomeDrawerParamList>,
  LoginFlow: NavigatorScreenParams<LoginStackParamList>,
}

export function RootStack() {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen} />

      <Stack.Screen
        name="HomeFlow"
        component={HomeDrawer} />
      <Stack.Screen
        name="LoginFlow"
        component={LoginStack} />
    </Stack.Navigator>
  )
}