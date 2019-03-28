import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, FAB, IconButton } from 'react-native-paper';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import AlbumCardWidget from '../widgets/AlbumCardWidget';
import { GetAlbumResponse, UserAlbum } from 'albumin-diet-types';
import AlbumDetailScreen, { AlbumDetailNavigationParams } from './AlbumDetailScreen';
import { NavigationScreenProps } from 'react-navigation';
import { NavigationScreenOptions } from 'react-navigation';
import { MyNavigationScreenOptionsGetter } from '../../types/react-navigation-types';

interface Props extends NavigationScreenProps {
}

interface State {
	albumDescriptors: UserAlbum[]
}

export default class MyAlbumsScreen extends Component<Props, State> {
	// TODO: add react-native-paper AppBar.Header as custom Header: https://hackernoon.com/how-to-use-a-custom-header-and-custom-bottom-tab-bar-for-react-native-with-react-navigation-969a5d3cabb1
	static navigationOptions: MyNavigationScreenOptionsGetter<NavigationScreenOptions> = (navigationOptions) => {
		return {
			title: 'Albums',
			headerRight: (
				<IconButton
					icon="filter-list"
					onPress={navigationOptions.navigation.getParam('onFilterClicked')}
				/>
			),
			// drawerLockMode: "unlocked" // If this worked, I would have enabled the side menu only in this page
		};
	}

	constructor(props: Props) {
		super(props);

		this.state = {
			albumDescriptors: []
		};
	}

	componentDidMount() {
		this.props.navigation.setParams({ onFilterClicked: this.onFilterClicked });
		this.getAlbums();
	}

	onFilterClicked = () => {
		console.log('Show filters');
		this.props.navigation.openDrawer();
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

	goToDetail = (albumDescriptor: UserAlbum, elementId: string) => {
		// Navigation.push(this.props.componentId, {
		// 	component: {
		// 		name: 'navigation.AlbumDetailScreen',
		// 		passProps: {
		// 			albumDescriptor: albumDescriptor
		// 		},
		// 		options: {
		// 			customTransition: {
		// 				animations: [
		// 					{ type: 'sharedElement', fromId: elementId, toId: AlbumDetailScreen.IMAGE_ELEMENT_ID, startDelay: 0, springVelocity: 0.2, duration: 0.5 }
		// 				],
		// 				duration: 0.8
		// 			}
		// 		}
		// 	}
		// });
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
