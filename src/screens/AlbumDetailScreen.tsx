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
import TrackList from '../widgets/TrackList';
import { AppState } from '../redux/reducers/root.reducer';
import { loadAlbum, unsaveAlbum, saveAlbum, addToListeningList, deleteFromListeningList } from '../redux/thunks/album-detail.thunk';
import { connect } from 'react-redux';
import { getCanBeEgged } from '../redux/reducers/album-detail.reducer';

//#region Props
interface OwnProps extends NavigationScreenProps {
}

interface StateProps {
	albumDescriptor?: TaggedAlbum,
	/**
	 * Can save to favorites?
	 */
	canSave: boolean,
	/**
	 * Can add to listening list?
	 */
	canBeEgged: boolean,
}

interface DispatchProps {
	loadAlbum: (albumDescriptor: TaggedAlbum) => void,
	unsaveAlbum: (albumDescriptor: TaggedAlbum) => void,
	saveAlbum: (albumDescriptor: TaggedAlbum) => void,
	addToListeningList: (albumDescriptor: TaggedAlbum) => void,
	deleteFromListeningList: (albumDescriptor: TaggedAlbum) => void,
}

type Props = StateProps & DispatchProps & OwnProps;
//#endregion

interface State {
}

export interface AlbumDetailNavigationParams {
	albumDescriptor: UserAlbum
}

class AlbumDetailScreen extends Component<Props, State> {
	static navigationOptions: MyNavigationScreenOptionsGetter<NavigationScreenOptions> = (navigationOptions) => {
		const albumDescriptor: UserAlbum = navigationOptions.navigation.getParam('albumDescriptor');
		const options: NavigationScreenOptions = { title: albumDescriptor.album.name };
		return options;
	};

	constructor(props: Props) {
		super(props);

		const albumDescriptor = this.props.navigation.getParam('albumDescriptor');
		this.props.loadAlbum(albumDescriptor);

		this.state = {
			canBeEgged: true,
		};
	}

	componentDidMount() {
	}

	get artistName() {
		return this.props.albumDescriptor ? this.props.albumDescriptor.album.artists[0].name : "";
	}

	get releaseYear() {
		const releaseDate = this.props.albumDescriptor ? this.props.albumDescriptor.album.release_date : "";
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
		return this.props.albumDescriptor ? this.props.albumDescriptor.album.images[0].url : "";
	}

	get albumName() {
		return this.props.albumDescriptor ? this.props.albumDescriptor.album.name : "";
	}

	get totalTracks() {
		return this.props.albumDescriptor ? this.props.albumDescriptor.album.tracks.total : 0;
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
		const timespan = this.calculateDuration(this.props.albumDescriptor ? this.props.albumDescriptor.album.tracks.items : []);
		const duration = this.timespanToString(timespan);

		return duration;
	}

	get albumId() {
		return this.props.albumDescriptor ? this.props.albumDescriptor.album.id : "";
	}

	get isSaved() {
		return this.props.albumDescriptor ? this.props.albumDescriptor.isSavedAlbum : false;
	}

	get isEgged() {
		return this.props.albumDescriptor ? this.props.albumDescriptor.isInListeningList : false;
	}

	onPressSave = () => {
		const albumDescriptor = this.props.albumDescriptor;
		if (!albumDescriptor) return;

		if (albumDescriptor.isSavedAlbum) {
			this.props.unsaveAlbum(albumDescriptor);
		} else {
			this.props.saveAlbum(albumDescriptor);
		}
	}

	onPressEgg = () => {
		const albumDescriptor = this.props.albumDescriptor;
		if (!albumDescriptor) return;

		if (albumDescriptor.isInListeningList) {
			this.props.deleteFromListeningList(albumDescriptor);
		} else {
			this.props.addToListeningList(albumDescriptor);
		}
	}

	renderTagCloud = () => {
		if (this.props.albumDescriptor && this.props.albumDescriptor.isSavedAlbum) {
			// const tags = [...this.state.albumDescriptor.tags, ...this.state.albumDescriptor.tags, ...this.state.albumDescriptor.tags];
			return (
				<View>
					<Headline style={styles.text}>Tags</Headline>
					<TagCloud tags={this.props.albumDescriptor.tags} albumDescriptor={this.props.albumDescriptor} />
				</View>
			);
		}
	}

	render() {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<Image
					resizeMode="cover"
					style={styles.cover}
					source={{ uri: this.imageUrl }}
				/>
				<View style={styles.space} />
				<Headline style={styles.text}>{this.albumName}</Headline>
				<Subheading style={styles.text}>{this.artistName}</Subheading>
				<Subheading style={styles.text}>{this.releaseYear}</Subheading>
				<Subheading style={styles.text}>{this.totalTracks} tracks - {this.totalDuration}</Subheading>
				<View style={styles.iconsContainer}>
					<ToggleIconButton
						type="save"
						selected={this.isSaved}
						enabled={this.props.canSave}
						onPress={this.onPressSave}
					/>
					<ToggleIconButton
						type="eggs"
						selected={this.isEgged}
						enabled={this.props.canBeEgged}
						onPress={this.onPressEgg}
					/>
				</View>
				<View style={styles.space} />
				{this.renderTagCloud()}
				<View style={styles.space} />
				<View style={styles.trackListContainer}>
					<Headline style={styles.text}>Tracks</Headline>
					<TrackList albumDescriptor={this.props.albumDescriptor}></TrackList>
				</View>
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
	},
	trackListContainer: {
		flex: 1,
		alignSelf: 'stretch'
	}
});

const mapStateToProps = (state: AppState): StateProps => ({
	albumDescriptor: state.albumDetailReducer.albumDescriptor,
	canSave: state.albumDetailReducer.canSave,
	canBeEgged: getCanBeEgged(state.albumDetailReducer.canAlbumBeEggedMap, state.albumDetailReducer.albumDescriptor),
});

//Map your action creators to your props.
const mapDispatchToProps: DispatchProps = {
	loadAlbum: loadAlbum,
	unsaveAlbum: unsaveAlbum,
	saveAlbum: saveAlbum,
	addToListeningList: addToListeningList,
	deleteFromListeningList: deleteFromListeningList,
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetailScreen);
