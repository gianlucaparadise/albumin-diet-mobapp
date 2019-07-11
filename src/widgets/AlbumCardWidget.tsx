import React, { Component } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, Image, Animated, LayoutChangeEvent, FlatList, findNodeHandle } from 'react-native';
import ToggleIconButton from './ToggleIconButton';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { AlbuminColors } from '../Theme';
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

	/**
	 * Y Offset of the scrollview
	 */
	yOffset?: Animated.Value,
	/**
	 * parent scrollview or flatlist
	 */
	scrollView?: FlatList<UserAlbum>;
}

interface State {
	/**
	 * This property tells whether the egg button can be pressed or not
	 */
	canBeEgged: boolean,

	yScreenOffset: number,
}

export default class AlbumCardWidget extends Component<Props, State> {
	_isMounted = false;

	contentView?: View;
	viewHeight: number = 0;

	constructor(props: Props) {
		super(props);

		this.state = {
			canBeEgged: true,
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
								enabled={this.state.canBeEgged}
								onPress={this.onPressEgg}
							/>
						</Card.Actions>
					</Animated.View>
				</Card>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	content: {
		padding: 5,
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
	}
});
