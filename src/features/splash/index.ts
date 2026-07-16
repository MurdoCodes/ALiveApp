/**
 * Splash Feature Entry Point
 * This barrel file exposes the public API of the splash feature,
 * keeping the internal file structure hidden from the rest of the app.
 */

// Export the component as the default export
export { default as SplashScreen } from './SplashScreen';

// Re-export the navigation type so other features/navigation can import it cleanly
export type { RootStackParamList } from './types';
