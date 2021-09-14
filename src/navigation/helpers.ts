import { AlbuminColors } from '../Theme';
import { StackNavigationOptions } from '@react-navigation/stack';

export const commonStackConfig: StackNavigationOptions = {
    cardStyle: {
        backgroundColor: AlbuminColors.background
    },
    headerBackTitleVisible: false,
    headerStyle: {
        backgroundColor: AlbuminColors.appbar,
    },
    headerTintColor: AlbuminColors.text,
}