import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
// import { SplashScreenNavigationProp } from './types';
// import { useNavigation } from '@react-navigation/native';
import Animated from 'react-native-reanimated';

const SplashScreen: React.FC = () => {
  //   const navigation = useNavigation<SplashScreenNavigationProp>();

  return (
    <View>
      <StatusBar barStyle="light-content" />

      {/* App Logo */}
      <Animated.View>
        <Image
          source={require('../../assets/images/aliveapp-logo.png')}
          resizeMode="contain"
        />
      </Animated.View>

      {/* App Title and Subtitle */}
      <Animated.View>
        <Text>App Title</Text>
        <Text>App Subtitle</Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
