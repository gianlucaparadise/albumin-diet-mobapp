import React, { Component } from 'react';
import { StyleSheet, FlatList, StatusBar, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { ITag } from 'albumin-diet-types';
import { DrawerItemsProps, NavigationActions } from 'react-navigation';
import TagChip, { ITagSelectable } from '../widgets/TagChip';
import { AlbuminColors } from '../Theme';
import { NavigationState } from 'react-navigation';
import { MyAlbumsNavigationParams } from './MyAlbumsScreen';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducers/root.reducer';
import { loadTags } from '../redux/thunks/tag.thunk';

const UNTAGGED_NAME = 'Untagged';
const UNTAGGED_ID = 'untagged';

//#region Props
interface OwnProps extends DrawerItemsProps {

}

interface StateProps {
	tags: ITagSelectable[],
}

interface DispatchProps {
	loadTags: () => void
}

type Props = StateProps & DispatchProps & OwnProps;
//#endregion

interface State {
	selectedTags: ITagSelectable[]
}

const getActiveRouteState = function (route: NavigationState): NavigationState {
	if (!route.routes || route.routes.length === 0 || route.index >= route.routes.length) {
		return route;
	}

	const childActiveRoute = route.routes[route.index] as NavigationState;
	return getActiveRouteState(childActiveRoute);
}

class TagsFilterScreen extends Component<Props, State> {

	constructor(props: Props) {
		super(props);

		console.log(`StatusBar h: ${StatusBar.currentHeight}`);

		this.state = {
			selectedTags: [],
		};
	}

	componentDidMount() {
		this.props.loadTags();
	}

	componentDidUpdate(nextProps: Props) {
		if (this.props.tags !== nextProps.tags) {
			this.modifyTags(this.props.tags);
		}
	}

	/**
	 * This method appends the Untagged tag updates the selected prop with the correct state
	 */
	modifyTags = (allTags?: ITag[]) => {
		try {
			// TODO: should this be in thunk or actions?
			const allTagsSelectable = allTags as ITagSelectable[];

			// Injecting the Untagged special tag
			if (allTagsSelectable && allTagsSelectable.length > 0) {

				const hasUntaggedTag = allTagsSelectable.findIndex(t => t.uniqueId === UNTAGGED_ID) >= 0;

				if (!hasUntaggedTag) {
					const untaggedTag: ITagSelectable = { name: UNTAGGED_NAME, uniqueId: UNTAGGED_ID, selected: false };
					allTagsSelectable.unshift(untaggedTag);

					for (const tag of allTagsSelectable) {
						tag.selected = this.state.selectedTags.findIndex(selectedTag => selectedTag.uniqueId === tag.uniqueId) !== -1;
					}
				}
			}

			console.log('Tags:');
			console.log(allTags);
		} catch (error) {
			console.error('Error while retrieving tags');
			console.error(error);
		}
	}

	onOkPress = () => {
		let showUntagged = false;
		const tagIds = this.state.selectedTags.reduce((accumulator, tag) => {
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
		this.state.selectedTags.forEach(t => t.selected = false);

		this.setState({
			selectedTags: [tag]
		});
	}

	onTagDeselected = (tag: ITagSelectable) => {
		console.log(`Tag deselected: ${tag.uniqueId}`);
		const tagIndex = this.state.selectedTags.findIndex(t => t.uniqueId === tag.uniqueId);
		if (tagIndex <= -1) return;

		this.state.selectedTags[tagIndex].selected = false;
		this.state.selectedTags.splice(tagIndex, 1);
	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Button onPress={this.onOkPress}>Ok</Button>
				<FlatList
					style={styles.list}
					data={this.props.tags}
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

const mapStateToProps = (state: AppState): StateProps => ({
	tags: state.tagReducer.tags as ITagSelectable[]
});

//Map your action creators to your props.
const mapDispatchToProps: DispatchProps = {
	loadTags: loadTags,
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsFilterScreen);