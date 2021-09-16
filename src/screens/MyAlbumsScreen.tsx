import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Animated } from 'react-native';
import { IconButton } from 'react-native-paper';
import AlbumCardWidget from '../widgets/AlbumCardWidget';
import { UserAlbum } from 'albumin-diet-types';
import { AlbumDetailNavigationParams } from './AlbumDetailScreen';
import { AppState } from '../redux/reducers/root.reducer';
import { loadMyAlbums } from '../redux/thunks/my-albums.thunk';
import { loadMyAlbumsNext } from '../redux/thunks/my-albums.thunk';
import { connect } from 'react-redux';
import { HomeStackParamList } from '../../src/navigation/HomeStacks';
import { StackScreenProps } from '@react-navigation/stack';

//#region Props
type NavigationProps = StackScreenProps<HomeStackParamList, "MyAlbums">

interface StateProps {
  albumDescriptors: UserAlbum[];
}

interface DispatchProps {
  loadMyAlbums: (tags: string[], showUntagged: boolean) => void;
  loadMyAlbumsNext: () => void;
}

type Props = StateProps & DispatchProps & NavigationProps;
//#endregion

interface State { }

export interface MyAlbumsNavigationParams {
  /**
   * List of tag uniqueIds to use as a filter
   */
  tags: string[];
  /**
   * True if you want all the albums that are without tags
   */
  untagged: boolean;
}

class MyAlbumsScreen extends Component<Props, State> {

  scrollView?: FlatList<UserAlbum>;
  yOffset = new Animated.Value(0);
  onScroll = Animated.event([
    { nativeEvent: { contentOffset: { y: this.yOffset } } },
  ], { useNativeDriver: false });

  selectedTags: string[] = [];
  showUntagged: boolean = false;

  constructor(props: any) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.getAlbums(this.selectedTags, this.showUntagged);
  }

  componentDidUpdate() {
    const untagged: boolean = this.props.route.params?.untagged ?? false;

    const inputTags: string[] = this.props.route.params?.tags ?? [];
    const inputTag = inputTags ? inputTags[0] : null;
    const selectedTag = this.selectedTags ? this.selectedTags[0] : null;

    if (inputTag !== selectedTag || this.showUntagged !== untagged) {
      this.selectedTags = inputTags;
      this.showUntagged = untagged;
      this.getAlbums(this.selectedTags, this.showUntagged);
    }
  }

  getAlbums = (tags: string[], showUntagged: boolean) => {
    this.props.loadMyAlbums(tags, showUntagged);
  };

  /**
   * Here I append the next page
   */
  onPageFinishing = () => {
    console.log('onPageFinishing');
    this.props.loadMyAlbumsNext();
  };

  goToDetail = (albumDescriptor: UserAlbum, elementId: string) => {
    // Navigation.push(this.props.componentId, {
    // 	component: {
    // 		name: 'navigation.AlbumDetailScreen',
    // 		passProps: {
    // 			albumDescriptor: albumDescriptor
    // 		},
    // 		options: {
    // 			customTransition: {
    // 				animations: [
    // 					{ type: 'sharedElement', fromId: elementId, toId: AlbumDetailScreen.IMAGE_ELEMENT_ID, startDelay: 0, springVelocity: 0.2, duration: 0.5 }
    // 				],
    // 				duration: 0.8
    // 			}
    // 		}
    // 	}
    // });
    const navigationParams: AlbumDetailNavigationParams = {
      albumDescriptor: albumDescriptor,
    };
    this.props.navigation.navigate('AlbumDetail', navigationParams);
  };

  render() {
    return (
      <View>
        <FlatList
          ref={(v: FlatList<UserAlbum>) => {
            this.scrollView = v;
          }}
          style={styles.list}
          data={this.props.albumDescriptors}
          scrollEventThrottle={16}
          onScroll={this.onScroll}
          renderItem={({ item }) => (
            <AlbumCardWidget
              scrollView={this.scrollView}
              onPress={this.goToDetail}
              style={styles.listItem}
              albumDescriptor={item}
              yOffset={this.yOffset}
            />
          )}
          keyExtractor={(item, index) => item.album.id}
          onEndReached={this.onPageFinishing}
          onEndReachedThreshold={5}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    paddingLeft: 14,
    paddingRight: 14,
  },
  listItem: {
    marginTop: 7,
    marginBottom: 7,
  },
});

const mapStateToProps = (state: AppState): StateProps => ({
  albumDescriptors: state.myAlbumsReducer.albumDescriptors || [],
});

//Map your action creators to your props.
const mapDispatchToProps: DispatchProps = {
  loadMyAlbums: loadMyAlbums,
  loadMyAlbumsNext: loadMyAlbumsNext,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAlbumsScreen);
