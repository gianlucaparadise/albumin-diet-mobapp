import React, { Component } from 'react';
import { StyleSheet, View, Animated, FlatList } from 'react-native';
import { UserAlbum } from 'albumin-diet-types';
import { AlbumDetailNavigationParams } from './AlbumDetailScreen';
import AlbumCardWidget from '../widgets/AlbumCardWidget';
import { AppState } from '../redux/reducers/root.reducer';
import { connect } from 'react-redux';
import { loadListeningList } from '../redux/thunks/listening-list.thunk';
import { loadListeningListNext } from '../redux/thunks/listening-list.thunk';
import { HomeStackParamList } from '../../src/navigation/HomeStacks';
import { StackScreenProps } from '@react-navigation/stack';

//#region Props
type NavigationProps = StackScreenProps<HomeStackParamList, "MyListeningList">

interface StateProps {
  albumDescriptors: UserAlbum[];
}

interface DispatchProps {
  loadListeningList: () => void;
  loadListeningListNext: () => void;
}

type Props = StateProps & DispatchProps & NavigationProps;
//#endregion

interface State { }

class MyListeningListScreen extends Component<Props, State> {

  scrollView?: FlatList<UserAlbum>;
  yOffset = new Animated.Value(0);
  onScroll = Animated.event([
    { nativeEvent: { contentOffset: { y: this.yOffset } } },
  ], { useNativeDriver: false });

  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.getListeningList();
  }

  getListeningList = async () => {
    this.props.loadListeningList();
  };

  /**
   * Here I append the next page
   */
  onPageFinishing = async () => {
    console.log('onPageFinishing');
    this.props.loadListeningListNext();
  };

  goToDetail = (albumDescriptor: UserAlbum, elementId: string) => {
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
  albumDescriptors: state.listeningListReducer.albumDescriptors,
});

//Map your action creators to your props.
const mapDispatchToProps: DispatchProps = {
  loadListeningList: loadListeningList,
  loadListeningListNext: loadListeningListNext,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyListeningListScreen);
