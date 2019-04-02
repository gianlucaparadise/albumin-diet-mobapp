import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { ITag } from 'albumin-diet-types';
import { DrawerItemsProps } from 'react-navigation';

interface Props extends DrawerItemsProps {
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
		this.getTags();
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
		this.props.navigation.closeDrawer();
	}

	// https://codeburst.io/custom-drawer-using-react-navigation-80abbab489f7
	// navigateToScreen = (route) => () => {
	// 	const navigateAction = NavigationActions.navigate({
	// 	  routeName: route
	// 	});
	// 	this.props.navigation.dispatch(navigateAction);
	//   }

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
