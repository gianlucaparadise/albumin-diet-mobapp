import React, { Component } from 'react';
import { StyleSheet, FlatList, StatusBar, SafeAreaView } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { ITag } from 'albumin-diet-types';
import { DrawerItemsProps, NavigationActions } from 'react-navigation';
import TagChip, { ITagSelectable } from '../widgets/TagChip';
import { AlbuminColors } from '../Theme';
import { NavigationState } from 'react-navigation';
import { MyAlbumsNavigationParams } from './MyAlbumsScreen';

const UNTAGGED_NAME = 'Untagged';
const UNTAGGED_ID = 'untagged';

interface Props extends DrawerItemsProps {
}

interface State {
	tags: ITagSelectable[],
}

const getActiveRouteState = function (route: NavigationState): NavigationState {
	if (!route.routes || route.routes.length === 0 || route.index >= route.routes.length) {
		return route;
	}

	const childActiveRoute = route.routes[route.index] as NavigationState;
	return getActiveRouteState(childActiveRoute);
}

export default class TagsFilterScreen extends Component<Props, State> {
	selectedTags: ITagSelectable[] = [];

	constructor(props: Props) {
		super(props);

		console.log(`StatusBar h: ${StatusBar.currentHeight}`);

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
			const allTags = response.data;

			// Injecting the Untagged special tag
			if (allTags && allTags.length > 0) {
				const untaggedTag: ITag = { name: UNTAGGED_NAME, uniqueId: UNTAGGED_ID };
				allTags.unshift(untaggedTag);
			}

			this.setState({ tags: allTags as ITagSelectable[] });
			this.selectedTags = [];

			console.log('Tags:');
			console.log(response);
		} catch (error) {
			console.error('Error while retrieving tags');
			console.error(error);
		}
	}

	onOkPress = () => {
		let showUntagged = false;
		const tagIds = this.selectedTags.reduce((accumulator, tag) => {
			// If Untagged is selected, I don't add it as a tag, but I remember it in a boolean
			if (tag.name === UNTAGGED_NAME) {
				showUntagged = true;
				return accumulator;
			}

			accumulator.push(tag.uniqueId);
			return accumulator;
		}, [] as string[]);

		const navigationParams: MyAlbumsNavigationParams = { tags: tagIds, untagged: showUntagged };

		const activeRoute = getActiveRouteState(this.props.navigation.state);
		const navigateAction = NavigationActions.setParams({
			params: navigationParams,
			key: activeRoute.key,
		});
		this.props.navigation.dispatch(navigateAction);
		this.props.navigation.closeDrawer();
	}

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
			<SafeAreaView style={styles.container}>
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
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
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
