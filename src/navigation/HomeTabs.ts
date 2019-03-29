import { AlbumsFlow, ListeningListFlow, SearchFlow, ProfileFlow } from "./HomeStacks";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

export const HomeTabs = createMaterialBottomTabNavigator(
	{
		AlbumsFlow: {
			screen: AlbumsFlow,
			navigationOptions: {
				tabBarLabel: 'Albums',
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