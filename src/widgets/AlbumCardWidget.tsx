import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StyleProp, ViewStyle, Image } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { UserAlbum } from 'albumin-diet-types';
import ToggleIconButton from './ToggleIconButton';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
// import { Navigation } from 'react-native-navigation';

interface Props {
	albumDescriptor: UserAlbum,

	/**
	 * This callback gets called when the user clicks an album
	 * @param albumDescriptor Clicked album
	 * @param elementId Id for shared transition
	 */
	onPress?: (albumDescriptor: UserAlbum, elementId: string) => any,

	style?: StyleProp<ViewStyle>
}

interface State {
	/**
	 * This property tells whether the egg button can be pressed or not
	 */
	canBeEgged: boolean,
}

export default class AlbumCardWidget extends Component<Props, State> {
	_isMounted = false;

	constructor(props: Props) {
		super(props);

		this.state = {
			canBeEgged: true
		}
	}

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	get artistName() {
		return this.props.albumDescriptor.album.artists[0].name;
	}

	get releaseYear() {
		const releaseDate = this.props.albumDescriptor.album.release_date;
		try {
			const date = new Date(releaseDate);
			return date.getFullYear();
		} catch (error) {
			console.error(`Error while parsing release date: ${releaseDate}`);
			console.error(error);
			return releaseDate;
		}
	}

	get imageUrl() {
		return this.props.albumDescriptor.album.images[0].url;
	}

	get albumName() {
		return this.props.albumDescriptor.album.name;
	}

	/**
	 * This is used for shared transition
	 */
	get elementId() {
		return `image${this.props.albumDescriptor.album.id}`;
	}

	get isInListeningList() {
		return this.props.albumDescriptor.isInListeningList;
	}

	onPressed = () => {
		if (!this.props.onPress) return;
		this.props.onPress(this.props.albumDescriptor, this.elementId);
	}

	//#region Listening List
	onPressEgg = async () => {
		this.setState({ canBeEgged: false });

		let isEgged: boolean;
		if (this.props.albumDescriptor.isInListeningList) {
			await this.uneggAlbum(this.props.albumDescriptor);
			isEgged = false;
		} else {
			await this.eggAlbum(this.props.albumDescriptor);
			isEgged = true;
		}

		this.props.albumDescriptor.isInListeningList = isEgged;
		
		if (this._isMounted) {
			this.setState({
				canBeEgged: true,
				//albumDescriptor: albumDescriptor
			});
		}
	}

	eggAlbum = async (albumDescriptor: UserAlbum) => {
		try {
			const response = await ConnectionHelper.Instance.addToListeningList(albumDescriptor);
			return response;
		}
		catch (error) {
			console.error(`Error while adding album to listening list`);
			console.error(error);
		}
	}

	uneggAlbum = async (albumDescriptor: UserAlbum) => {
		try {
			const response = await ConnectionHelper.Instance.deleteFromListeningList(albumDescriptor.album.id);
			return response
		}
		catch (error) {
			console.error(`Error while removing album from listening list`);
			console.error(error);
		}
	}
	//#endregion

	render() {
		return (
			<Card onPress={this.onPressed} style={this.props.style} elevation={3}>
				{/* <Navigation.Element elementId={this.elementId}> */}
				<Image
					resizeMode="cover"
					style={styles.cover}
					source={{ uri: this.imageUrl }}
				/>
				{/* </Navigation.Element> */}
				<Card.Content style={styles.content}>
					<Paragraph>{this.artistName}</Paragraph>
					<Paragraph>{this.releaseYear}</Paragraph>
					<Title>{this.albumName}</Title>
				</Card.Content>
				<Card.Actions>
					<ToggleIconButton
						type="eggs"
						selected={this.isInListeningList}
						enabled={this.state.canBeEgged}
						onPress={this.onPressEgg}
					/>
				</Card.Actions>
			</Card>
		);
	}
}

const styles = StyleSheet.create({
	content: {
		marginTop: 5,
	},
	cover: {
		width: '100%',
		aspectRatio: 1,
	}
});
