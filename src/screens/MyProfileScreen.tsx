import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import { LoginHelper } from '../helpers/LoginHelper';
import { NavigationScreenProps } from 'react-navigation';

interface Props extends NavigationScreenProps {
}

export default class MyProfileScreen extends Component<Props> {
	componentDidMount() {
	}

	logout = async () => {
		try {
			await LoginHelper.Instance.logout();
			this.props.navigation.navigate('LoginFlow');
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
