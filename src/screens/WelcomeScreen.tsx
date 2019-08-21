import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Text, Button, Title, Headline, Paragraph } from 'react-native-paper';

interface Props extends NavigationScreenProps {
}

export default class WelcomeScreen extends Component<Props> {
	goToLogin = () => {
		this.props.navigation.navigate('Login');
	};

	render() {
		return (
			<View style={styles.container}>
				<Headline style={[styles.center, styles.bold]}>🤙 Welcome!</Headline>
				<Paragraph style={styles.center}>
					<Paragraph style={styles.bold}>Albumin Diet </Paragraph>
					is an app to bring back the
					<Paragraph style={styles.italic}> album era </Paragraph>
					way of music listening
				</Paragraph>
				<Paragraph style={styles.center}>
					🎧
					<Paragraph style={styles.bold}> ⦾ </Paragraph>
					🥚
				</Paragraph>
				<Paragraph style={styles.center}>
					Login using your
					<Paragraph style={styles.bold}> Spotify </Paragraph>
					account to navigate across your
					<Paragraph style={styles.italic}> saved albums</Paragraph>,
					<Paragraph style={styles.italic}> tag </Paragraph>
					them and start adding more
					<Paragraph style={styles.bold}> albumin </Paragraph>
					to your musical
					<Paragraph style={styles.bold}> diet </Paragraph>
				</Paragraph>
				<Button style={styles.center} onPress={this.goToLogin}>Login</Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	center: {
		textAlign: 'center',
		marginHorizontal: 20,
		marginVertical: 10,
	},
	bold: {
		fontWeight: 'bold'
	},
	italic: {
		fontStyle: 'italic'
	}
});
