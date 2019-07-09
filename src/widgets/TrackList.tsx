import React, { Component } from "react";
import { TaggedAlbum } from "albumin-diet-types";
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native";
import { TrackObjectSimplified } from "spotify-web-api-node-typings";
import { Paragraph } from "react-native-paper";

interface Props {
    albumDescriptor: TaggedAlbum,
    style?: StyleProp<ViewStyle>,
}

interface State {
}

export default class TrackList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
        };
    }

    durationToText(duration: number) {
        const date = new Date(0, 0, 0, 0, 0, 0, 0);
        date.setMilliseconds(duration);

        const minutes = pad(date.getMinutes().toString(), 2, '0');
        const seconds = pad(date.getSeconds().toString(), 2, '0');

        return `${minutes}:${seconds}`;
    }

    buildTrack = (track: TrackObjectSimplified) => {
        return (
            <View key={`track_${track.track_number}`} style={styles.track}>
                <Paragraph style={styles.trackNumber}>{track.track_number}</Paragraph>
                <Paragraph
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={styles.trackTitle}>
                    {track.name}
                </Paragraph>
                <Paragraph style={styles.trackDuration}>{this.durationToText(track.duration_ms)}</Paragraph>
            </View>
        );
    }

    renderTrackViews = () => {
        return this.props.albumDescriptor.album.tracks.items.map(track => this.buildTrack(track));
    }

    render() {
        return (
            <View style={[styles.main, this.props.style]}>
                {this.renderTrackViews()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
    },
    track: {
        flex: 1,
        flexDirection: 'row',
    },
    trackNumber: {
        width: 20,
        textAlign: 'right',
        marginRight: 5,
    },
    trackTitle: {
        flexGrow: 1,
    },
    trackDuration: {
        marginLeft: 5,
    }
});

function pad(n: string, width: number, z: string) {
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}