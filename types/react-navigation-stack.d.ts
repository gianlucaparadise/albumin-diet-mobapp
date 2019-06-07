declare module 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator' {
	import { NavigationTransitionProps } from "react-navigation";

	export = index;

	type ScreenInterpolatorGetter = (props: NavigationTransitionProps) => any

	const index: {
		forHorizontal: ScreenInterpolatorGetter,
		forVertical: ScreenInterpolatorGetter,
		forFadeFromBottomAndroid: ScreenInterpolatorGetter,
		forFadeToBottomAndroid: ScreenInterpolatorGetter,
		forFade: ScreenInterpolatorGetter
	};
}