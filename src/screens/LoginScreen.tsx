import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { WebViewNavigation } from 'react-native-webview/lib/WebViewTypes';
import { LoginHelper } from '../helpers/LoginHelper';
import { StackNavigationProp } from '@react-navigation/Stack';
import { LoginStackParamList } from '../navigation/LoginStack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';

type LoginStackNavigationProps = StackNavigationProp<LoginStackParamList, 'Login'>;
type RootStackProps = StackNavigationProp<RootStackParamList>;
type Props = {
  navigation: CompositeNavigationProp<LoginStackNavigationProps, RootStackProps>;
  route: RouteProp<LoginStackParamList, 'Login'>;
}

export default class LoginScreen extends Component<Props> {
  onShouldLoad = (event: WebViewNavigation) => {
    console.log('onShouldLoad');
    console.log(event);

    if (LoginHelper.Instance.isLoginCallback(event.url)) {
      this.finishLogin(event.url);
      return false;
    }

    return true;
  };

  finishLogin = async (url: string) => {
    console.log('Getting token');
    try {
      await LoginHelper.Instance.finishLogin(url);
      this.props.navigation.navigate('HomeFlow', { screen: 'HomeTabs' });
    } catch (ex) {
      console.error('Error while finishing login');
      console.error(ex);
    }
  };

  render() {
    return (
      <WebView
        source={{ uri: LoginHelper.Instance.loginUrl }}
        onShouldStartLoadWithRequest={this.onShouldLoad}
      />
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
// });
