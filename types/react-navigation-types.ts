import { NavigationScreenProp, NavigationRoute } from "react-navigation";

export type MyNavigationScreenOptionsGetterParam = {
	navigation: NavigationScreenProp<NavigationRoute<any>>,
	screenProps?: { [key: string]: any }
};

export type MyNavigationScreenOptionsGetter<Options> = (getterParam: MyNavigationScreenOptionsGetterParam) => Options;