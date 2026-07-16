import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../splash';
import GoogleButton from './components/GoogleButton';
import { useAuth } from './hooks/useAuthState';

const { width } = Dimensions.get('window');

const LoginScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>();
  const { signInWithGoogle, isLoading } = useAuth(navigation);

  // Animation Shared Values
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);
  const buttonOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(30);

  React.useEffect(() => {
    // Staggered entrance animations
    logoOpacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.exp),
    });
    logoScale.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.back(1.5)),
    });

    titleOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));
    titleTranslateY.value = withDelay(
      300,
      withTiming(0, { duration: 800, easing: Easing.out(Easing.cubic) }),
    );

    buttonOpacity.value = withDelay(600, withTiming(1, { duration: 800 }));
    buttonTranslateY.value = withDelay(
      600,
      withTiming(0, { duration: 800, easing: Easing.out(Easing.cubic) }),
    );
  }, []);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const animatedTitleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const animatedButtonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonTranslateY.value }],
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0C10" />

      {/* Subtle background glows for depth */}
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      {/* Top Section: Logo */}
      <Animated.View style={[styles.topSection, animatedLogoStyle]}>
        <Image
          source={require('../../assets/images/aliveapp-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Middle Section: Welcome Text */}
      <Animated.View style={[styles.middleSection, animatedTitleStyle]}>
        <Text style={styles.title}>Welcome to ALive</Text>
        <Text style={styles.subtitle}>
          Sign in to start streaming{'\n'}and connect with the world.
        </Text>
      </Animated.View>

      {/* Bottom Section: Login Button & Terms */}
      <Animated.View style={[styles.bottomSection, animatedButtonStyle]}>
        <GoogleButton onPress={signInWithGoogle} isLoading={isLoading} />

        <Text style={styles.termsText}>
          By continuing, you agree to our{'\n'}
          <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0C10',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  glowTop: {
    position: 'absolute',
    top: -100,
    width: width,
    height: 300,
    backgroundColor: '#662D91',
    opacity: 0.15,
    borderRadius: 150,
  },
  glowBottom: {
    position: 'absolute',
    bottom: -150,
    width: width,
    height: 300,
    backgroundColor: '#1F4068',
    opacity: 0.2,
    borderRadius: 150,
  },
  topSection: {
    marginTop: 40,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  middleSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
  },
  termsText: {
    marginTop: 24,
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#8A2BE2',
    fontWeight: '600',
  },
});

export default LoginScreen;
