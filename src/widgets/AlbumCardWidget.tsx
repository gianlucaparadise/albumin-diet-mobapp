import React, { Component } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, Image, Animated, LayoutChangeEvent, FlatList, findNodeHandle } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { UserAlbum, TaggedAlbum } from 'albumin-diet-types';
import ToggleIconButton from './ToggleIconButton';
import { AlbuminColors } from '../Theme';
import { AppState } from '../redux/reducers/root.reducer';
import { addToListeningList, deleteFromListeningList } from '../redux/thunks/album-detail.thunk';
import { connect } from 'react-redux';
import { AlbumEggableMap, getCanBeEgged } from '../redux/reducers/album-detail.reducer';
// import { Navigation } from 'react-native-navigation';

//#region Props
interface OwnProps {
	albumDescriptor: UserAlbum,

	/**
	 * This callback gets called when the user clicks an album
	 * @param albumDescriptor Clicked album
	 * @param elementId Id for shared transition
	 */
	onPress?: (albumDescriptor: UserAlbum, elementId: string) => any,

	style?: StyleProp<ViewStyle>

	/**
	 * Y Offset of the scrollview
	 */
	yOffset?: Animated.Value,
	/**
	 * parent scrollview or flatlist
	 */
	scrollView?: FlatList<UserAlbum>;
}

interface StateProps {
	/**
	 * This property tells whether the egg button can be pressed or not
	 */
	canAlbumBeEggedMap: AlbumEggableMap,
}

interface DispatchProps {
	addToListeningList: (albumDescriptor: UserAlbum) => void,
	deleteFromListeningList: (albumDescriptor: UserAlbum) => void,
}

type Props = StateProps & DispatchProps & OwnProps;
//#endregion

interface State {
	yScreenOffset: number,
}

class AlbumCardWidget extends Component<Props, State> {
	_isMounted = false;

	contentView?: View;
	viewHeight: number = 0;

	constructor(props: Props) {
		super(props);

		this.state = {
			yScreenOffset: 0,
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

	onPressEgg = async () => {
		const albumDescriptor = this.props.albumDescriptor;
		if (!albumDescriptor) return;

		if (this.props.albumDescriptor.isInListeningList) {
			this.props.deleteFromListeningList(albumDescriptor);
		} else {
			this.props.addToListeningList(albumDescriptor);
		}
	}

	//#region Animation
	onLayout = (event: LayoutChangeEvent) => {
		this.viewHeight = event.nativeEvent.layout.height;

		if (this.contentView && this.props.scrollView) {
			const parentNode = findNodeHandle(this.props.scrollView);
			if (parentNode) {
				this.contentView.measureLayout(
					parentNode,
					this.onMeasured,
					() => { console.log(`measurament failed`) });
			}
		}
	};

	onMeasured = (left: number, top: number, width: number, height: number) => {
		this.setState({ yScreenOffset: top });
	};

	opacityTransform = (yScreenOffset: number) => {
		if (!this.props.yOffset) return {};

		return {
			opacity: this.props.yOffset.interpolate({
				inputRange: [
					yScreenOffset - this.viewHeight,
					yScreenOffset - this.viewHeight / 2,
					yScreenOffset,
					yScreenOffset + this.viewHeight / 2,
					yScreenOffset + this.viewHeight,
				],
				outputRange: [0.3, 0.7, 1, 0.7, 0.3],
				extrapolate: "clamp"
			})
		};
	}
	//#endregion

	renderTags() {
		const albumDescriptor = this.props.albumDescriptor as TaggedAlbum;
		if (albumDescriptor.tags) {
			return (
				<FlatList
					nestedScrollEnabled={true}
					showsHorizontalScrollIndicator={false}
					style={styles.tagList}
					horizontal={true}
					data={albumDescriptor.tags}
					// data={[...albumDescriptor.tags, ...albumDescriptor.tags, ...albumDescriptor.tags]}
					renderItem={({ item }) => (
						<View onStartShouldSetResponder={() => true}>
							<Chip
								textStyle={styles.listItemText}
								style={[styles.listItem]}>
								{item.name}
							</Chip>
						</View>
					)}
					keyExtractor={(item, index) => item.uniqueId}
					extraData={this.state}
				/>
			);
		}
	}

	render() {
		return (
			<View ref={(ref: View) => { this.contentView = ref }} onLayout={this.onLayout}>
				<Card onPress={this.onPressed} style={this.props.style} elevation={3}>
					<Image
						resizeMode="cover"
						style={styles.cover}
						source={{ uri: this.imageUrl }}
					/>
					<Animated.View style={[styles.content, this.opacityTransform(this.state.yScreenOffset)]}>
						<Text
							numberOfLines={1}
							ellipsizeMode={'tail'}
							style={styles.small}>
							{this.artistName}
						</Text>
						<Text
							numberOfLines={1}
							ellipsizeMode={'tail'}
							style={styles.small}>
							{this.releaseYear}
						</Text>
						<Text
							numberOfLines={2}
							ellipsizeMode={'tail'}
							style={styles.big}>
							{this.albumName}
						</Text>
						<Card.Actions>
							<ToggleIconButton
								type="eggs"
								selected={this.isInListeningList}
								enabled={getCanBeEgged(this.props.canAlbumBeEggedMap, this.props.albumDescriptor)}
								onPress={this.onPressEgg}
							/>
						</Card.Actions>
						{this.renderTags()}
					</Animated.View>
				</Card>
			</View>
		);
	}
}

const contentPadding = 5;
const styles = StyleSheet.create({
	content: {
		padding: contentPadding,
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: AlbuminColors.surfaceAlpha50,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	cover: {
		width: '100%',
		aspectRatio: 1,
		position: 'relative',
	},
	small: {
		fontSize: 20,
		textAlign: 'center'
	},
	big: {
		marginVertical: 5,
		fontSize: 40,
		textAlign: 'center',
	},
	tagList: {
		flexGrow: 0,
		marginHorizontal: -contentPadding
	},
	listItem: {
		backgroundColor: AlbuminColors.text,
		marginHorizontal: 5
	},
	listItemText: {
		color: AlbuminColors.chips,
	}
});

const mapStateToProps = (state: AppState): StateProps => ({
	canAlbumBeEggedMap: state.albumDetailReducer.canAlbumBeEggedMap,
});

//Map your action creators to your props.
const mapDispatchToProps: DispatchProps = {
	addToListeningList: addToListeningList,
	deleteFromListeningList: deleteFromListeningList,
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumCardWidget);
