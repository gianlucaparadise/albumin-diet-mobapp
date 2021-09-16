import {
  AlbumsFlow,
  ListeningListFlow,
  SearchFlow,
  ProfileFlow,
  HomeStackParamList,
} from './HomeStacks';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';

// import {
//   getActiveChildNavigationOptions,
// } from 'react-navigation';
// import {MyNavigationScreenOptionsGetterParam} from '../../types/react-navigation-types';

import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AlbuminIcon from '../albumin-icons/AlbuminIcons';
import { AlbuminColors } from '../Theme';

const Tab = createMaterialBottomTabNavigator<HomeTabsParamList>();

const iconSize = 25;

export type HomeTabsParamList = {
  AlbumsFlow: NavigatorScreenParams<HomeStackParamList>,
  ListeningListFlow: NavigatorScreenParams<HomeStackParamList>,
  SearchFlow: NavigatorScreenParams<HomeStackParamList>,
  ProfileFlow: NavigatorScreenParams<HomeStackParamList>
}

export function HomeTabs() {
  return (
    <Tab.Navigator
      shifting={false}
      labeled={true}
      barStyle={{ backgroundColor: AlbuminColors.primary }}>
      <Tab.Screen
        name="AlbumsFlow"
        component={AlbumsFlow}
        options={() => {
          return {
            tabBarLabel: 'Albums',
            tabBarIcon: ({ color }) => {
              let iconName = 'album';
              return (
                <MaterialIcon name={iconName} size={iconSize} color={color} />
              );
            },
            // drawerLockMode: extractActiveChildNavigationOptions(
            //   navigationOptions,
            //   'drawerLockMode',
            // ),
          };
        }} />

      <Tab.Screen
        name="ListeningListFlow"
        component={ListeningListFlow}
        options={() => {
          return {
            tabBarLabel: 'Listening List',
            tabBarIcon: ({ color }) => {
              let iconName = 'eggs_filled';
              return (
                <AlbuminIcon name={iconName} size={iconSize} color={color} />
              );
            },
          };
        }} />

      <Tab.Screen
        name="SearchFlow"
        component={SearchFlow}
        options={() => {
          return {
            tabBarLabel: 'Search',
            tabBarIcon: ({ color }) => {
              let iconName = 'search';
              return (
                <MaterialIcon name={iconName} size={iconSize} color={color} />
              );
            },
          };
        }} />

      <Tab.Screen
        name="ProfileFlow"
        component={ProfileFlow}
        options={() => {
          return {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => {
              let iconName = 'person';
              return (
                <MaterialIcon name={iconName} size={iconSize} color={color} />
              );
            },
          };
        }} />
    </Tab.Navigator>
  )
}