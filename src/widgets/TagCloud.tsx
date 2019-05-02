import React, { Component } from 'react';
import { StyleSheet, StyleProp, ViewStyle, View, NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';
import { ITag, TaggedAlbum } from 'albumin-diet-types';
import { AlbuminColors } from '../Theme';
import { Chip, TextInput } from 'react-native-paper';
import { ConnectionHelper } from '../helpers/ConnectionHelper';

interface Props {
	tags: ITag[],
	albumDescriptor: TaggedAlbum,
	/**
	 * This is the base style for the chips
	 */
	chipStyle?: StyleProp<ViewStyle>,
}

interface State {
	newTag: string
}

export default class TagCloud extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			newTag: ""
		};
	}

	componentDidMount() {
	}

	buildChip = (tag: ITag) => {
		return (
			<Chip
				key={tag.uniqueId}
				onClose={() => this.onDeleteTag(tag)}
				style={[styles.listItem, styles.chip, this.props.chipStyle]}
			>
				{tag.name}
			</Chip>
		);
	}

	onDeleteTag = async (tag: ITag) => {
		const albumId = this.props.albumDescriptor.album.id;

		const tagIndex = this.props.tags.indexOf(tag);
		this.props.tags.splice(tagIndex, 1);
		this.forceUpdate(); // FIXME: this is not a nice way to do this

		try {
			const result = await ConnectionHelper.Instance.deleteTagFromAlbum(tag.name, albumId);
		} catch (error) {
			this.props.tags.push(tag);
			this.forceUpdate(); // FIXME: this is not a nice way to do this

			console.error('Error while adding the tag');
			console.error(error);
		}
	}

	onTextInputSubmit = async (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
		const tag = { name: this.state.newTag, uniqueId: this.state.newTag };
		const albumId = this.props.albumDescriptor.album.id;

		try {
			this.props.tags.push(tag);
			this.setState({ newTag: '' });

			const result = await ConnectionHelper.Instance.addTagToAlbum(tag.name, albumId);
		} catch (error) {
			const tagIndex = this.props.tags.indexOf(tag);
			this.props.tags.splice(tagIndex, 1);
			this.forceUpdate(); // FIXME: this is not a nice way to do this

			console.error('Error while adding the tag');
			console.error(error);
		}
	}

	render() {
		const tagViews = this.props.tags.map(tag => this.buildChip(tag));

		return (
			<View style={styles.container}>
				{tagViews}
				<TextInput
					placeholder="Add tag"
					value={this.state.newTag}
					onChangeText={text => this.setState({ newTag: text })}
					onSubmitEditing={this.onTextInputSubmit}
					style={[styles.listItem, styles.textInput]}
				//  childStyle={styles.childStyle} // waiting for pull request #1021 to be merged
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	listItem: {
		margin: 2,
	},
	chip: {
		backgroundColor: AlbuminColors.chips,
	},
	textInput: {
		backgroundColor: 'transparent',
		minWidth: 80,
		alignSelf: 'stretch',
	},
	childStyle: {
		paddingVertical: 0,
		minHeight: 0,
	},
});

