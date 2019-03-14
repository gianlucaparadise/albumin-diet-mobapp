import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, NativeSyntheticEvent } from 'react-native';
import { WebView, WebViewNavigation, WebViewError, WebViewIOSLoadRequestEvent } from "react-native-webview";

interface Props { }
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

		return true;
	}

	render() {
		return (
			<WebView
				source={{ uri: 'https://albumin-diet-engine.herokuapp.com/auth/spotify' }}
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
