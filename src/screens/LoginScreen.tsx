import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { WebViewNavigation } from 'react-native-webview/lib/WebViewTypes';
import { LoginHelper } from '../helpers/LoginHelper';
import { NavigationSwitchScreenProps } from 'react-navigation';

interface Props extends NavigationSwitchScreenProps {}

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
      this.props.navigation.navigate('HomeFlow');
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
