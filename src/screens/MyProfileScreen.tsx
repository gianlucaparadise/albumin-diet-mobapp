import React, { Component } from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { LoginHelper } from '../helpers/LoginHelper';
import { Button, Title } from 'react-native-paper';
import { ConnectionHelper } from '../helpers/ConnectionHelper';
import { UserObjectPrivate } from 'spotify-web-api-node-typings';
import { HomeStackParamList } from '../navigation/HomeStacks';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';

type ScreenNavigationProps = StackNavigationProp<HomeStackParamList, "MyProfile">
type ParentNavigationProps = StackNavigationProp<RootStackParamList>
type ComposedNavigationProps = CompositeNavigationProp<ScreenNavigationProps, ParentNavigationProps>

type ScreenRouteProp = RouteProp<HomeStackParamList, "MyProfile">

type NavigationProps = {
  navigation: ComposedNavigationProps,
  route: ScreenRouteProp
}

type Props = NavigationProps

interface State {
  profile?: UserObjectPrivate;
}

export default class MyProfileScreen extends Component<Props, State> {

  constructor(props: any) {
    super(props);

    this.state = {
      profile: undefined,
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
        profile: response.data,
      });
    } catch (error) {
      console.error('Error while getProfile');
      console.error(error);
    }
  };

  logout = async () => {
    try {
      await LoginHelper.Instance.logout();
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'LoginFlow' }]
      });
    } catch (error) {
      console.error('Error while logging out');
      console.error(error);
    }
  };

  get imageUrl() {
    const profile = this.state.profile;
    return profile && profile.images && profile.images[0]
      ? profile.images[0].url
      : undefined; // TODO: use image placeholder
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
          source={{ uri: this.imageUrl }}
        />
        <Title style={styles.username}>{this.username}</Title>
        <Button onPress={this.logout}>Logout</Button>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
  },
  userimage: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 100,
  },
  username: {
    marginVertical: 5,
    textAlign: 'center',
  },
});
