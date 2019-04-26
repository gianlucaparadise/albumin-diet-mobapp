import React, { Component } from 'react';
import { StyleSheet, StyleProp, ViewStyle, View, NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';
import { ITag } from 'albumin-diet-types';
import { AlbuminColors } from '../Theme';
import { Chip, TextInput } from 'react-native-paper';

interface Props {
	tags: ITag[],
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
				style={[styles.listItem, styles.chip, this.props.chipStyle]}
			>
				{tag.name}
			</Chip>
		);
	}

	onTextInputSubmit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
		this.props.tags.push({ name: this.state.newTag, uniqueId: this.state.newTag });
		this.setState({ newTag: '' });
		// TODO: make rest call to add tag
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

