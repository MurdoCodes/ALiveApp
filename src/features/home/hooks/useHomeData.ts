import { useCallback, useEffect } from 'react';
import {
  Country,
  Notification,
  useHomeStore,
} from '../../../store/useHomeStore';
// import api from '../../../services/api'; // TODO: uncomment when backend is ready
import { LiveStream } from '../../../store/useHomeStore';

// Mock data - replace with real API calls when backend is ready
const MOCK_LIVE_STREAMS: LiveStream[] = [
  {
    id: '1',
    title: 'Live Gaming Session',
    hostName: 'ProGamer123',
    hostAvatar: 'https://i.pravatar.cc/150?img=1',
    thumbnail: 'https://picsum.photos/400/600?random=1',
    viewers: 1250,
    country: 'us',
    isLive: true,
  },
  {
    id: '2',
    title: 'Music Production',
    hostName: 'DJBeats',
    hostAvatar: 'https://i.pravatar.cc/150?img=2',
    thumbnail: 'https://picsum.photos/400/600?random=2',
    viewers: 890,
    country: 'uk',
    isLive: true,
  },
  {
    id: '3',
    title: 'Cooking Show',
    hostName: 'ChefMaria',
    hostAvatar: 'https://i.pravatar.cc/150?img=3',
    thumbnail: 'https://picsum.photos/400/600?random=3',
    viewers: 2100,
    country: 'jp',
    isLive: true,
  },
  {
    id: '4',
    title: 'Travel Vlog',
    hostName: 'Wanderlust',
    hostAvatar: 'https://i.pravatar.cc/150?img=4',
    thumbnail: 'https://picsum.photos/400/600?random=4',
    viewers: 567,
    country: 'fr',
    isLive: true,
  },
  {
    id: '5',
    title: 'Tech Review',
    hostName: 'TechGuru',
    hostAvatar: 'https://i.pravatar.cc/150?img=5',
    thumbnail: 'https://picsum.photos/400/600?random=5',
    viewers: 3400,
    country: 'us',
    isLive: true,
  },
  {
    id: '6',
    title: 'Fitness Workout',
    hostName: 'FitLife',
    hostAvatar: 'https://i.pravatar.cc/150?img=6',
    thumbnail: 'https://picsum.photos/400/600?random=6',
    viewers: 1800,
    country: 'ca',
    isLive: true,
  },
];

const MOCK_COUNTRIES: Country[] = [
  { id: 'all', name: 'All', flag: '🌍' },
  { id: 'us', name: 'USA', flag: '🇺🇸' },
  { id: 'uk', name: 'UK', flag: '🇬🇧' },
  { id: 'jp', name: 'Japan', flag: '🇯🇵' },
  { id: 'fr', name: 'France', flag: '🇫🇷' },
  { id: 'ca', name: 'Canada', flag: '🇨🇦' },
  { id: 'de', name: 'Germany', flag: '🇩🇪' },
  { id: 'au', name: 'Australia', flag: '🇦🇺' },
];

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'follow',
    title: 'New Follower',
    message: 'ProGamer123 started following you',
    avatar: 'https://i.pravatar.cc/150?img=1',
    timestamp: '2 minutes ago',
    isRead: false,
  },
  {
    id: '2',
    type: 'live',
    title: 'Live Now',
    message: 'DJBeats just went live! Watch now',
    avatar: 'https://i.pravatar.cc/150?img=2',
    timestamp: '15 minutes ago',
    isRead: false,
  },
  {
    id: '3',
    type: 'like',
    title: 'New Like',
    message: 'ChefMaria liked your stream',
    avatar: 'https://i.pravatar.cc/150?img=3',
    timestamp: '1 hour ago',
    isRead: false,
  },
  {
    id: '4',
    type: 'comment',
    title: 'New Comment',
    message: 'TechGuru commented: "Great stream!"',
    avatar: 'https://i.pravatar.cc/150?img=5',
    timestamp: '3 hours ago',
    isRead: true,
  },
  {
    id: '5',
    type: 'system',
    title: 'Welcome to ALive',
    message: 'Start streaming and connect with the world',
    timestamp: '1 day ago',
    isRead: true,
  },
];

export const useHomeData = () => {
  const {
    setLiveStreams,
    setCountries,
    setOnlineUsers,
    setLoading,
    setRefreshing,
    isRefreshing,
    setNotifications,
  } = useHomeStore();

  const fetchHomeData = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise<void>(resolve => setTimeout(() => resolve(), 800));
      setLiveStreams(MOCK_LIVE_STREAMS);
      setCountries(MOCK_COUNTRIES);
      setOnlineUsers(12450);
      setNotifications(MOCK_NOTIFICATIONS);
    } catch (error) {
      console.error('Failed to fetch home data:', error);
    } finally {
      setLoading(false);
    }
  }, [
    setLiveStreams,
    setCountries,
    setOnlineUsers,
    setLoading,
    setNotifications,
  ]);
  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  //   const fetchHomeData = async () => {
  //     setLoading(true);
  //     try {
  //       // TODO: Replace with real API calls
  //       // const response = await api.get('/home/feed');
  //       // setLiveStreams(response.data.streams);

  //       // Simulate API delay
  //       await new Promise<void>(resolve => setTimeout(() => resolve(), 800));

  //       setLiveStreams(MOCK_LIVE_STREAMS);
  //       setCountries(MOCK_COUNTRIES);
  //       setOnlineUsers(12450); // Mock online user count
  //     } catch (error) {
  //       console.error('Failed to fetch home data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  // Pull-to-refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchHomeData();
    setRefreshing(false);
  };

  return { onRefresh, isRefreshing };
};
