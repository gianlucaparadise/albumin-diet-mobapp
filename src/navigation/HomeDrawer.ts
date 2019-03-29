import { createDrawerNavigator } from "react-navigation";
import { HomeTabs } from "./HomeTabs";
import TagsFilterScreen from "../screens/TagsFilterScreen";

export const HomeDrawer = createDrawerNavigator(
	{
		HomeTabs: HomeTabs, // this is needed by the library, but it's never used
	},
	{
		drawerPosition: 'right',
		contentComponent: TagsFilterScreen,
		drawerLockMode: 'locked-closed', // this is enabled on in the correct page
	}
);