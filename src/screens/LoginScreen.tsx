import React, { Component } from 'react';
import { StyleSheet, NativeSyntheticEvent } from 'react-native';
import { WebView, WebViewNavigation, WebViewError, WebViewIOSLoadRequestEvent } from "react-native-webview";
import { LoginHelper } from '../helpers/LoginHelper';
import { NavigationScreenProps } from 'react-navigation';

interface Props extends NavigationScreenProps {
}

export default class LoginScreen extends Component<Props> {
	onLoad = (event: NativeSyntheticEvent<WebViewNavigation>) => {
		console.log(`onLoad`);
		console.log(event);
	}

	onLoadStart = (event: NativeSyntheticEvent<WebViewNavigation>) => {
		console.log(`onLoadStart`);
		console.log(event);
	}

	onLoadEnd = (event: NativeSyntheticEvent<WebViewNavigation> | NativeSyntheticEvent<WebViewError>) => {
		console.log(`onLoadEnd`);
		console.log(event);
	}

	onError = (event: NativeSyntheticEvent<WebViewError>) => {
		console.log(`onError`);
		console.log(event);
	}

	onNavigationStateChange = (event: WebViewNavigation) => {
		console.log(`onNavigationStateChange`);
		console.log(event);
	}

	onShouldLoad = (event: WebViewIOSLoadRequestEvent) => {
		console.log(`onShouldLoad`);
		console.log(event);

		if (LoginHelper.Instance.isLoginCallback(event.url)) {
			this.finishLogin(event.url);
			return false;
		}

		return true;
	}

	finishLogin = async (url: string) => {
		console.log('Getting token');
		try {
			await LoginHelper.Instance.finishLogin(url);
			this.props.navigation.navigate('HomeFlow');
		}
		catch (ex) {
			console.error('Error while finishing login');
			console.error(ex);
		}
	}

	render() {
		return (
			<WebView
				source={{ uri: LoginHelper.Instance.loginUrl }}
				onLoad={this.onLoad}
				onLoadStart={this.onLoadStart}
				onLoadEnd={this.onLoadEnd}
				onError={this.onError}
				onShouldStartLoadWithRequest={this.onShouldLoad}
				onNavigationStateChange={this.onNavigationStateChange}
				style={{ marginTop: 20 }}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
});
