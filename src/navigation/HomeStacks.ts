import { screens } from "./screens";
import { createStackNavigator } from "react-navigation";
import { RightToLeftTransitionConfig } from "./helpers";

export const AlbumsFlow = createStackNavigator(
	screens,
	{
		initialRouteName: 'MyAlbums',
		transitionConfig: RightToLeftTransitionConfig,
	}
);

export const ListeningListFlow = createStackNavigator(
	screens,
	{
		initialRouteName: 'MyListeningList',
		transitionConfig: RightToLeftTransitionConfig,
	}
);

export const SearchFlow = createStackNavigator(
	screens,
	{
		initialRouteName: 'Search',
		transitionConfig: RightToLeftTransitionConfig,
	}
);

export const ProfileFlow = createStackNavigator(
	screens,
	{
		initialRouteName: 'MyProfile',
		transitionConfig: RightToLeftTransitionConfig,
	}
);