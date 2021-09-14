import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigatorScreenParams } from '@react-navigation/native';
import { HomeTabs, HomeTabsParamList } from './HomeTabs';
import TagsFilterScreen from '../screens/TagsFilterScreen';
// import { AlbuminColors } from '../Theme';

const Drawer = createDrawerNavigator<HomeDrawerParamList>()

export type HomeDrawerParamList = {
  HomeTabs: NavigatorScreenParams<HomeTabsParamList>
}

export function HomeDrawer() {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={(props) => <TagsFilterScreen {...props} />}
    >
      <Drawer.Screen
        name="HomeTabs"
        component={HomeTabs} />
    </Drawer.Navigator>
  )
}

// TODO: RN5 - Add custom drawer
// export const HomeDrawer = createDrawerNavigator(
//   {
//     HomeTabs: HomeTabs, // this is needed by the library, but it's never used
//   },
//   {
//     drawerPosition: 'right',
//     contentComponent: TagsFilterScreen,
//     drawerLockMode: 'locked-closed', // this is enabled on in the correct page,
//     drawerBackgroundColor: AlbuminColors.surface,
//   },
// );
