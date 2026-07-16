import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import { LiveStream } from '../features/home/store/useHomeStore';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SearchModalProps {
  isVisible: boolean;
  onClose: () => void;
  allStreams: LiveStream[];
}

interface SearchResult {
  id: string;
  title: string;
  type: 'stream' | 'user';
  subtitle: string;
  avatar?: string;
}

const SearchModal: React.FC<SearchModalProps> = ({
  isVisible,
  onClose,
  allStreams,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [recentSearches] = useState<string[]>([
    'Gaming',
    'Music',
    'Cooking',
    'Tech',
  ]);

  // Animation values
  const backdropOpacity = useSharedValue(0);
  const modalTranslateY = useSharedValue(SCREEN_HEIGHT);
  const modalScale = useSharedValue(0.9);

  useEffect(() => {
    if (isVisible) {
      // Animate in
      backdropOpacity.value = withTiming(1, { duration: 300 });
      modalTranslateY.value = withSpring(0, {
        damping: 25,
        stiffness: 300,
      });
      modalScale.value = withSpring(1, {
        damping: 25,
        stiffness: 300,
      });
    } else {
      // Animate out
      backdropOpacity.value = withTiming(0, { duration: 200 });
      modalTranslateY.value = withTiming(SCREEN_HEIGHT, { duration: 200 });
      modalScale.value = withTiming(0.9, { duration: 200 });
    }
  }, [backdropOpacity, isVisible, modalScale, modalTranslateY]);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results: SearchResult[] = allStreams
      .filter(
        stream =>
          stream.title.toLowerCase().includes(query) ||
          stream.hostName.toLowerCase().includes(query),
      )
      .map(stream => ({
        id: stream.id,
        title: stream.title,
        type: 'stream',
        subtitle: `${stream.hostName} • ${stream.viewers} viewers`,
        avatar: stream.hostAvatar,
      }));

    setSearchResults(results);
  }, [searchQuery, allStreams]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const modalStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: modalTranslateY.value },
      { scale: modalScale.value },
    ],
  }));

  const handleClose = () => {
    setSearchQuery('');
    Keyboard.dismiss();
    onClose();
  };

  const renderRecentSearch = (item: string) => (
    <TouchableOpacity
      key={item}
      style={styles.recentItem}
      onPress={() => setSearchQuery(item)}
      activeOpacity={0.7}
    >
      <Icon name="time-outline" size={18} color="#A0A0A0" />
      <Text style={styles.recentText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderSearchResult = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity style={styles.resultItem} activeOpacity={0.7}>
      {item.avatar && (
        <View style={styles.resultAvatarContainer}>
          <View style={styles.resultAvatar} />
        </View>
      )}
      <View style={styles.resultContent}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <Text style={styles.resultSubtitle}>{item.subtitle}</Text>
      </View>
      <Icon name="chevron-forward" size={20} color="#A0A0A0" />
    </TouchableOpacity>
  );

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      {/* Backdrop */}
      <Animated.View
        style={[styles.backdrop, backdropStyle]}
        onTouchStart={handleClose}
      />

      {/* Modal Content */}
      <Animated.View style={[styles.modalContent, modalStyle]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <Icon
              name="search"
              size={20}
              color="#A0A0A0"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search streams, users..."
              placeholderTextColor="#666666"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
              autoCapitalize="none"
              autoCorrect={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery('')}
                activeOpacity={0.7}
              >
                <Icon name="close-circle" size={20} color="#A0A0A0" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {searchQuery.length === 0 ? (
            // Recent Searches
            <View>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              {recentSearches.map(renderRecentSearch)}
            </View>
          ) : searchResults.length > 0 ? (
            // Search Results
            <FlatList
              data={searchResults}
              keyExtractor={item => item.id}
              renderItem={renderSearchResult}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            // No Results
            <View style={styles.emptyContainer}>
              <Icon name="search-outline" size={48} color="#333333" />
              <Text style={styles.emptyText}>No results found</Text>
              <Text style={styles.emptySubtext}>
                Try searching for something else
              </Text>
            </View>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0B0C10',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    maxHeight: SCREEN_HEIGHT * 0.85,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F2E',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F2E',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    paddingVertical: 10,
  },
  closeButton: {
    paddingVertical: 10,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#662D91',
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A0A0A0',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#1F1F2E',
    borderRadius: 10,
    marginBottom: 8,
  },
  recentText: {
    fontSize: 15,
    color: '#FFFFFF',
    marginLeft: 12,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#1F1F2E',
    borderRadius: 10,
    marginBottom: 8,
  },
  resultAvatarContainer: {
    marginRight: 12,
  },
  resultAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#662D91',
  },
  resultContent: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  resultSubtitle: {
    fontSize: 12,
    color: '#A0A0A0',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#A0A0A0',
    marginTop: 8,
  },
});

export default SearchModal;
