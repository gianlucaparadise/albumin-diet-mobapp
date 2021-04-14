import { homeScreens as screens } from "../screens";
import { createStackNavigator } from "react-navigation-stack";
import { commonStackConfig } from "./helpers";

export const AlbumsFlow = createStackNavigator(
	screens,
	{
		initialRouteName: 'MyAlbums',
		...commonStackConfig,
	}
);

export const ListeningListFlow = createStackNavigator(
	screens,
	{
		initialRouteName: 'MyListeningList',
		...commonStackConfig,
	}
);

export const SearchFlow = createStackNavigator(
	screens,
	{
		initialRouteName: 'Search',
		...commonStackConfig,
	}
);

export const ProfileFlow = createStackNavigator(
	screens,
	{
		initialRouteName: 'MyProfile',
		...commonStackConfig,
	}
);