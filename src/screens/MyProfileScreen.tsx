import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { LoginHelper } from '../helpers/LoginHelper';
import { NavigationScreenProps, NavigationScreenOptions, ScrollView } from 'react-navigation';
import { Text, Button, Title } from 'react-native-paper';
import { MyNavigationScreenOptionsGetter } from 'react-navigation-types';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { UserObjectPrivate } from 'spotify-web-api-node-typings';

interface Props extends NavigationScreenProps {
}

interface State {
	profile?: UserObjectPrivate
}

export default class MyProfileScreen extends Component<Props, State> {
	static navigationOptions: MyNavigationScreenOptionsGetter<NavigationScreenOptions> = (navigationOptions) => {
		return {
			title: 'Profile',
		};
	}

	constructor(props: Props) {
		super(props);

		this.state = {
			profile: undefined
		};
	}

	componentDidMount() {
		this.getProfile();
	}

	getProfile = async () => {
		try {
			const response = await ConnectionHelper.Instance.getProfile();
			// this.props.navigationOptions = { title: profileResponse.data.display_name };
			this.setState({
				profile: response.data
			});
		} catch (error) {
			console.error('Error while getProfile');
			console.error(error);
		}
	}

	logout = async () => {
		try {
			await LoginHelper.Instance.logout();
			this.props.navigation.navigate('LoginFlow');
		} catch (error) {
			console.error('Error while logging out');
			console.error(error);
		}
	}

	get imageUrl() {
		const profile = this.state.profile;
		return profile && profile.images && profile.images[0] ? profile.images[0].url : ''; // TODO: use image placeholder
	}

	get username() {
		const profile = this.state.profile;
		return profile ? profile.display_name : '';
	}

	render() {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<Image
					resizeMode="cover"
					style={styles.userimage}
					source={{ uri: this.imageUrl }} />
				<Title style={styles.username}>{this.username}</Title>
				<Button onPress={this.logout}>Logout</Button>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 15,
		alignItems: 'center'
	},
	userimage: {
		width: 200,
		aspectRatio: 1,
		borderRadius: 100
	},
	username: {
		marginVertical: 5,
		textAlign: 'center',
	},
});
