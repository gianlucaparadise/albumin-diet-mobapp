import React, { Component } from 'react';
import { StyleSheet, StyleProp, ViewStyle, View } from 'react-native';
import { ITag, TaggedAlbum } from 'albumin-diet-types';
import { AlbuminColors } from '../Theme';
import { Chip, TextInput } from 'react-native-paper';
import { addTag, deleteTag } from '../redux/thunks/tag.thunk';
import { connect } from 'react-redux';

//#region Props
interface OwnProps {
  tags?: ITag[];
  albumDescriptor: TaggedAlbum;
  /**
   * This is the base style for the chips
   */
  chipStyle?: StyleProp<ViewStyle>;
}

interface StateProps {}

interface DispatchProps {
  addTag: (tagName: string, albumId: string) => void;
  deleteTag: (tag: ITag, albumId: string) => void;
}

type Props = StateProps & DispatchProps & OwnProps;
//#endregion

interface State {
  newTag: string;
}

class TagCloud extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      newTag: '',
    };
  }

  componentDidMount() {}

  onDeleteTag = async (tag: ITag) => {
    const albumId = this.props.albumDescriptor.album.id;
    this.props.deleteTag(tag, albumId);
  };

  onTextInputSubmit = async () => {
    const albumId = this.props.albumDescriptor.album.id;
    this.props.addTag(this.state.newTag, albumId);
    this.setState({ newTag: '' });
  };

  buildChip = (tag: ITag) => {
    return (
      <Chip
        key={tag.uniqueId}
        onClose={() => this.onDeleteTag(tag)}
        style={[styles.listItem, styles.chip, this.props.chipStyle]}>
        {tag.name}
      </Chip>
    );
  };

  renderTagViews = () => {
    return this.props.tags && this.props.tags.map((tag) => this.buildChip(tag));
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderTagViews()}
        <TextInput
          placeholder="Add tag"
          value={this.state.newTag}
          onChangeText={(text) => this.setState({ newTag: text })}
          onSubmitEditing={this.onTextInputSubmit}
          style={[styles.listItem, styles.textInput]}
          //  childStyle={styles.childStyle} // waiting for pull request #1020 to be merged
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  listItem: {
    margin: 2,
    height: 35, // when pull request #1020 will be merged, I will set "dense: true" and remove this prop
  },
  chip: {
    backgroundColor: AlbuminColors.chips,
  },
  textInput: {
    backgroundColor: 'transparent',
    minWidth: 80,
  },
  childStyle: {
    paddingVertical: 0,
    minHeight: 0,
  },
});

const mapStateToProps = (): StateProps => ({});

//Map your action creators to your props.
const mapDispatchToProps: DispatchProps = {
  addTag: addTag,
  deleteTag: deleteTag,
};

export default connect(mapStateToProps, mapDispatchToProps)(TagCloud);
