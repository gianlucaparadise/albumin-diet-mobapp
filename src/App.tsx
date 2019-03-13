/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { registerScreens } from './screens';
import { Navigation } from 'react-native-navigation';

export function start() {
  registerScreens();

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        stack: {
          id: 'MainStack',
          children: [
            {
              component: {
                name: 'navigation.SplashScreen'
              }
            }
          ]
        }
      }
    });
  });
}