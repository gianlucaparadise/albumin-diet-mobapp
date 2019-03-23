import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { ITag } from 'albumin-diet-types';

interface Props {
	componentId: string
}

interface State {
	tags: ITag[]
}

export default class TagsFilterScreen extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			tags: []
		};
	}

	componentDidMount() {
		Navigation.events().bindComponent(this);
		this.getTags();
	}

	componentDidAppear() {
	}

	getTags = async () => {
		try {
			const response = await ConnectionHelper.Instance.getTags();
			this.setState({ tags: response.data })
			console.log('Tags:');
			console.log(response);
		} catch (error) {
			console.error('Error while retrieving tags');
			console.error(error);
		}
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
