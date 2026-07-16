import React, { useEffect } from 'react';
import { Dimensions, Image, StatusBar, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

import { SplashScreenNavigationProp } from './types';

// Get the dimensions of the screen
const { width } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  // Define Shared Values for Animations
  const logoScale = useSharedValue(0.5);
  const logoOpacity = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(20);
  const glowScale = useSharedValue(1);

  useEffect(() => {
    // Logo: Fade in and bounce slightly
    logoOpacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.exp),
    });
    logoScale.value = withSequence(
      withTiming(1.1, { duration: 600, easing: Easing.out(Easing.back(1.5)) }),
      withTiming(1, { duration: 300 }),
    );

    // Title: Slide up and fade in with a staggered delay
    titleOpacity.value = withDelay(600, withTiming(1, { duration: 600 }));
    titleTranslateY.value = withDelay(
      600,
      withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) }),
    );

    // Background Glow: Continuous subtle pulse
    glowScale.value = withSequence(
      withTiming(1.2, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
      withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
    );
  }, [
    glowScale,
    logoOpacity,
    logoScale,
    navigation,
    titleOpacity,
    titleTranslateY,
  ]);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const animatedTitleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const animatedGlowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glowScale.value }],
    opacity: 0.3,
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0C10" />

      {/* Background Glowing Aura */}
      <Animated.View style={[styles.glow, animatedGlowStyle]} />

      {/* App Logo */}
      <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
        <Image
          source={require('../../assets/images/aliveapp-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      {/* App Title & Subtitle */}
      <Animated.Text style={[styles.title, animatedTitleStyle]}>
        ALive
      </Animated.Text>
      <Animated.Text style={[styles.subtitle, animatedTitleStyle]}>
        Stream. Connect. Experience.
      </Animated.Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0C10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    backgroundColor: '#662D91',
  },
  logoContainer: {
    marginBottom: 24,
    zIndex: 1,
    shadowColor: '#662D91',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 44,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 2,
    zIndex: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#A0A0A0',
    marginTop: 8,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    zIndex: 1,
  },
});
