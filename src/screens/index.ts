import MyAlbumsScreen from './../screens/MyAlbumsScreen';
import MyListeningListScreen from './../screens/MyListeningListScreen';
import SearchScreen from './../screens/SearchScreen';
import MyProfileScreen from './../screens/MyProfileScreen';
import AlbumDetailScreen from './../screens/AlbumDetailScreen';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';

/**
 * These are the screens that can be navigated in the main part of the app (Home)
 */
export const homeScreens = {
  MyAlbums: MyAlbumsScreen,
  AlbumDetail: AlbumDetailScreen,
  MyListeningList: MyListeningListScreen,
  Search: SearchScreen,
  MyProfile: MyProfileScreen,
};

export const loginScreens = {
  Welcome: WelcomeScreen,
  Login: LoginScreen,
};
