import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import WelcomeScreen from "./WelcomeScreen";
import LoginScreen from "./LoginScreen";
import SplashScreen from "./SplashScreen";
import MyAlbumsScreen from "./MyAlbumsScreen";
import MyListeningListScreen from "./MyListeningListScreen";
import SearchScreen from "./SearchScreen";
import MyProfileScreen from "./MyProfileScreen";
import AlbumDetailScreen from "./AlbumDetailScreen";

const AlbumsFlow = createStackNavigator(
	{
		MyAlbums: MyAlbumsScreen,
		AlbumDetail: AlbumDetailScreen,
	},
	{
		initialRouteName: 'MyAlbums'
	}
);

const ListeningListFlow = createStackNavigator(
	{
		MyListeningList: MyListeningListScreen,
	},
	{
		initialRouteName: 'MyListeningList'
	}
);

const SearchFlow = createStackNavigator(
	{
		Search: SearchScreen,
	},
	{
		initialRouteName: 'Search'
	}
);

const ProfileFlow = createStackNavigator(
	{
		MyProfile: MyProfileScreen,
	},
	{
		initialRouteName: 'MyProfile'
	}
);

const HomeStack = createMaterialBottomTabNavigator(
	{
		AlbumsFlow: AlbumsFlow,
		ListeningListFlow: ListeningListFlow,
		SearchFlow: SearchFlow,
		ProfileFlow: ProfileFlow
	},
	{
		shifting: false,
		labeled: true,
		paths: {
			AlbumsFlow: 'Albums',
			ListeningListFlow: 'ListeningList',
			SearchFlow: 'Search',
			ProfileFlow: 'Profile'
		},
	}
);

const LoginStack = createStackNavigator(
	{
		Welcome: WelcomeScreen,
		Login: LoginScreen,
	},
	{
		initialRouteName: 'Welcome',
	}
);

export const RootStack = createSwitchNavigator(
	{
		Splash: SplashScreen,
		HomeFlow: HomeStack,
		LoginFlow: LoginStack,
	},
	{
		initialRouteName: 'Splash'
	}
);