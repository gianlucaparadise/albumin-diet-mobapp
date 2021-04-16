import React, { Component } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Chip } from 'react-native-paper';
import { TagDescriptor } from 'albumin-diet-types';
import { AlbuminColors } from '../Theme';

interface Props {
  tag: TagDescriptor;
  onClick?: (tag: TagDescriptor) => void;
  /**
   * This is the base style
   */
  style?: StyleProp<ViewStyle>;
  /**
   * This is the selected style to be added to base input style
   */
  selectedStyle?: StyleProp<ViewStyle>;
  /**
   * This tells if the `selectedStyle` should be loaded or not
   */
  selected: boolean;
}

interface State {}

export default class TagChip extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  /**
   * Raise `onSelected` event or `onDeselected`
   */
  notifyChange = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.tag);
    }
  };

  getStyle = () => {
    return this.props.selected ? this.props.selectedStyle : null;
  };

  onTagPressed = () => {
    console.log(`Tag pressed: ${this.props.tag.tag.uniqueId}`);
    this.notifyChange();
  };

  render() {
    return (
      <Chip
        selected={this.props.selected}
        style={[styles.listItem, this.props.style, this.getStyle()]}
        onPress={this.onTagPressed}>
        {this.props.tag.tag.name} ({this.props.tag.count})
      </Chip>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingLeft: 14,
    paddingRight: 14,
  },
  listItem: {
    backgroundColor: AlbuminColors.chips,
  },
});
