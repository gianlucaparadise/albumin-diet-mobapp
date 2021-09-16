import React, { useState } from 'react';
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
  const [enabled, setEnabled] = useState(false);

  return (
    <DrawerContext.Provider value={{ isDrawerEnabled: enabled, setDrawerEnabled: setEnabled }}>
      <Drawer.Navigator
        drawerPosition="right"
        screenOptions={{
          gestureEnabled: enabled
        }}
        drawerContent={(props) => <TagsFilterScreen {...props} />}
      >
        <Drawer.Screen
          name="HomeTabs"
          component={HomeTabs} />
      </Drawer.Navigator>
    </DrawerContext.Provider>
  )
}

type DrawerVisibiltyContextType = {
  isDrawerEnabled: boolean,
  setDrawerEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

const drawerContextInitial: DrawerVisibiltyContextType = {
  isDrawerEnabled: false,
  setDrawerEnabled: () => { }
}

export const DrawerContext = React.createContext(drawerContextInitial);