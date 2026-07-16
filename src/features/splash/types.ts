import { StackNavigationProp } from '@react-navigation/stack';

// Define your navigation types for TypeScript strictness
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
};

export type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;
