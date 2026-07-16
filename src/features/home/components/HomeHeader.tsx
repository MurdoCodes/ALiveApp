import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useHomeStore } from '../store/useHomeStore';

interface HomeHeaderProps {
  onSearchPress?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ onSearchPress }) => {
  const onlineUsers = useHomeStore(state => state.onlineUsers);

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <View style={styles.container}>
      {/* Left: Online Users */}
      <View style={styles.leftSection}>
        <View style={styles.onlineIndicator} />
        <Text style={styles.onlineText}>
          {formatNumber(onlineUsers)} Online
        </Text>
      </View>

      {/* Right: Search & Notification */}
      <View style={styles.rightSection}>
        <TouchableOpacity
          style={styles.iconButton}
          activeOpacity={0.7}
          onPress={onSearchPress}
        >
          <Icon name="search" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
          <Icon name="notifications-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0B0C10',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00FF88',
    marginRight: 8,
  },
  onlineText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 8,
  },
});

export default HomeHeader;
