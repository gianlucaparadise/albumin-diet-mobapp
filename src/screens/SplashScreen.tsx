import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
// import { goToLogin, goToHome } from './navigation';
import { LoginHelper } from '../helpers/LoginHelper';

interface Props {
	componentId: string
}

export default class SplashScreen extends Component<Props> {
	componentDidAppear() {

	}

	onPressGo = async () => {
		const isLoggedIn = await LoginHelper.Instance.isLoggedIn();

		if (isLoggedIn) {
			// goToHome();
		}
		else {
			// goToLogin();
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
