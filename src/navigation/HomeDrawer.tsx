import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { HomeTabs } from './HomeTabs';
import { TagsFilterScreen } from '../screens/';
import { AlbuminColors } from '../Theme';

const Drawer = createDrawerNavigator()

export function HomeDrawer() {
    return (
        <Drawer.Navigator
            drawerPosition='right'
            screenOptions={{ gestureEnabled: false }}
            drawerStyle={{ backgroundColor: AlbuminColors.surface }}
            drawerContent={(props) => <TagsFilterScreen />}>
        </Drawer.Navigator>
    )
}

// TODO: understand how to implement drawerLockMode correctly
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
