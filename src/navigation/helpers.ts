import { TransitionConfigType } from '../../types/react-navigation-types';

// There is no typings for this class 😢
// N.B. This is not an official API and may break
// N.B. IMO, this may break FluidTransitions
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';

export const RightToLeftTransitionConfig: TransitionConfigType = () => ({
	screenInterpolator: sceneProps => {
		return StackViewStyleInterpolator.forHorizontal(sceneProps);
	}
})