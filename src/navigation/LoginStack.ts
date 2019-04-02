import WelcomeScreen from "./../screens/WelcomeScreen";
import LoginScreen from "./../screens/LoginScreen";

import { createStackNavigator } from "react-navigation";
import { commonStackConfig } from "./helpers";

export const LoginStack = createStackNavigator(
	{
		Welcome: WelcomeScreen,
		Login: LoginScreen,
	},
	{
		initialRouteName: 'Welcome',
		...commonStackConfig
	}
);