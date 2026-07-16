import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import HomeHeader from './components/HomeHeader';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0C10" />

      {/* Header */}
      <HomeHeader />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0C10',
  },
});

export default HomeScreen;