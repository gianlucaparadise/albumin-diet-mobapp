import React, { Component } from 'react';
import { StyleSheet, View, Animated, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { UserAlbum } from 'albumin-diet-types';
import AlbumCardWidget from '../widgets/AlbumCardWidget';
import { AlbumDetailNavigationParams } from './AlbumDetailScreen';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducers/root.reducer';
import {
  loadSearch,
  clearSearch,
  loadSearchNext,
} from '../redux/thunks/search.thunk';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParamList } from '../navigation/HomeStacks';

const WAIT_TIME: number = 500;

//#region Props
type NavigationProps = StackScreenProps<HomeStackParamList, "Search">

interface StateProps {
  albumDescriptors: UserAlbum[];
}

interface DispatchProps {
  loadSearch: (query: string) => void;
  loadSearchNext: () => void;
  clearSearch: () => void;
}

type Props = StateProps & DispatchProps & NavigationProps;
//#endregion

interface State {
  query: string;
}

class SearchScreen extends Component<Props, State> {

  timeout?: number;

  scrollView?: FlatList<UserAlbum>;
  yOffset = new Animated.Value(0);
  onScroll = Animated.event([
    { nativeEvent: { contentOffset: { y: this.yOffset } } },
  ], { useNativeDriver: false });

  constructor(props: Props) {
    super(props);

    this.state = {
      query: '',
    };
  }

  componentDidMount() { }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  search = (query: string) => {
    this.props.loadSearch(query);
  };

  /**
   * Here I append the next page
   */
  onPageFinishing = () => {
    console.log('onPageFinishing');
    this.props.loadSearchNext();
  };

  onTextChanged = (inputQuery: string) => {
    this.setState({ query: inputQuery });

    if (this.timeout) {
      clearTimeout(this.timeout); // clears the old timer
    }

    // When I clear the searchbar, I clear the result immediately
    if (!inputQuery || inputQuery.length === 0) {
      this.props.clearSearch();
      return;
    }

    // I start the search with a debounce time
    this.timeout = setTimeout(() => this.search(inputQuery), WAIT_TIME);
  };

  goToDetail = (albumDescriptor: UserAlbum) => {
    const navigationParams: AlbumDetailNavigationParams = {
      albumDescriptor: albumDescriptor,
    };
    this.props.navigation.navigate('AlbumDetail', navigationParams);
  };

  render() {
    return (
      <View style={styles.container}>
        <Searchbar
          placeholder="Search albums"
          onChangeText={this.onTextChanged}
          value={this.state.query}
        />
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
          keyExtractor={(item) => item.album.id}
          onEndReached={this.onPageFinishing}
          onEndReachedThreshold={5}
        />
      </View>
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
    marginTop: 7,
    marginBottom: 7,
  },
});

const mapStateToProps = (state: AppState): StateProps => ({
  albumDescriptors: state.searchReducer.albumDescriptors || [],
});

//Map your action creators to your props.
const mapDispatchToProps: DispatchProps = {
  loadSearch: loadSearch,
  loadSearchNext: loadSearchNext,
  clearSearch: clearSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
