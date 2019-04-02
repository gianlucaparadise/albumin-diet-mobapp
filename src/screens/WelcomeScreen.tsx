import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Text, Button } from 'react-native-paper';

interface Props extends NavigationScreenProps {
}

export default class WelcomeScreen extends Component<Props> {
	goToLogin = () => {
		this.props.navigation.navigate('Login');
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Welcome</Text>
				<Text style={styles.welcome}>You need to login to use the app</Text>
				<Button onPress={this.goToLogin}>Login</Button>
			</View>
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
