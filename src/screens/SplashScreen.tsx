import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { StorageHelper } from '../helpers/StorageHelper';

interface Props {
	componentId: string
}

export default class SplashScreen extends Component<Props> {
	componentDidAppear() {

	}

	onPressGo = async () => {
		const isLoggedIn = await StorageHelper.Instance.getToken(); // TODO: move this logic in a separate helper

		if (isLoggedIn) {
			Navigation.push(this.props.componentId, {
				component: {
					name: 'navigation.HomeScreen'
				}
			});
		}
		else {
			Navigation.push(this.props.componentId, {
				component: {
					name: 'navigation.LoginScreen'
				}
			});
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
