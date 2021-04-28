import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { commonStackConfig, headerMode } from './helpers';
import { AlbumDetailScreen, MyAlbumsScreen, MyListeningListScreen, MyProfileScreen, SearchScreen } from '../screens';

const Stack = createStackNavigator();

function TabFlowGenerator(initialRouteName: string) {
  return function () {
    return (
      <Stack.Navigator initialRouteName={initialRouteName} headerMode={headerMode} screenOptions={commonStackConfig} >
        <Stack.Screen name="MyAlbums" component={MyAlbumsScreen} />
        <Stack.Screen name="AlbumDetail" component={AlbumDetailScreen} />
        <Stack.Screen name="MyListeningList" component={MyListeningListScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="MyProfile" component={MyProfileScreen} />
      </Stack.Navigator>
    );
  }
}

export const AlbumsFlow = TabFlowGenerator("MyAlbums");
export const ListeningListFlow = TabFlowGenerator("MyListeningList");
export const SearchFlow = TabFlowGenerator("Search");
export const ProfileFlow = TabFlowGenerator("MyProfile");