import WelcomeScreen from "./../screens/WelcomeScreen";
import LoginScreen from "./../screens/LoginScreen";

import { createStackNavigator } from "react-navigation";

export const LoginStack = createStackNavigator(
	{
		Welcome: WelcomeScreen,
		Login: LoginScreen,
	},
	{
		initialRouteName: 'Welcome',
	}
);