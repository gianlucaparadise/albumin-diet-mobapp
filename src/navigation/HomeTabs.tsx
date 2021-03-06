import {
  AlbumsFlow,
  ListeningListFlow,
  SearchFlow,
  ProfileFlow,
} from './HomeStacks';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {
  getActiveChildNavigationOptions,
} from 'react-navigation';
// import {MyNavigationScreenOptionsGetterParam} from '../../types/react-navigation-types';

import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AlbuminIcon from '../albumin-icons/AlbuminIcons';

const iconSize = 25;

const extractActiveChildNavigationOptions = (
  navigationOptions: any,
  optionName: string,
) => {
  const activeChildOptions = getActiveChildNavigationOptions(
    navigationOptions.navigation,
    navigationOptions.screenProps,
  );
  return activeChildOptions[optionName];
};

export const HomeTabs = createMaterialBottomTabNavigator(
  {
    AlbumsFlow: {
      screen: AlbumsFlow,
      navigationOptions: (
        navigationOptions,
      ) => {
        return {
          tabBarLabel: 'Albums',
          tabBarIcon: ({focused, horizontal, tintColor}) => {
            let iconName = 'album';
            let color: string = tintColor as string;
            return (
              <MaterialIcon name={iconName} size={iconSize} color={color} />
            );
          },
          drawerLockMode: extractActiveChildNavigationOptions(
            navigationOptions,
            'drawerLockMode',
          ),
        };
      },
    },
    ListeningListFlow: {
      screen: ListeningListFlow,
      navigationOptions: () => {
        return {
          tabBarLabel: 'Listening List',
          tabBarIcon: ({focused, horizontal, tintColor}) => {
            let iconName = 'eggs_filled';
            let color: string = tintColor as string;
            return (
              <AlbuminIcon name={iconName} size={iconSize} color={color} />
            );
          },
        };;
      },
    },
    SearchFlow: {
      screen: SearchFlow,
      navigationOptions: () => {
        return {
          tabBarLabel: 'Search',
          tabBarIcon: ({focused, horizontal, tintColor}) => {
            let iconName = 'search';
            let color: string = tintColor as string;
            return (
              <MaterialIcon name={iconName} size={iconSize} color={color} />
            );
          },
        };;
      },
    },
    ProfileFlow: {
      screen: ProfileFlow,
      navigationOptions: () => {
        return {
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused, horizontal, tintColor}) => {
            let iconName = 'person';
            let color: string = tintColor as string;
            return (
              <MaterialIcon name={iconName} size={iconSize} color={color} />
            );
          },
        };;
      },
    },
  },
  {
    shifting: false,
    labeled: true,
  },
);

HomeTabs.navigationOptions = (navigationOptions: any) => {
  return {
    drawerLockMode: extractActiveChildNavigationOptions(
      navigationOptions,
      'drawerLockMode',
    ),
  };
};
