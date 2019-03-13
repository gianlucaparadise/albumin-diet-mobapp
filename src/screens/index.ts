import { Navigation } from "react-native-navigation";
import SplashScreen from "./SplashScreen";
import LoginScreen from "./LoginScreen";

export function registerScreens() {
	Navigation.registerComponent(`navigation.SplashScreen`, () => SplashScreen);
	Navigation.registerComponent(`navigation.LoginScreen`, () => LoginScreen);
}