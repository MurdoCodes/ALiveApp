/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';

import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import SearchModal from './src/components/SearchModal';
import { useHomeStore } from './src/store/useHomeStore';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const isSearchModalVisible = useHomeStore(
    state => state.isSearchModalVisible,
  );
  const setSearchModalVisible = useHomeStore(
    state => state.setSearchModalVisible,
  );
  const liveStreams = useHomeStore(state => state.liveStreams);
  
  return (
    <>
      {/* Set default dark status bar to match our app's dark theme */}
      <StatusBar barStyle="light-content" backgroundColor="#0B0C10" />

      {/* Render our custom navigation stack */}
      <RootNavigator />

      {/* Global Search Modal */}
      <SearchModal
        isVisible={isSearchModalVisible}
        onClose={() => setSearchModalVisible(false)}
        allStreams={liveStreams}
      />
    </>
  );
}
export default App;
