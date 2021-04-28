import {
  AlbumsFlow,
  ListeningListFlow,
  SearchFlow,
  ProfileFlow,
  HomeStackParamList,
} from './HomeStacks';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { getActiveChildNavigationOptions } from 'react-navigation';
// import { MyNavigationScreenOptionsGetterParam } from '../../types/react-navigation-types';

import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AlbuminIcon from '../albumin-icons/AlbuminIcons';
import { NavigatorScreenParams } from '@react-navigation/native';

const iconSize = 25;

export type HomeTabsParamList = {
  AlbumsFlow: NavigatorScreenParams<HomeStackParamList>;
  ListeningListFlow: NavigatorScreenParams<HomeStackParamList>;
  SearchFlow: NavigatorScreenParams<HomeStackParamList>;
  ProfileFlow: NavigatorScreenParams<HomeStackParamList>;
}

const Tab = createMaterialBottomTabNavigator<HomeTabsParamList>();

export function HomeTabs() {
  return (
    <Tab.Navigator shifting={false} labeled={true}>
      <Tab.Screen
        name="AlbumsFlow" component={AlbumsFlow}
        options={{
          tabBarLabel: 'Albums',
          tabBarIcon: ({ color }) => {
            let iconName = 'album';
            return (
              <MaterialIcon name={iconName} size={iconSize} color={color} />
            );
          }
        }}
      />
      <Tab.Screen
        name="ListeningListFlow" component={ListeningListFlow}
        options={{
          tabBarLabel: 'Listening List',
          tabBarIcon: ({ color }) => {
            let iconName = 'eggs_filled';
            return (
              <AlbuminIcon name={iconName} size={iconSize} color={color} />
            );
          }
        }}
      />
      <Tab.Screen
        name="SearchFlow" component={SearchFlow}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => {
            let iconName = 'search';
            return (
              <MaterialIcon name={iconName} size={iconSize} color={color} />
            );
          }
        }}
      />
      <Tab.Screen
        name="ProfileFlow" component={ProfileFlow}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => {
            let iconName = 'person';
            return (
              <MaterialIcon name={iconName} size={iconSize} color={color} />
            );
          }
        }}
      />
    </Tab.Navigator>
  );
}

// TODO: understand how to implement drawerLockMode correctly
// const extractActiveChildNavigationOptions = (
//   navigationOptions: any,
//   optionName: string,
// ) => {
//   const activeChildOptions = getActiveChildNavigationOptions(
//     navigationOptions.navigation,
//     navigationOptions.screenProps,
//   );
//   return activeChildOptions[optionName];
// };

// export const HomeTabs = createMaterialBottomTabNavigator(
//   {
//     AlbumsFlow: {
//       screen: AlbumsFlow,
//       navigationOptions: (
//         navigationOptions,
//       ) => {
//         return {
//           tabBarLabel: 'Albums',
//           tabBarIcon: ({ focused, horizontal, tintColor }) => {
//             let iconName = 'album';
//             let color: string = tintColor as string;
//             return (
//               <MaterialIcon name={iconName} size={iconSize} color={color} />
//             );
//           },
//           drawerLockMode: extractActiveChildNavigationOptions(
//             navigationOptions,
//             'drawerLockMode',
//           ),
//         };
//       },
//     },
//     ListeningListFlow: {
//       screen: ListeningListFlow,
//       navigationOptions: () => {
//         return {
//           tabBarLabel: 'Listening List',
//           tabBarIcon: ({ focused, horizontal, tintColor }) => {
//             let iconName = 'eggs_filled';
//             let color: string = tintColor as string;
//             return (
//               <AlbuminIcon name={iconName} size={iconSize} color={color} />
//             );
//           },
//         };;
//       },
//     },
//     SearchFlow: {
//       screen: SearchFlow,
//       navigationOptions: () => {
//         return {
//           tabBarLabel: 'Search',
//           tabBarIcon: ({ focused, horizontal, tintColor }) => {
//             let iconName = 'search';
//             let color: string = tintColor as string;
//             return (
//               <MaterialIcon name={iconName} size={iconSize} color={color} />
//             );
//           },
//         };;
//       },
//     },
//     ProfileFlow: {
//       screen: ProfileFlow,
//       navigationOptions: () => {
//         return {
//           tabBarLabel: 'Profile',
//           tabBarIcon: ({ focused, horizontal, tintColor }) => {
//             let iconName = 'person';
//             let color: string = tintColor as string;
//             return (
//               <MaterialIcon name={iconName} size={iconSize} color={color} />
//             );
//           },
//         };;
//       },
//     },
//   },
//   {
//     shifting: false,
//     labeled: true,
//   },
// );

// HomeTabs.navigationOptions = (navigationOptions: any) => {
//   return {
//     drawerLockMode: extractActiveChildNavigationOptions(
//       navigationOptions,
//       'drawerLockMode',
//     ),
//   };
// };
