import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, NativeSyntheticEvent } from 'react-native';
import { WebView, WebViewNavigation, WebViewError, WebViewIOSLoadRequestEvent } from "react-native-webview";
import { Navigation } from 'react-native-navigation';
import { SendTokenResponse } from 'albumin-diet-types';
import { StorageHelper } from '../helpers/StorageHelper';
import { goToHome } from './navigation';

interface Props {
	componentId: string
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

		// This should make it work on Android (https://stackoverflow.com/questions/39682445/prevent-webview-from-loading-url-in-android-react-native)
		// if (this.isLoginCallback(event.url)) {
		// 	this.finishLogin(event.url);

		// 	// this.refs[WEBVIEW_REF].stopLoading();
		// }
	}

	onShouldLoad = (event: WebViewIOSLoadRequestEvent) => {
		console.log(`onShouldLoad`);
		console.log(event);

		if (this.isLoginCallback(event.url)) {
			this.finishLogin(event.url);
			return false;
		}

		return true;
	}

	isLoginCallback = (url: string) => {
		return url.indexOf('/auth/spotify/callback') !== -1;
	}

	finishLogin = async (url: string) => {
		console.log('Getting token');
		try {
			let response = await fetch(url);
			console.log(response);
			if (response.status !== 200) {
				throw new Error(`Repsonse Error: ${response.status}`);
			}

			let body: SendTokenResponse = await response.json();
			StorageHelper.Instance.setToken(body.token); // I save the token

			goToHome();
		}
		catch (ex) {
			console.error('Error while finishing login');
			console.error(ex);
		}
	}

	render() {
		return (
			<WebView
				// source={{ uri: 'https://albumin-diet-engine.herokuapp.com/auth/spotify' }} // TODO: use a url factory
				source={{ uri: 'http://localhost:3000/auth/spotify' }} // TODO: use a url factory
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
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
});
