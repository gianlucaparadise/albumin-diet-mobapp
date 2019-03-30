import { AlbumsFlow, ListeningListFlow, SearchFlow, ProfileFlow } from "./HomeStacks";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { getActiveChildNavigationOptions, NavigationScreenOptions } from "react-navigation";
import { MyNavigationScreenOptionsGetter, MyNavigationScreenOptionsGetterParam } from "../../types/react-navigation-types";

const extractActiveChildNavigationOptions = (navigationOptions: MyNavigationScreenOptionsGetterParam, optionName: string) => {
	const activeChildOptions = getActiveChildNavigationOptions(navigationOptions.navigation, navigationOptions.screenProps);
	return activeChildOptions[optionName];
};

export const HomeTabs = createMaterialBottomTabNavigator(
	{
		AlbumsFlow: {
			screen: AlbumsFlow,
			navigationOptions: (navigationOptions: MyNavigationScreenOptionsGetterParam): NavigationScreenOptions => {
				return {
					tabBarLabel: 'Albums',
					drawerLockMode: extractActiveChildNavigationOptions(navigationOptions, 'drawerLockMode')
				}
			},
		},
		ListeningListFlow: {
			screen: ListeningListFlow,
			navigationOptions: {
				tabBarLabel: 'Listening List',
			},
		},
		SearchFlow: {
			screen: SearchFlow,
			navigationOptions: {
				tabBarLabel: 'Search',
			},
		},
		ProfileFlow: {
			screen: ProfileFlow,
			navigationOptions: {
				tabBarLabel: 'Profile',
			},
		},
	},
	{
		shifting: false,
		labeled: true,
	}
);

HomeTabs.navigationOptions = (navigationOptions: MyNavigationScreenOptionsGetterParam): NavigationScreenOptions => {
	return {
		drawerLockMode: extractActiveChildNavigationOptions(navigationOptions, 'drawerLockMode')
	}
};