import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationScreenProps, NavigationScreenOptions, FlatList } from 'react-navigation';
import { Searchbar } from 'react-native-paper';
import { MyNavigationScreenOptionsGetter } from 'react-navigation-types';
import { UserAlbum } from 'albumin-diet-types';
import AlbumCardWidget from '../widgets/AlbumCardWidget';
import { AlbumDetailNavigationParams } from './AlbumDetailScreen';
import { ConnectionHelper } from '../helpers/ConnectionHelper';

const WAIT_TIME: number = 500;

interface Props extends NavigationScreenProps {
}

interface State {
	query: string,
	albumDescriptors: UserAlbum[]
}

export default class SearchScreen extends Component<Props, State> {
	static navigationOptions: MyNavigationScreenOptionsGetter<NavigationScreenOptions> = (navigationOptions) => {
		return {
			title: 'Search',
		};
	}

	timeout?: NodeJS.Timeout;

	constructor(props: Props) {
		super(props);

		this.state = {
			query: "",
			albumDescriptors: []
		};
	}

	componentDidMount() {
	}

	componentWillUnmount() {
		if (this.timeout) clearTimeout(this.timeout);
	}

	search = async (query: string) => {
		try {
			const albumsResponse = await ConnectionHelper.Instance.searchAlbums(query);
			this.setState({ albumDescriptors: albumsResponse.data });
		}
		catch (error) {
			console.error('Error while searching albums');
			console.error(error);
		}
	};

	onTextChanged = (inputQuery: string) => {
		this.setState({ query: inputQuery });

		if (this.timeout) {
			clearTimeout(this.timeout); // clears the old timer
		}

		// When I clear the searchbar, I clear the result immediately
		if (!inputQuery || inputQuery.length === 0) {
			this.setState({ albumDescriptors: [] });
			return;
		}

		// I start the search with a debounce time
		this.timeout = setTimeout(() => this.search(inputQuery), WAIT_TIME);
	}

	goToDetail = (albumDescriptor: UserAlbum, elementId: string) => {
		const navigationParams: AlbumDetailNavigationParams = { albumDescriptor: albumDescriptor };
		this.props.navigation.navigate('AlbumDetail', navigationParams);
	}

	render() {
		return (
			<View style={styles.container}>
				<Searchbar
					placeholder="Search albums"
					onChangeText={this.onTextChanged}
					value={this.state.query}
				/>
				<FlatList
					style={styles.list}
					data={this.state.albumDescriptors}
					renderItem={({ item }) => <AlbumCardWidget onPress={this.goToDetail} style={styles.listItem} albumDescriptor={item} />}
					keyExtractor={(item, index) => item.album.id}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
