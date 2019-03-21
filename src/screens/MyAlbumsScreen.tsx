import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import { Navigation } from 'react-native-navigation';

interface Props {
	componentId: string
}

	componentDidMount() {
		this.getAlbums();
	}

	getAlbums = async () => {
		try {
			console.log('retrieving albums');
			const albumsResponse = await ConnectionHelper.Instance.getAlbums(null, false);
			console.log(albumsResponse);
	}
		catch (error) {
			console.error('Error while retrieving albums');
			console.error(error);
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>My Albums</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
});
