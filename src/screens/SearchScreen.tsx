import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Text } from 'react-native-paper';

interface Props extends NavigationScreenProps {
}

export default class SearchScreen extends Component<Props> {
	componentDidMount() {
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Search</Text>
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
