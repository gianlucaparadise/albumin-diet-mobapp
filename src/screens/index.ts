import { Navigation } from "react-native-navigation";

import SplashScreen from "./SplashScreen";
import LoginScreen from "./LoginScreen";
import MyAlbumsScreen from "./MyAlbumsScreen";
import MyListeningListScreen from "./MyListeningListScreen";
import SearchScreen from "./SearchScreen";
import MyProfileScreen from "./MyProfileScreen";

export function registerScreens() {
	Navigation.registerComponent(`navigation.SplashScreen`, () => SplashScreen);
	Navigation.registerComponent(`navigation.LoginScreen`, () => LoginScreen);
	Navigation.registerComponent(`navigation.MyAlbumsScreen`, () => MyAlbumsScreen);
	Navigation.registerComponent(`navigation.MyListeningListScreen`, () => MyListeningListScreen);
	Navigation.registerComponent(`navigation.SearchScreen`, () => SearchScreen);
	Navigation.registerComponent(`navigation.MyProfileScreen`, () => MyProfileScreen);
}