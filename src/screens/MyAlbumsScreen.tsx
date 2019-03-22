import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import AlbumCardWidget from '../widgets/AlbumCardWidget';
import { GetAlbumResponse, UserAlbum } from 'albumin-diet-types';

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
		this.getAlbums();
	}

	getAlbums = async () => {
		try {
			console.log('retrieving albums');
			const albumsResponse = await ConnectionHelper.Instance.getAlbums(null, false);
			console.log(albumsResponse);
			this.setState({ albumDescriptors: albumsResponse.data });
		}
		catch (error) {
			console.error('Error while retrieving albums');
			console.error(error);
		}
	}

	render() {
		return (
			<FlatList
				style={styles.list}
				data={this.state.albumDescriptors}
				renderItem={({ item }) => <AlbumCardWidget style={styles.listItem} albumDescriptor={item} />}
				keyExtractor={(item, index) => item.album.id}
			/>
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
	}
});
