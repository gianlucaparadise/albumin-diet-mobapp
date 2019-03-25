import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, FAB } from 'react-native-paper';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import AlbumCardWidget from '../widgets/AlbumCardWidget';
import { GetAlbumResponse, UserAlbum } from 'albumin-diet-types';
import { Navigation } from 'react-native-navigation';
import AlbumDetailScreen from './AlbumDetailScreen';

interface Props {
	componentId: string
}

interface State {
	albumDescriptors: UserAlbum[]
}

export default class MyAlbumsScreen extends Component<Props, State> {
	static options(passProps: Props) {
		// Vector icons in topbar: https://github.com/wix/react-native-navigation/issues/43
		return {
			topBar: {
				rightButtons: [
					{
						id: 'filterButton',
						icon: require('./../../asset/icons/filter_list.png')
					}
				],
			}
		}
	}

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

	navigationButtonPressed(args: any) {
		if (args.buttonId === 'filterButton') {
			Navigation.mergeOptions('rightSideMenu', {
				sideMenu: {
					right: {
						visible: true
					}
				}
			});
		}
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
		Navigation.push(this.props.componentId, {
			component: {
				name: 'navigation.AlbumDetailScreen',
				passProps: {
					albumDescriptor: albumDescriptor
				},
				options: {
					customTransition: {
						animations: [
							{ type: 'sharedElement', fromId: elementId, toId: AlbumDetailScreen.IMAGE_ELEMENT_ID, startDelay: 0, springVelocity: 0.2, duration: 0.5 }
						],
						duration: 0.8
					}
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
