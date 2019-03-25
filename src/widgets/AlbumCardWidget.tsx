import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { UserAlbum } from 'albumin-diet-types';

interface Props {
	albumDescriptor: UserAlbum,
	onPress?: (albumDescriptor: UserAlbum) => any,
	style?: StyleProp<ViewStyle>
}

interface State {
}

export default class AlbumCardWidget extends Component<Props, State> {
	// constructor(props: Props) {
	// 	super(props);
	// }

	componentDidMount() {
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

	onPressed = () => {
		if (!this.props.onPress) return;
		this.props.onPress(this.props.albumDescriptor);
	}

	render() {
		return (
			<Card onPress={this.onPressed} style={this.props.style} elevation={3}>
				<Card.Cover source={{ uri: this.imageUrl }} />
				<Card.Content style={styles.content}>
					<Paragraph>{this.artistName}</Paragraph>
					<Paragraph>{this.releaseYear}</Paragraph>
					<Title>{this.albumName}</Title>
				</Card.Content>
				{/* <Card.Actions>
					<Button>Ok</Button>
				</Card.Actions> */}
			</Card>
		);
	}
}

const styles = StyleSheet.create({
	content: {
		marginTop: 5,
	},
	// image: {
	// 	resizeMode: 'cover',
	// }
});
