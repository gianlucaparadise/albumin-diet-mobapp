import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
// import { Navigation } from 'react-native-navigation';
import { Button, Chip } from 'react-native-paper';
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
		// Navigation.events().bindComponent(this);
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
		// Navigation.mergeOptions('rightSideMenu', {
		// 	sideMenu: {
		// 		right: {
		// 			visible: false
		// 		}
		// 	}
		// });
	}

	onTagPressed = () => {
		console.log('Tag pressed');
	}

	render() {
		return (
			<View style={styles.container}>
				<Button onPress={this.onOkPress}>Ok</Button>
				<FlatList
					style={styles.list}
					data={this.state.tags}
					renderItem={({ item }) => <Chip style={styles.listItem} onPress={this.onTagPressed}>{item.name}</Chip>}
					keyExtractor={(item, index) => item.uniqueId}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	list: {
		paddingLeft: 14,
		paddingRight: 14,
	},
	listItem: {
		marginTop: 7,
		marginBottom: 7,
	},
});
