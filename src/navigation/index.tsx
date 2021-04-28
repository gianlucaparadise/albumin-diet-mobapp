import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import { LoginStack, LoginStackParamList } from './LoginStack';
import { HomeDrawer, HomeDrawerParamList } from './HomeDrawer';
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
    Splash: undefined;
    HomeFlow: NavigatorScreenParams<HomeDrawerParamList>;
    LoginFlow: NavigatorScreenParams<LoginStackParamList>;
}

const Stack = createStackNavigator<RootStackParamList>();

export function RootStack() {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="HomeFlow" component={HomeDrawer} />
            <Stack.Screen name="LoginFlow" component={LoginStack} />
        </Stack.Navigator>
    );
}