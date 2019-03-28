import { createStackNavigator, createSwitchNavigator, createDrawerNavigator } from "react-navigation";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import WelcomeScreen from "./WelcomeScreen";
import LoginScreen from "./LoginScreen";
import SplashScreen from "./SplashScreen";
import MyAlbumsScreen from "./MyAlbumsScreen";
import MyListeningListScreen from "./MyListeningListScreen";
import SearchScreen from "./SearchScreen";
import MyProfileScreen from "./MyProfileScreen";
import AlbumDetailScreen from "./AlbumDetailScreen";
import TagsFilterScreen from "./TagsFilterScreen";

const screens = {
	MyAlbums: MyAlbumsScreen,
	AlbumDetail: AlbumDetailScreen,
	MyListeningList: MyListeningListScreen,
	Search: SearchScreen,
	MyProfile: MyProfileScreen,
}

const AlbumsFlow = createStackNavigator(
	screens,
	{
		initialRouteName: 'MyAlbums'
	}
);

const ListeningListFlow = createStackNavigator(
	screens,
	{
		initialRouteName: 'MyListeningList'
	}
);

const SearchFlow = createStackNavigator(
	screens,
	{
		initialRouteName: 'Search'
	}
);

const ProfileFlow = createStackNavigator(
	screens,
	{
		initialRouteName: 'MyProfile'
	}
);

const HomeStack = createMaterialBottomTabNavigator(
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

const HomeDrawer = createDrawerNavigator(
	{
		HomeTabs: HomeStack, // this is needed by the library, but it's never used
	},
	{
		drawerPosition: 'right',
		contentComponent: TagsFilterScreen,
		drawerLockMode: 'locked-closed', // this is enabled on in the correct page
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
		HomeFlow: HomeDrawer,
		LoginFlow: LoginStack,
	},
	{
		initialRouteName: 'Splash'
	}
);