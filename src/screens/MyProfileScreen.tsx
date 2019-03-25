import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
// import { Navigation } from 'react-native-navigation';
import { LoginHelper } from '../helpers/LoginHelper';
import { goToLogin } from './navigation';

interface Props {
	componentId: string
}

export default class MyProfileScreen extends Component<Props> {
	componentDidMount() {
		// Navigation.events().bindComponent(this);
	}

	componentDidAppear() {
	}

	logout = async () => {
		try {
			await LoginHelper.Instance.logout();
			goToLogin();
		} catch (error) {
			console.error('Error while logging out');
			console.error(error);
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>My Profile</Text>
				<Button onPress={this.logout} title='Logout' />
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
