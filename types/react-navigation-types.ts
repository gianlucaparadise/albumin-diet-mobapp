import { NavigationScreenProp, NavigationRoute } from "react-navigation";

export type MyNavigationScreenOptionsGetter<Options> = (getterParam: {
	navigation: NavigationScreenProp<NavigationRoute<any>>,
	screenProps?: { [key: string]: any }
}) => Options;