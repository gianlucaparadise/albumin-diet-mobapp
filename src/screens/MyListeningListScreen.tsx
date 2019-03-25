import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
// import { Navigation } from 'react-native-navigation';

interface Props {
	componentId: string
}

export default class MyListeningListScreen extends Component<Props> {
	componentDidMount() {
		// Navigation.events().bindComponent(this);
	}

	componentDidAppear() {
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>My Listening List</Text>
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
