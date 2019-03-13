import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

interface Props { }
export default class LoginScreen extends Component<Props> {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Login</Text>
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
