import React, { Component, useContext, useEffect } from 'react';
import { StyleSheet, View, FlatList, Animated } from 'react-native';
import AlbumCardWidget from '../widgets/AlbumCardWidget';
import { UserAlbum } from 'albumin-diet-types';
import { AlbumDetailNavigationParams } from './AlbumDetailScreen';
import { AppState } from '../redux/reducers/root.reducer';
import { loadMyAlbums } from '../redux/thunks/my-albums.thunk';
import { loadMyAlbumsNext } from '../redux/thunks/my-albums.thunk';
import { connect } from 'react-redux';
import { HomeStackParamList } from '../navigation/HomeStacks';
import { StackScreenProps } from '@react-navigation/stack';
import { DrawerContext } from '../navigation/HomeDrawer';
import { useIsFocused } from '@react-navigation/native';
import { TagsFilterContext } from './TagsFilterScreen';

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

function MyAlbumsScreen(props: Props) {

  let scrollView: FlatList<UserAlbum>;
  let yOffset = new Animated.Value(0);
  let onScroll = Animated.event([
    { nativeEvent: { contentOffset: { y: yOffset } } },
  ], { useNativeDriver: false });

  const { selectedTagIds, untagged } = useContext(TagsFilterContext)

  const { setDrawerEnabled } = useContext(DrawerContext)
  const isFocused = useIsFocused();

  useEffect(() => {
    setDrawerEnabled(isFocused)
  }, [isFocused])

  useEffect(() => {
    getAlbums(selectedTagIds, untagged);
  }, [selectedTagIds, untagged])

  const getAlbums = (tags: string[], showUntagged: boolean) => {
    props.loadMyAlbums(tags, showUntagged);
  };

  /**
   * Here I append the next page
   */
  const onPageFinishing = function () {
    console.log('onPageFinishing');
    props.loadMyAlbumsNext();
  };

  const goToDetail = (albumDescriptor: UserAlbum, elementId: string) => {
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
    props.navigation.navigate('AlbumDetail', navigationParams);
  };

  return (
    <View>
      <FlatList
        ref={(v: FlatList<UserAlbum>) => {
          scrollView = v;
        }}
        style={styles.list}
        data={props.albumDescriptors}
        scrollEventThrottle={16}
        onScroll={onScroll}
        renderItem={({ item }) => (
          <AlbumCardWidget
            scrollView={scrollView}
            onPress={goToDetail}
            style={styles.listItem}
            albumDescriptor={item}
            yOffset={yOffset}
          />
        )}
        keyExtractor={(item, index) => item.album.id}
        onEndReached={onPageFinishing}
        onEndReachedThreshold={5}
      />
    </View>
  );
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

//#region Redux
const mapStateToProps = (state: AppState): StateProps => ({
  albumDescriptors: state.myAlbumsReducer.albumDescriptors || [],
});

//Map your action creators to your props.
const mapDispatchToProps: DispatchProps = {
  loadMyAlbums: loadMyAlbums,
  loadMyAlbumsNext: loadMyAlbumsNext,
};
//#endregion

export default connect(mapStateToProps, mapDispatchToProps)(MyAlbumsScreen);
