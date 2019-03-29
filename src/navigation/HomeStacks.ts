import { screens } from "./screens";
import { createStackNavigator } from "react-navigation";

export const AlbumsFlow = createStackNavigator(
	screens,
	{
		initialRouteName: 'MyAlbums'
	}
);

export const ListeningListFlow = createStackNavigator(
	screens,
	{
		initialRouteName: 'MyListeningList'
	}
);

export const SearchFlow = createStackNavigator(
	screens,
	{
		initialRouteName: 'Search'
	}
);

export const ProfileFlow = createStackNavigator(
	screens,
	{
		initialRouteName: 'MyProfile'
	}
);