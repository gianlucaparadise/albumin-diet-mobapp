import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { UserAlbum } from 'albumin-diet-types';
import { Headline, Subheading } from 'react-native-paper';
import { TrackObjectSimplified } from 'spotify-web-api-node-typings';

interface Props {
	componentId: string,
	albumDescriptor: UserAlbum
}

export default class AlbumDetailScreen extends Component<Props> {
	static options(passProps: Props) {
		return {
			topBar: {
				title: {
					text: passProps.albumDescriptor.album.name
				},
			}
		};
	}

	public static readonly IMAGE_ELEMENT_ID = 'detailImage';

	componentDidMount() {
		Navigation.events().bindComponent(this);
	}

	componentDidAppear() {
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

	get totalTracks() {
		return this.props.albumDescriptor.album.tracks.total;
	}

	calculateDuration(trackList: TrackObjectSimplified[]) {
		let totalDuration = 0;
		for (const track of trackList) {
			totalDuration += track.duration_ms;
		}
		const date = new Date(0, 0, 0, 0, 0, 0, 0);
		date.setMilliseconds(totalDuration);

		return date;
	}

	timespanToString(timespan: Date) {
		const segments = [];

		const hours = timespan.getHours();
		if (hours > 0) {
			segments.push(`${hours}h`);
		}

		const minutes = timespan.getMinutes();
		if (minutes > 0) {
			segments.push(`${minutes}m`);
		}

		return segments.join(' ');
	}

	get totalDuration() {
		const timespan = this.calculateDuration(this.props.albumDescriptor.album.tracks.items);
		const duration = this.timespanToString(timespan);

		return duration;
	}

	render() {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<Navigation.Element elementId={AlbumDetailScreen.IMAGE_ELEMENT_ID}>
					<Image
						resizeMode="cover"
						style={styles.cover}
						source={{ uri: this.imageUrl }}
					/>
				</Navigation.Element>
				<View style={styles.space} />
				<Headline style={styles.text}>{this.albumName}</Headline>
				<Subheading style={styles.text}>{this.artistName}</Subheading>
				<Subheading style={styles.text}>{this.releaseYear}</Subheading>
				<Subheading style={styles.text}>{this.totalTracks} tracks - {this.totalDuration}</Subheading>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 15,
		alignItems: 'center'
	},
	cover: {
		width: '100%',
		aspectRatio: 1,
	},
	space: {
		height: 10,
		width: '100%'
	},
	text: {
		textAlign: 'center'
	}
});
