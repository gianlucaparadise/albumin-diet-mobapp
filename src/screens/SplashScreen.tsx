import { StackScreenProps } from '@react-navigation/stack';
import React, { Component } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import { RootStackParamList } from '../navigation';
import { LoginHelper } from '../helpers/LoginHelper';
import { AlbuminColors } from '../Theme';

type NavigationProps = StackScreenProps<RootStackParamList, "Splash">
type Props = NavigationProps

export default class SplashScreen extends Component<Props> {
  timeout?: number;
  headphonesAnimatedValue = new Animated.Value(0);
  fadeAnimatedValue = new Animated.Value(0);

  onPressGo = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.navigate();

    return true;
  };

  navigate = async () => {
    const isLoggedIn = await LoginHelper.Instance.isLoggedIn();

    if (isLoggedIn) {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'HomeFlow' }]
      });
    } else {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'LoginFlow' }]
      });
    }
  };

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.fadeAnimatedValue.setValue(0);
    const fadeTiming = Animated.timing(this.fadeAnimatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    this.headphonesAnimatedValue.setValue(0);
    const rotationTiming = Animated.timing(this.headphonesAnimatedValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.exp,
      useNativeDriver: true,
    });

    Animated.sequence([fadeTiming, rotationTiming]).start(() =>
      this.waitAndGo(),
    );
  }

  waitAndGo() {
    this.timeout = setTimeout(() => {
      this.onPressGo();
    }, 700);
  }

  render() {
    //#region Headphones animation
    const rotateX = this.headphonesAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['90deg', '0deg'],
    });

    const opacity = this.headphonesAnimatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 1],
    });

    // FIXME: rotateX doesn't work on iOS, I don't know why
    const headphonesStyle = { opacity, transform: [{ rotateX }] };
    //#endregion

    //#region Fade animation
    const fade = this.fadeAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const eggStyle = { opacity: fade };
    //#endregion

    return (
      <View
        style={styles.container}
        onStartShouldSetResponder={() => this.onPressGo()}>
        <View style={styles.logoContainer}>
          <Animated.Image
            resizeMode="contain"
            style={[styles.logo, eggStyle]}
            source={require('./../../resources/images/albumin-diet-egg.png')}
          />
          <Animated.Image
            resizeMode="contain"
            style={[styles.logo, headphonesStyle]}
            source={require('./../../resources/images/albumin-diet-headphones.png')}
          />
        </View>
        <Animated.Text style={[styles.welcome, eggStyle]}>
          Albumin Diet
        </Animated.Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: AlbuminColors.background,
  },
  logoContainer: {
    width: '40%',
    height: '50%',
    justifyContent: 'flex-end',
    position: 'relative',
    // backgroundColor: 'rgba(0, 0, 100, 0.5)', // this is for debugging
  },
  logo: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    position: 'absolute',
    // backgroundColor: 'rgba(100, 0, 0, 0.5)', // this is for debugging
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: AlbuminColors.text,
    // backgroundColor: 'rgba(0, 100, 0, 0.5)', // this is for debugging
  },
});
