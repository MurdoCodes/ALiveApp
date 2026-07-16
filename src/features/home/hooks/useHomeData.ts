import { useCallback, useEffect } from 'react';
import { Country, useHomeStore } from '../store/useHomeStore';
// import api from '../../../services/api'; // TODO: uncomment when backend is ready
import { LiveStream } from '../store/useHomeStore';

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

export const useHomeData = () => {
  const {
    setLiveStreams,
    setCountries,
    setOnlineUsers,
    setLoading,
    setRefreshing,
    isRefreshing,
  } = useHomeStore();

  const fetchHomeData = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise<void>(resolve => setTimeout(() => resolve(), 800));
      setLiveStreams(MOCK_LIVE_STREAMS);
      setCountries(MOCK_COUNTRIES);
      setOnlineUsers(12450);
    } catch (error) {
      console.error('Failed to fetch home data:', error);
    } finally {
      setLoading(false);
    }
  }, [setLiveStreams, setCountries, setOnlineUsers, setLoading]);
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
