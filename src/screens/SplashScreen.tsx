import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { LoginHelper } from '../helpers/LoginHelper';
import { NavigationScreenProps } from 'react-navigation';
import { Text } from 'react-native-paper';
import { AlbuminColors } from '../Theme';

interface Props extends NavigationScreenProps {
}

export default class SplashScreen extends Component<Props> {

	timeout?: number;

	onPressGo = () => {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
		
		this.navigate();

		return true;
	}

	navigate = async () => {
		const isLoggedIn = await LoginHelper.Instance.isLoggedIn();

		if (isLoggedIn) {
			this.props.navigation.navigate('HomeFlow');
		}
		else {
			this.props.navigation.navigate('LoginFlow');
		}
	}

	componentWillMount() {
		this.timeout = setTimeout(() => {
			this.onPressGo();
		}, 1500);
	}

	render() {
		return (
			<View style={styles.container} onStartShouldSetResponder={() => this.onPressGo()}>
					<Text style={styles.welcome}>Albumin Diet</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: AlbuminColors.background,
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
});
