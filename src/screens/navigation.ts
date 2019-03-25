// import { Navigation } from "react-native-navigation";

// Custom bottomnavigation: https://github.com/wix/react-native-navigation/issues/498#issuecomment-456218215
// Custom navbar: https://wix.github.io/react-native-navigation/#/docs/options-migration?id=navbarcustomview

// export const goToLogin = () => Navigation.setRoot({
// 	root: {
// 		stack: {
// 			id: 'LoginNavigator',
// 			children: [
// 				{
// 					component: {
// 						name: 'navigation.WelcomeScreen',
// 					}
// 				}
// 			],
// 		}
// 	}
// });

// export const goToHome = () => Navigation.setRoot({
// 	root: {
// 		sideMenu: {
// 			id: 'sideMenu',
// 			options: {
// 				sideMenu: {
// 					right: {
// 						// this is enabled on in the correct page
// 						enabled: false
// 					}
// 				}
// 			},
// 			center: {
// 				bottomTabs: {
// 					id: 'MainNavigator',
// 					children: [
// 						{
// 							stack: {
// 								children: [
// 									{
// 										component: {
// 											name: 'navigation.MyAlbumsScreen',
// 											options: {
// 												bottomTab: {
// 													// fontSize: 12,
// 													text: 'Albums',
// 													icon: require('./../../asset/icons/album.png')
// 												}
// 											}
// 										}
// 									}
// 								]
// 							},
// 						},
// 						{
// 							component: {
// 								name: 'navigation.MyListeningListScreen',
// 								options: {
// 									bottomTab: {
// 										// fontSize: 12,
// 										text: 'Listening List',
// 										icon: require('./../../asset/icons/album.png')
// 									}
// 								}
// 							},
// 						},
// 						{
// 							component: {
// 								name: 'navigation.SearchScreen',
// 								options: {
// 									bottomTab: {
// 										// fontSize: 12,
// 										text: 'Search',
// 										icon: require('./../../asset/icons/search.png')
// 									}
// 								}
// 							},
// 						},
// 						{
// 							component: {
// 								name: 'navigation.MyProfileScreen',
// 								options: {
// 									bottomTab: {
// 										// fontSize: 12,
// 										text: 'Profile',
// 										icon: require('./../../asset/icons/person.png')
// 									}
// 								}
// 							},
// 						},
// 					],
// 				}
// 			},
// 			right: {
// 				component: {
// 					name: 'navigation.TagsFilterScreen',
// 					id: 'rightSideMenu'
// 				}
// 			}
// 		},
// 	}
// });