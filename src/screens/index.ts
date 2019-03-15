import { Navigation } from "react-native-navigation";

import SplashScreen from "./SplashScreen";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";

export function registerScreens() {
	Navigation.registerComponent(`navigation.SplashScreen`, () => SplashScreen);
	Navigation.registerComponent(`navigation.LoginScreen`, () => LoginScreen);
	Navigation.registerComponent(`navigation.HomeScreen`, () => HomeScreen);
}