import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { ITag } from 'albumin-diet-types';
import { DrawerItemsProps } from 'react-navigation';
import TagChip, { ITagSelectable } from '../widgets/TagChip';
import { AlbuminColors } from '../Theme';

interface Props extends DrawerItemsProps {
}

interface State {
	tags: ITagSelectable[],
}

export default class TagsFilterScreen extends Component<Props, State> {
	selectedTags: ITagSelectable[] = [];

	constructor(props: Props) {
		super(props);

		this.state = {
			tags: [],
		};
	}

	componentDidMount() {
		this.getTags();
	}

	getTags = async () => {
		try {
			const response = await ConnectionHelper.Instance.getTags();
			this.setState({ tags: response.data as ITagSelectable[] });
			this.selectedTags = [];
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

	onTagSelected = (tag: ITagSelectable) => {
		// I deselect previous selected tags
		this.selectedTags.forEach(t => t.selected = false);
		this.selectedTags = [tag];

		this.setState({
			tags: this.state.tags
		});
	}

	onTagDeselected = (tag: ITagSelectable) => {
		console.log(`Tag deselected: ${tag.uniqueId}`);
		const tagIndex = this.selectedTags.findIndex(t => t.uniqueId === tag.uniqueId);
		if (tagIndex <= -1) return;

		this.selectedTags[tagIndex].selected = false;
		this.selectedTags.splice(tagIndex, 1);
	}

	render() {
		return (
			<View style={styles.container}>
				<Button onPress={this.onOkPress}>Ok</Button>
				<FlatList
					style={styles.list}
					data={this.state.tags}
					renderItem={({ item }) => (
						<TagChip
							tag={item}
							onSelected={this.onTagSelected}
							onDeselected={this.onTagDeselected}
							style={styles.listItem}
							selectedStyle={styles.selectedListItem} />
					)}
					keyExtractor={(item, index) => item.uniqueId}
					extraData={this.state}
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
	selectedListItem: {
		backgroundColor: AlbuminColors.primary
	},
});
