import React, { Component } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Chip } from 'react-native-paper';
import { TagDescriptor } from 'albumin-diet-types';
import { AlbuminColors } from '../Theme';

export interface ITagSelectable extends TagDescriptor {
	selected: boolean
}

interface Props {
	tag: ITagSelectable,
	onSelected?: (tag: ITagSelectable) => void,
	onDeselected?: (tag: ITagSelectable) => void,
	/**
	 * This is the base style
	 */
	style?: StyleProp<ViewStyle>,
	/**
	 * This is the selected style to be added to base input style
	 */
	selectedStyle?: StyleProp<ViewStyle>,
}

interface State {
	selected: boolean,
	style?: StyleProp<ViewStyle>,
}

export default class TagChip extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			selected: props.tag.selected,
			style: this.getStyle(props.tag),
		};
	}

	componentDidMount() {
	}

	/**
	 * This is called the first time the component is shown
	 */
	componentWillMount() {
		this.setState({
			selected: this.props.tag.selected,
			style: this.getStyle(this.props.tag),
		});
	}

	/**
	 * This is called every time the state change
	 */
	componentWillReceiveProps(nextProps: Props) {
		this.setState({
			selected: this.props.tag.selected,
			style: this.getStyle(this.props.tag),
		});
	}

	/**
	 * This determines whether a rendered post should get updated
	 */
	shouldComponentUpdate(nextProps: Props, nextState: State) {
		return nextState.selected !== this.state.selected;
	}

	/**
	 * Raise `onSelected` event or `onDeselected`
	 */
	notifyChange = (selected: boolean) => {
		if (selected && this.props.onSelected) {
			this.props.onSelected(this.props.tag);
		}

		if (!selected && this.props.onDeselected) {
			this.props.onDeselected(this.props.tag);
		}
	}

	getStyle = (tag: ITagSelectable) => {
		return tag.selected ? this.props.selectedStyle : null;
	}

	onTagPressed = () => {
		console.log(`Tag pressed: ${this.props.tag.tag.uniqueId}`);
		this.setState((prevState) => {
			const selected = !prevState.selected;
			this.props.tag.selected = selected;
			this.notifyChange(selected);

			return {
				selected: selected,
				style: this.getStyle(this.props.tag),
			};
		});
	}

	render() {
		return (
			<Chip
				selected={this.state.selected}
				style={[styles.listItem, this.props.style, this.state.style]}
				onPress={this.onTagPressed}>
				{this.props.tag.tag.name} ({this.props.tag.count})
			</Chip>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	list: {
		paddingLeft: 14,
		paddingRight: 14,
	},
	listItem: {
		backgroundColor: AlbuminColors.chips
	},
});
