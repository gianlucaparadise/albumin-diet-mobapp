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

  // This works only on Android
  // TODO: make this work also on iOS
  Navigation.setDefaultOptions({
    animations: {
      setRoot: {
        alpha: {
          from: 0,
          to: 1,
          duration: 500
        }
      }
    }
  });

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        component: {
          name: 'navigation.SplashScreen'
        }
      }
    });
  });
}