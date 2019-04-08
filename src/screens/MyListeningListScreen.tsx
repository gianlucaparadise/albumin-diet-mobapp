import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';
import { UserAlbum } from 'albumin-diet-types';
import { AlbumDetailNavigationParams } from './AlbumDetailScreen';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { MyNavigationScreenOptionsGetter } from 'react-navigation-types';
import { NavigationScreenOptions } from 'react-navigation';
import AlbumCardWidget from '../widgets/AlbumCardWidget';

interface Props extends NavigationScreenProps {
}

interface State {
	albumDescriptors: UserAlbum[]
}

export default class MyListeningListScreen extends Component<Props, State> {
	static navigationOptions: MyNavigationScreenOptionsGetter<NavigationScreenOptions> = (navigationOptions) => {
		return {
			title: 'Listening List',
		};
	}

	constructor(props: Props) {
		super(props);

		this.state = {
			albumDescriptors: []
		};
	}

	componentDidMount() {
		this.getListeningList();
	}

	getListeningList = async () => {
		try {
			const albumsResponse = await ConnectionHelper.Instance.getListeningList();
			this.setState({ albumDescriptors: albumsResponse.data });
		}
		catch (error) {
			console.error('Error while retrieving albums');
			console.error(error);
		}
	}

	goToDetail = (albumDescriptor: UserAlbum, elementId: string) => {
		const navigationParams: AlbumDetailNavigationParams = { albumDescriptor: albumDescriptor };
		this.props.navigation.navigate('AlbumDetail', navigationParams);
	}

	render() {
		return (
			<View>
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
	list: {
		paddingLeft: 14,
		paddingRight: 14,
	},
	listItem: {
		marginTop: 7,
		marginBottom: 7,
	},
});
