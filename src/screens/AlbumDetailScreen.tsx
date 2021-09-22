import React, { Component, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Linking,
  Platform,
} from 'react-native';
import { UserAlbum, TaggedAlbum } from 'albumin-diet-types';
import { Headline, Subheading, Button } from 'react-native-paper';
import { TrackObjectSimplified } from 'spotify-web-api-node-typings';
import TagCloud from '../widgets/TagCloud';
import ToggleIconButton from '../widgets/ToggleIconButton';
import TrackList from '../widgets/TrackList';
import { AppState } from '../redux/reducers/root.reducer';
import {
  loadAlbum,
  unsaveAlbum,
  saveAlbum,
  addToListeningList,
  deleteFromListeningList,
} from '../redux/thunks/album-detail.thunk';
import { connect } from 'react-redux';
import { getCanBeEgged } from '../redux/reducers/album-detail.reducer';
import { HomeStackParamList } from '../navigation/HomeStacks';
import { StackScreenProps } from '@react-navigation/stack';

//#region Props
type NavigationProps = StackScreenProps<HomeStackParamList, 'AlbumDetail'>

interface StateProps {
  albumDescriptor?: TaggedAlbum;
  /**
   * Can save to favorites?
   */
  canSave: boolean;
  /**
   * Can add to listening list?
   */
  canBeEgged: boolean;
}

interface DispatchProps {
  loadAlbum: (albumDescriptor: TaggedAlbum) => void;
  unsaveAlbum: (albumDescriptor: TaggedAlbum) => void;
  saveAlbum: (albumDescriptor: TaggedAlbum) => void;
  addToListeningList: (albumDescriptor: TaggedAlbum) => void;
  deleteFromListeningList: (albumDescriptor: TaggedAlbum) => void;
}

type Props = StateProps & DispatchProps & NavigationProps;
//#endregion

export interface AlbumDetailNavigationParams {
  albumDescriptor: UserAlbum;
}

function AlbumDetailScreen(props: Props) {

  useEffect(() => {
    const albumDescriptor = props.route.params?.albumDescriptor as TaggedAlbum;
    props.loadAlbum(albumDescriptor);
  }, [])

  const artistName = function () {
    return props.albumDescriptor
      ? props.albumDescriptor.album.artists[0].name
      : '';
  }

  const releaseYear = function () {
    const releaseDate = props.albumDescriptor
      ? props.albumDescriptor.album.release_date
      : '';
    try {
      const date = new Date(releaseDate);
      return date.getFullYear();
    } catch (error) {
      console.error(`Error while parsing release date: ${releaseDate}`);
      console.error(error);
      return releaseDate;
    }
  }

  const imageUrl = function () {
    return props.albumDescriptor
      ? props.albumDescriptor.album.images[0].url
      : undefined; // TODO: use image placeholder
  }

  const albumName = function () {
    return props.albumDescriptor
      ? props.albumDescriptor.album.name
      : '';
  }

  const totalTracks = function () {
    return props.albumDescriptor
      ? props.albumDescriptor.album.tracks.total
      : 0;
  }

  const calculateDuration = function (trackList: TrackObjectSimplified[]) {
    let totalDuration = 0;
    for (const track of trackList) {
      totalDuration += track.duration_ms;
    }
    const date = new Date(0, 0, 0, 0, 0, 0, 0);
    date.setMilliseconds(totalDuration);

    return date;
  }

  const timespanToString = function (timespan: Date) {
    const segments = [];

    const hours = timespan.getHours();
    if (hours > 0) {
      segments.push(`${hours}h`);
    }

    const minutes = timespan.getMinutes();
    if (minutes > 0) {
      segments.push(`${minutes}m`);
    }

    return segments.join(' ');
  }

  const totalDuration = function () {
    const timespan = calculateDuration(
      props.albumDescriptor
        ? props.albumDescriptor.album.tracks.items
        : [],
    );
    const duration = timespanToString(timespan);

    return duration;
  }

  const albumId = function () {
    return props.albumDescriptor
      ? props.albumDescriptor.album.id
      : '';
  }

  const isSaved = function () {
    return props.albumDescriptor
      ? props.albumDescriptor.isSavedAlbum
      : false;
  }

  const isEgged = function () {
    return props.albumDescriptor
      ? props.albumDescriptor.isInListeningList
      : false;
  }

  const onPressSave = function () {
    const albumDescriptor = props.albumDescriptor;
    if (!albumDescriptor) {
      return;
    }

    if (albumDescriptor.isSavedAlbum) {
      props.unsaveAlbum(albumDescriptor);
    } else {
      props.saveAlbum(albumDescriptor);
    }
  };

  const onPressEgg = function () {
    const albumDescriptor = props.albumDescriptor;
    if (!albumDescriptor) {
      return;
    }

    if (albumDescriptor.isInListeningList) {
      props.deleteFromListeningList(albumDescriptor);
    } else {
      props.addToListeningList(albumDescriptor);
    }
  };

  const onPressPlay = async function () {
    if (props.albumDescriptor) {
      try {
        await Linking.openURL(props.albumDescriptor.album.uri);
      } catch (error) {
        // TODO: show a snackbar to inform that spotify is missing with an action to install spotify
        onInstallSpotify();
      }
    }
  };

  const onInstallSpotify = async function () {
    try {
      let marketUri: string;
      if (Platform.OS === 'android') {
        marketUri = 'market://details?id=com.spotify.music';
      } else {
        marketUri = 'itms://itunes.apple.com/app/apple-store/id324684580?mt=8';
      }
      await Linking.openURL(marketUri);
    } catch (error) {
      console.log(error);
    }
  };

  const renderTagCloud = function () {
    if (props.albumDescriptor && props.albumDescriptor.isSavedAlbum) {
      // const tags = [...this.state.albumDescriptor.tags, ...this.state.albumDescriptor.tags, ...this.state.albumDescriptor.tags];
      return (
        <View>
          <Headline style={styles.text}>Tags</Headline>
          <TagCloud
            tags={props.albumDescriptor.tags}
            albumDescriptor={props.albumDescriptor}
          />
        </View>
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.cover}
        source={{ uri: imageUrl() }}
      />
      <View style={styles.space} />
      <Headline style={styles.text}>{albumName()}</Headline>
      <Subheading style={styles.text}>{artistName()}</Subheading>
      <Subheading style={styles.text}>{releaseYear()}</Subheading>
      <Subheading style={styles.text}>
        {totalTracks()} tracks - {totalDuration()}
      </Subheading>
      <View style={styles.iconsContainer}>
        <ToggleIconButton
          type="save"
          selected={isSaved()}
          enabled={props.canSave}
          onPress={onPressSave}
        />
        <ToggleIconButton
          type="eggs"
          selected={isEgged()}
          enabled={props.canBeEgged}
          onPress={onPressEgg}
        />
      </View>
      <View style={styles.iconsContainer}>
        <Button
          mode="contained"
          icon="play-circle"
          uppercase={false}
          onPress={onPressPlay}>
          Play in Spotify
        </Button>
      </View>
      <View style={styles.space} />
      {renderTagCloud()}
      <View style={styles.space} />
      <View style={styles.trackListContainer}>
        <Headline style={styles.text}>Tracks</Headline>
        <TrackList albumDescriptor={props.albumDescriptor} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cover: {
    width: '100%',
    aspectRatio: 1,
  },
  space: {
    height: 10,
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
  trackListContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

//#region Redux
const mapStateToProps = (state: AppState): StateProps => ({
  albumDescriptor: state.albumDetailReducer.albumDescriptor,
  canSave: state.albumDetailReducer.canSave,
  canBeEgged: getCanBeEgged(
    state.albumDetailReducer.canAlbumBeEggedMap,
    state.albumDetailReducer.albumDescriptor,
  ),
});

//Map your action creators to your props.
const mapDispatchToProps: DispatchProps = {
  loadAlbum: loadAlbum,
  unsaveAlbum: unsaveAlbum,
  saveAlbum: saveAlbum,
  addToListeningList: addToListeningList,
  deleteFromListeningList: deleteFromListeningList,
};
//#endregion

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetailScreen);
