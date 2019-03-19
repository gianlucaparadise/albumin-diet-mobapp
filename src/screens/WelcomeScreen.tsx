import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import { Navigation } from 'react-native-navigation';

interface Props {
	componentId: string
}

export default class WelcomeScreen extends Component<Props> {
	componentDidAppear() {

	}

	goToLogin = () => {
		Navigation.push(this.props.componentId, {
			component: {
				name: 'navigation.LoginScreen'
			}
		})
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Welcome</Text>
				<Text style={styles.welcome}>You need to login to use the app</Text>
				<Button onPress={this.goToLogin} title='Login' />
			</View>
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
