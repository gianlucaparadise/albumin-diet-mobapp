import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { LoginHelper } from '../helpers/LoginHelper';
import { NavigationScreenProps } from 'react-navigation';
import { Text, Button } from 'react-native-paper';

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
				<Button onPress={this.logout}>Logout</Button>
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
