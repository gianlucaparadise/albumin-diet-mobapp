import { NavigationScreenProp, NavigationRoute, NavigationTransitionProps, TransitionConfig } from "react-navigation";

export type MyNavigationScreenOptionsGetterParam = {
	navigation: NavigationScreenProp<NavigationRoute<any>>,
	screenProps?: { [key: string]: any }
};

export type MyNavigationScreenOptionsGetter<Options> = (getterParam: MyNavigationScreenOptionsGetterParam) => Options;

// This type is taken from `interface NavigationStackViewConfig` property `transitionConfig`
export type TransitionConfigType = (
	transitionProps: NavigationTransitionProps,
	prevTransitionProps: NavigationTransitionProps,
	isModal: boolean
) => TransitionConfig;