import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Button } from 'react-native-paper';

interface Props {
	componentId: string
}

export default class TagsFilterScreen extends Component<Props> {
	componentDidMount() {
		Navigation.events().bindComponent(this);
	}

	componentDidAppear() {
	}

	onOkPress = () => {
		Navigation.mergeOptions('rightSideMenu', {
			sideMenu: {
				right: {
					visible: false
				}
			}
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Tags Filter</Text>
				<Button onPress={this.onOkPress}>Ok</Button>
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
