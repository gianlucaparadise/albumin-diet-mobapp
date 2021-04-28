// import { TransitionConfigType } from '../../types/react-navigation-types';

// There is no typings for this class 😢
// N.B. This is not an official API and may break
// N.B. IMO, this may break FluidTransitions
// import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import { StackNavigationOptions } from '@react-navigation/stack';
import { StackHeaderMode } from '@react-navigation/stack/lib/typescript/src/types';
// import { CreateNavigatorConfig, NavigationRoute, NavigationStackRouterConfig } from 'react-navigation';
// import { NavigationStackConfig, NavigationStackOptions, NavigationStackProp } from 'react-navigation-stack';
import { AlbuminColors } from '../Theme';

// import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';


// export const RightToLeftTransitionConfig: TransitionConfigType = () => ({
//   screenInterpolator: (sceneProps) => {
//     return StackViewStyleInterpolator.forHorizontal(sceneProps);
//   },
// });

// type CreateStackNavigationConfig = CreateNavigatorConfig<NavigationStackConfig, NavigationStackRouterConfig, NavigationStackOptions, NavigationStackProp<NavigationRoute, any>>

// TODO: understand how to implement transition correctly
// export const commonStackConfig: CreateStackNavigationConfig = {
//   // transitionConfig: RightToLeftTransitionConfig,
//   // ...TransitionPresets.SlideFromRightIOS,
//   headerMode: 'float',
//   cardStyle: {
//     backgroundColor: AlbuminColors.background,
//   },
//   headerBackTitleVisible: false,
//   defaultNavigationOptions: {
//     headerStyle: {
//       backgroundColor: AlbuminColors.appbar,
//     },
//     headerTintColor: AlbuminColors.text,
//   },
// };

export const commonStackConfig: StackNavigationOptions = {
  cardStyle: {
    backgroundColor: AlbuminColors.background
  },
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: AlbuminColors.appbar
  },
  headerTintColor: AlbuminColors.text
}

export const headerMode: StackHeaderMode = 'float'