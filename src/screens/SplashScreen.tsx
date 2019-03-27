import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import { LoginHelper } from '../helpers/LoginHelper';
import { NavigationScreenProps } from 'react-navigation';

interface Props extends NavigationScreenProps {
}

export default class SplashScreen extends Component<Props> {
	componentDidAppear() {

	}

	onPressGo = async () => {
		const isLoggedIn = await LoginHelper.Instance.isLoggedIn();

		if (isLoggedIn) {
			this.props.navigation.navigate('HomeFlow');
		}
		else {
			this.props.navigation.navigate('LoginFlow');
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Albumin Diet</Text>
				<Button
					onPress={this.onPressGo}
					title="Go"
				/>
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
