import { TransitionConfigType } from '../../types/react-navigation-types';

// There is no typings for this class 😢
// N.B. This is not an official API and may break
// N.B. IMO, this may break FluidTransitions
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import { StackNavigatorConfig } from 'react-navigation';
import { AlbuminColors } from '../Theme';

export const RightToLeftTransitionConfig: TransitionConfigType = () => ({
	screenInterpolator: sceneProps => {
		return StackViewStyleInterpolator.forHorizontal(sceneProps);
	}
})

export const commonStackConfig: StackNavigatorConfig = {
	transitionConfig: RightToLeftTransitionConfig,
	headerMode: "float",
	cardStyle: {
		backgroundColor: AlbuminColors.background,
	},
	headerBackTitleVisible: false,
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: AlbuminColors.appbar
		},
		headerTintColor: AlbuminColors.text,
	},
}