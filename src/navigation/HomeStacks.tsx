import React from 'react';
import { AlbumDetailNavigationParams, homeScreens as screens } from '../screens';

import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import { commonStackConfig } from './helpers';

const Stack = createStackNavigator<HomeStackParamList>()

function getScreens() {
  return (
    <>
      <Stack.Screen name="MyAlbums" component={screens.MyAlbums}
        options={({ navigation }) => {
          // TODO: add react-native-paper AppBar.Header as custom Header: https://hackernoon.com/how-to-use-a-custom-header-and-custom-bottom-tab-bar-for-react-native-with-react-navigation-969a5d3cabb1
          return {
            title: "Albums",
            headerRight: () => (
              <IconButton
                icon="filter-variant"
                onPress={() => {
                  console.log('Show filters');
                  navigation.openDrawer();
                }}
              />
            ),
          }
        }} />

      <Stack.Screen name="AlbumDetail" component={screens.AlbumDetail}
        options={({ route }) => { return { title: route.params?.albumDescriptor?.album.name } }} />

      <Stack.Screen name="MyListeningList" component={screens.MyListeningList}
        options={{ title: 'Listening List' }} />

      <Stack.Screen name="Search" component={screens.Search}
        options={{ title: 'Search' }} />

      <Stack.Screen name="MyProfile" component={screens.MyProfile}
        options={{ title: 'Profile' }} />
    </>
  )
}

export type HomeStackParamList = {
  MyAlbums: undefined,
  AlbumDetail: AlbumDetailNavigationParams,
  MyListeningList: undefined,
  Search: undefined,
  MyProfile: undefined
}

export function AlbumsFlow() {
  return (
    <Stack.Navigator
      initialRouteName="MyAlbums"
      headerMode="float"
      screenOptions={commonStackConfig}>
      {getScreens()}
    </Stack.Navigator>
  )
}

export function ListeningListFlow() {
  return (
    <Stack.Navigator
      initialRouteName="MyListeningList"
      headerMode="float"
      screenOptions={commonStackConfig}>
      {getScreens()}
    </Stack.Navigator>
  )
}

export function SearchFlow() {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      headerMode="float"
      screenOptions={commonStackConfig}>
      {getScreens()}
    </Stack.Navigator>
  )
}

export function ProfileFlow() {
  return (
    <Stack.Navigator
      initialRouteName="MyProfile"
      headerMode="float"
      screenOptions={commonStackConfig}>
      {getScreens()}
    </Stack.Navigator>
  )
}