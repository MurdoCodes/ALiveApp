import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Notification } from '../../../store/useHomeStore';

interface NotificationItemProps {
  notification: Notification;
  onPress: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onPress,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.98, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  // Get icon and color based on notification type
  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'follow':
        return { name: 'person-add', color: '#662D91' };
      case 'like':
        return { name: 'heart', color: '#FF0050' };
      case 'comment':
        return { name: 'chatbubble', color: '#00BFFF' };
      case 'live':
        return { name: 'radio', color: '#00FF88' };
      case 'system':
        return { name: 'information-circle', color: '#FFA500' };
      default:
        return { name: 'notifications', color: '#662D91' };
    }
  };

  const iconConfig = getNotificationIcon();

  return (
    <TouchableOpacity
      style={[styles.container, !notification.isRead && styles.unread]}
      onPress={onPress}
      activeOpacity={0.7}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.content, animatedStyle]}>
        {/* Avatar or Icon */}
        <View style={styles.avatarContainer}>
          {notification.avatar ? (
            <Image
              source={{ uri: notification.avatar }}
              style={styles.avatar}
            />
          ) : (
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: `${iconConfig.color}20` },
              ]}
            >
              <Icon name={iconConfig.name} size={20} color={iconConfig.color} />
            </View>
          )}
          {!notification.isRead && <View style={styles.unreadDot} />}
        </View>

        {/* Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.message} numberOfLines={2}>
            {notification.message}
          </Text>
          <Text style={styles.timestamp}>{notification.timestamp}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: '#1F1F2E',
    overflow: 'hidden',
  },
  unread: {
    backgroundColor: '#2A2A3E',
    borderLeftWidth: 3,
    borderLeftColor: '#662D91',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF0050',
    borderWidth: 2,
    borderColor: '#1F1F2E',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  message: {
    fontSize: 13,
    color: '#A0A0A0',
    lineHeight: 18,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 11,
    color: '#666666',
  },
});

export default NotificationItem;
