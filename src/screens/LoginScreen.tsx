import React, { Component } from 'react';
import { StyleSheet, WebView, WebViewIOSLoadRequestEvent, Platform, NavState } from 'react-native';
import { LoginHelper } from '../helpers/LoginHelper';
import { NavigationScreenProps } from 'react-navigation';

// TODO: Loging flow shouldn't be done using a WebView

interface Props extends NavigationScreenProps {
}

export default class LoginScreen extends Component<Props> {

	isFinishingLogin = false;

	onLoad = (event: any) => {
		console.log(`onLoad`);
		console.log(event);
	}

	onLoadStart = (event: any) => {
		console.log(`onLoadStart`);
		console.log(event);
	}

	onLoadEnd = (event: any) => {
		console.log(`onLoadEnd`);
		console.log(event);
	}

	onError = (event: any) => {
		console.log(`onError`);
		console.log(event);
	}

	onNavigationStateChange = (event: NavState) => {
		console.log(`onNavigationStateChange`);
		console.log(event);

		if (Platform.OS !== 'android') return;

		//#region Android-only code
		if (!this.isFinishingLogin && LoginHelper.Instance.isLoginCallback(event.url)) {
			this.finishLogin(event.url!);
			return;
		}
		//#endregion
	}

	onShouldLoad = (event: WebViewIOSLoadRequestEvent) => {
		console.log(`onShouldLoad`);
		console.log(event);

		if (Platform.OS !== 'ios') return true;

		//#region iOS-only code
		if (LoginHelper.Instance.isLoginCallback(event.url)) {
			this.finishLogin(event.url);
			return false;
		}

		return true;
		//#endregion
	}

	finishLogin = async (url: string) => {
		console.log('Getting token');
		this.isFinishingLogin = true;

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
