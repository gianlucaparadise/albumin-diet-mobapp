import { Navigation } from "react-native-navigation";

export const goToLogin = () => Navigation.setRoot({
	root: {
		stack: {
			id: 'LoginNavigator',
			children: [
				{
					component: {
						name: 'navigation.WelcomeScreen',
					}
				}
			],
		}
	}
});

export const goToHome = () => Navigation.setRoot({
	root: {
		bottomTabs: {
			id: 'MainNavigator',
			children: [
				{
					component: {
						name: 'navigation.MyAlbumsScreen',
						options: {
							bottomTab: {
								// fontSize: 12,
								text: 'Albums',
								// icon: require('./signin.png')
							}
						}
					},
				},
				{
					component: {
						name: 'navigation.MyListeningListScreen',
						options: {
							bottomTab: {
								// fontSize: 12,
								text: 'Listening List',
								// icon: require('./signin.png')
							}
						}
					},
				},
				{
					component: {
						name: 'navigation.SearchScreen',
						options: {
							bottomTab: {
								// fontSize: 12,
								text: 'Search',
								// icon: require('./signin.png')
							}
						}
					},
				},
				{
					component: {
						name: 'navigation.MyProfileScreen',
						options: {
							bottomTab: {
								// fontSize: 12,
								text: 'Profile',
								// icon: require('./signin.png')
							}
						}
					},
				},
			],
		}
	}
});