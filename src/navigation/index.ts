import { createSwitchNavigator } from "react-navigation";

import SplashScreen from "./../screens/SplashScreen";
import { LoginStack } from "./LoginStack";
import { HomeDrawer } from "./HomeDrawer";

export const RootStack = createSwitchNavigator(
	{
		Splash: SplashScreen,
		HomeFlow: HomeDrawer,
		LoginFlow: LoginStack,
	},
	{
		initialRouteName: 'Splash'
	}
);