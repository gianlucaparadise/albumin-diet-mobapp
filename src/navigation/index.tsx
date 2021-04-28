import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import { LoginStack } from './LoginStack';
import { HomeDrawer } from './HomeDrawer';

const Stack = createStackNavigator();

export function RootStack() {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="HomeFlow" component={HomeDrawer} />
            <Stack.Screen name="LoginFlow" component={LoginStack} />
        </Stack.Navigator>
    );
}