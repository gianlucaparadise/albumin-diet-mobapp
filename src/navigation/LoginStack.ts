import { loginScreens as screens } from "../screens";

import { createStackNavigator } from "react-navigation-stack";
import { commonStackConfig } from "./helpers";

export const LoginStack = createStackNavigator(
	screens,
	{
		initialRouteName: 'Welcome',
		...commonStackConfig
	}
);