import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { UserAlbum, TaggedAlbum } from 'albumin-diet-types';
import { Headline, Subheading } from 'react-native-paper';
import { TrackObjectSimplified } from 'spotify-web-api-node-typings';
import { NavigationScreenProps } from 'react-navigation';
import { MyNavigationScreenOptionsGetter } from '../../types/react-navigation-types';
import { NavigationScreenOptions } from 'react-navigation';
import TagCloud from '../widgets/TagCloud';
import ToggleIconButton from '../widgets/ToggleIconButton';
import { ConnectionHelper } from '../helpers/ConnectionHelper';

interface Props extends NavigationScreenProps {
}

interface State {
	albumDescriptor: TaggedAlbum,
	/**
	 * Can save to favorites?
	 */
	canSave: boolean,
	/**
	 * Can add to listening list?
	 */
	canBeEgged: boolean,
}

export interface AlbumDetailNavigationParams {
	albumDescriptor: UserAlbum
}

export default class AlbumDetailScreen extends Component<Props, State> {
	static navigationOptions: MyNavigationScreenOptionsGetter<NavigationScreenOptions> = (navigationOptions) => {
		const albumDescriptor: UserAlbum = navigationOptions.navigation.getParam('albumDescriptor');
		const options: NavigationScreenOptions = { title: albumDescriptor.album.name };
		return options;
	};

	// public static readonly IMAGE_ELEMENT_ID = 'detailImage';

	constructor(props: Props) {
		super(props);

		const albumDescriptor = this.props.navigation.getParam('albumDescriptor');
		this.state = {
			albumDescriptor: albumDescriptor,
			canSave: true,
			canBeEgged: true,
		};
	}

	componentDidMount() {
		this.getAlbum(this.albumId);
	}

	getAlbum = async (spotifyId: string) => {
		try {
			const albumsResponse = await ConnectionHelper.Instance.getAlbum(spotifyId);
			const albumDescriptor = albumsResponse.data;

			this.setState({
				albumDescriptor: albumDescriptor,
				canBeEgged: true,
				canSave: true,
			});
		}
		catch (error) {
			console.error('Error while retrieving the album');
			console.error(error);
		}
	}

	get artistName() {
		return this.state.albumDescriptor.album.artists[0].name;
	}

	get releaseYear() {
		const releaseDate = this.state.albumDescriptor.album.release_date;
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
		return this.state.albumDescriptor.album.images[0].url;
	}

	get albumName() {
		return this.state.albumDescriptor.album.name;
	}

	get totalTracks() {
		return this.state.albumDescriptor.album.tracks.total;
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
		const timespan = this.calculateDuration(this.state.albumDescriptor.album.tracks.items);
		const duration = this.timespanToString(timespan);

		return duration;
	}

	get albumId() {
		return this.state.albumDescriptor.album.id;
	}

	//#region Saving
	onPressSave = async () => {
		this.setState({ canSave: false });
		const albumDescriptor = this.state.albumDescriptor;

		let isSaved: boolean;
		if (albumDescriptor.isSavedAlbum) {
			await this.unsaveAlbum();
			isSaved = false;
		} else {
			await this.saveAlbum();
			isSaved = true;
		}

		albumDescriptor.isSavedAlbum = isSaved;

		this.setState({
			canSave: true,
			albumDescriptor: albumDescriptor
		});
	}

	saveAlbum = async () => {
		try {
			const response = ConnectionHelper.Instance.saveAlbum(this.albumId);
			return response;
		}
		catch (error) {
			console.error(`Error while saving album`);
			console.error(error);
		}
	}

	unsaveAlbum = async () => {
		try {
			const response = ConnectionHelper.Instance.unsaveAlbum(this.albumId);
			return response;
		}
		catch (error) {
			console.error(`Error while unsaving album`);
			console.error(error);
		}
	}
	//#endregion

	onPressEgg = () => {
		const albumDescriptor = this.state.albumDescriptor;
		albumDescriptor.isInListeningList = !albumDescriptor.isInListeningList;

		this.setState({ albumDescriptor: albumDescriptor });
	}

	renderTagCloud = () => {
		if (this.state.albumDescriptor.isSavedAlbum) {
			// const tags = [...this.state.albumDescriptor.tags, ...this.state.albumDescriptor.tags, ...this.state.albumDescriptor.tags];
			return (
				<View style={{ display: 'flex' }}>
					<Headline style={styles.text}>Tags</Headline>
					<TagCloud tags={this.state.albumDescriptor.tags} albumDescriptor={this.state.albumDescriptor} />
				</View>
			);
		}
	}

	render() {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				{/* <Navigation.Element elementId={AlbumDetailScreen.IMAGE_ELEMENT_ID}> */}
				<Image
					resizeMode="cover"
					style={styles.cover}
					source={{ uri: this.imageUrl }}
				/>
				{/* </Navigation.Element> */}
				<View style={styles.space} />
				<Headline style={styles.text}>{this.albumName}</Headline>
				<Subheading style={styles.text}>{this.artistName}</Subheading>
				<Subheading style={styles.text}>{this.releaseYear}</Subheading>
				<Subheading style={styles.text}>{this.totalTracks} tracks - {this.totalDuration}</Subheading>
				<View style={styles.iconsContainer}>
					<ToggleIconButton
						type="save"
						selected={this.state.albumDescriptor.isSavedAlbum}
						enabled={this.state.canSave}
						onPress={this.onPressSave}
					/>
					<ToggleIconButton
						type="eggs"
						selected={this.state.albumDescriptor.isInListeningList}
						enabled={this.state.canBeEgged}
						onPress={this.onPressEgg}
					/>
				</View>
				<View style={styles.space} />
				{this.renderTagCloud()}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 15,
		alignItems: 'center'
	},
	iconsContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
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
