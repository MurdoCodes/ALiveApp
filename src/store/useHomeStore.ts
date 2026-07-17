import { create } from 'zustand';

export interface LiveStream {
  id: string;
  title: string;
  hostName: string;
  hostAvatar: string;
  thumbnail: string;
  viewers: number;
  country: string;
  isLive: boolean;
}

export interface Country {
  id: string;
  name: string;
  flag: string;
}

export interface Notification {
  id: string;
  type: 'follow' | 'like' | 'comment' | 'live' | 'system';
  title: string;
  message: string;
  avatar?: string;
  timestamp: string;
  isRead: boolean;
}

interface HomeState {
  // Data
  liveStreams: LiveStream[];
  countries: Country[];
  selectedCountry: string;
  onlineUsers: number;

  // Loading states
  isLoading: boolean;
  isRefreshing: boolean;

  // Search Modal State
  isSearchModalVisible: boolean;

  // Notification State
  notifications: Notification[];
  isNotificationModalVisible: boolean;
  unreadCount: number;

  // Actions
  setLiveStreams: (streams: LiveStream[]) => void;
  setCountries: (countries: Country[]) => void;
  setSelectedCountry: (countryId: string) => void;
  setOnlineUsers: (count: number) => void;
  setLoading: (loading: boolean) => void;
  setRefreshing: (refreshing: boolean) => void;
  setSearchModalVisible: (visible: boolean) => void;
  setNotifications: (notifications: Notification[]) => void;
  setNotificationModalVisible: (visible: boolean) => void;
  markAllAsRead: () => void;
  markAsRead: (id: string) => void;
}

export const useHomeStore = create<HomeState>(set => ({
  // Initial state
  liveStreams: [],
  countries: [],
  selectedCountry: 'all',
  onlineUsers: 0,
  isLoading: false,
  isRefreshing: false,
  isSearchModalVisible: false,
  notifications: [],
  isNotificationModalVisible: false,
  unreadCount: 0,

  // Actions
  setLiveStreams: streams => set({ liveStreams: streams }),
  setCountries: countries => set({ countries }),
  setSelectedCountry: countryId => set({ selectedCountry: countryId }),
  setOnlineUsers: count => set({ onlineUsers: count }),
  setLoading: loading => set({ isLoading: loading }),
  setRefreshing: refreshing => set({ isRefreshing: refreshing }),
  setSearchModalVisible: visible => set({ isSearchModalVisible: visible }),
  setNotifications: notifications => {
    const unreadCount = notifications.filter(n => !n.isRead).length;
    set({ notifications, unreadCount });
  },
  setNotificationModalVisible: visible =>
    set({ isNotificationModalVisible: visible }),
  markAllAsRead: () =>
    set(state => ({
      notifications: state.notifications.map(n => ({ ...n, isRead: true })),
      unreadCount: 0,
    })),
  markAsRead: id =>
    set(state => {
      const notifications = state.notifications.map(n =>
        n.id === id ? { ...n, isRead: true } : n,
      );
      const unreadCount = notifications.filter(n => !n.isRead).length;
      return { notifications, unreadCount };
    }),
}));
