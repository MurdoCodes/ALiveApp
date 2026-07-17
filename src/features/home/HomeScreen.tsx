import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
import HomeHeader from './components/HomeHeader';
import { useHomeStore } from '../../store/useHomeStore';
import CountryTab from './components/CountryTab';
import { useHomeData } from './hooks/useHomeData';
import LiveCard from './components/LiveCard';

const HomeScreen: React.FC = () => {
  const {
    liveStreams,
    countries,
    isLoading,
    setSearchModalVisible,
    setNotificationModalVisible,
  } = useHomeStore();
  const { onRefresh, isRefreshing } = useHomeData();

  // Filter streams by selected country
  const selectedCountry = useHomeStore(state => state.selectedCountry);
  const filteredStreams =
    selectedCountry === 'all'
      ? liveStreams
      : liveStreams.filter(stream => stream.country === selectedCountry);

  // Loading state
  if (isLoading && liveStreams.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#662D91" />
        <Text style={styles.loadingText}>Loading live streams...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0C10" />

      {/* Header */}
      <HomeHeader
        onSearchPress={() => setSearchModalVisible(true)}
        onNotificationPress={() => setNotificationModalVisible(true)}
      />

      {/* Country Tabs */}
      <View style={styles.tabsContainer}>
        <FlatList
          data={countries}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.tabsContent}
          renderItem={({ item }) => <CountryTab country={item} />}
        />
      </View>

      {/* Live Feed */}
      <FlatList
        data={filteredStreams}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.feedContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor="#662D91"
            colors={['#662D91']}
          />
        }
        renderItem={({ item }) => <LiveCard stream={item} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No live streams available</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0C10',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B0C10',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    color: '#A0A0A0',
  },
  tabsContainer: {
    backgroundColor: '#0B0C10',
    paddingVertical: 12,
  },
  tabsContent: {
    paddingHorizontal: 16,
  },
  feedContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#A0A0A0',
  },
});

export default HomeScreen;
