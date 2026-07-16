import { useState } from 'react';
import { Platform } from 'react-native';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';

// Web client (client_type: 3) from android/app/google-services.json
const WEB_CLIENT_ID =
  '212949827464-fkkcj9ngqh8tdq99ph4ji4iqmv5d3ll2.apps.googleusercontent.com';

// iOS client from ios/ALiveApp/GoogleService-Info.plist (CLIENT_ID key)
const IOS_CLIENT_ID =
  '212949827464-c55clr8p72m9droct62qj8sp0kvstari.apps.googleusercontent.com';

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
  ...(Platform.OS === 'ios' && { iosClientId: IOS_CLIENT_ID }),
});

export const useAuth = (
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>,
) => {
  const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const response = await GoogleSignin.signIn();

      if (response.type === 'cancelled') {
        return;
      }

      const { idToken, accessToken } = await GoogleSignin.getTokens();

      if (!idToken) {
        throw new Error('No ID token present');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      await auth().signInWithCredential(googleCredential);
      console.log('Signed in with Google');
    } catch (error: unknown) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            console.log('User cancelled login');
            break;
          case statusCodes.IN_PROGRESS:
            console.log('Sign-in already in progress');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.error('Google Play Services not available or outdated');
            break;
          default:
            console.error('Google Sign-In Error:', error);
        }
      } else if (error instanceof Error) {
        console.error('Sign in failed:', error.message);
      } else {
        console.error('Sign in failed:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { signInWithGoogle, isLoading };
};
