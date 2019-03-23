import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, FAB } from 'react-native-paper';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import AlbumCardWidget from '../widgets/AlbumCardWidget';
import { GetAlbumResponse, UserAlbum } from 'albumin-diet-types';
import { Navigation } from 'react-native-navigation';

interface Props {
	componentId: string
}

interface State {
	albumDescriptors: UserAlbum[]
}

export default class MyAlbumsScreen extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			albumDescriptors: []
		};
	}

	componentDidMount() {
		Navigation.events().bindComponent(this);
		this.getAlbums();
	}

	componentDidAppear = () => {
		console.log('MyAlbums Appeared!');
		// If this worked, I would have enabled the side menu only in this page
		// Navigation.mergeOptions('sideMenu', {
		// 	sideMenu: {
		// 		right: {
		// 			enabled: true
		// 		}
		// 	}
		// });
	}

	componentDidDisappear = () => {
		console.log('MyAlbums Disappeared!');
		// If this worked, I would have enabled the side menu only in this page
		// Navigation.mergeOptions('sideMenu', {
		// 	sideMenu: {
		// 		right: {
		// 			enabled: false
		// 		}
		// 	}
		// });
	}

	getAlbums = async () => {
		try {
			const albumsResponse = await ConnectionHelper.Instance.getAlbums(null, false);
			this.setState({ albumDescriptors: albumsResponse.data });
		}
		catch (error) {
			console.error('Error while retrieving albums');
			console.error(error);
		}
	}

	onFabClick = () => {
		Navigation.mergeOptions('rightSideMenu', {
			sideMenu: {
				right: {
					visible: true
				}
			}
		});
	}

	render() {
		return (
			<View>
				<FlatList
					style={styles.list}
					data={this.state.albumDescriptors}
					renderItem={({ item }) => <AlbumCardWidget style={styles.listItem} albumDescriptor={item} />}
					keyExtractor={(item, index) => item.album.id}
				/>
				<FAB
					style={styles.fab}
					small
					icon="filter-list"
					accessibilityLabel="Filter by tag"
					onPress={this.onFabClick}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	list: {
		paddingLeft: 14,
		paddingRight: 14,
	},
	listItem: {
		marginTop: 7,
		marginBottom: 7,
	},
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
	}
});
