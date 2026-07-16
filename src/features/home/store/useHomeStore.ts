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

interface HomeState {
  // Data
  liveStreams: LiveStream[];
  countries: Country[];
  selectedCountry: string;
  onlineUsers: number;

  // Loading states
  isLoading: boolean;
  isRefreshing: boolean;

  // Actions
  setLiveStreams: (streams: LiveStream[]) => void;
  setCountries: (countries: Country[]) => void;
  setSelectedCountry: (countryId: string) => void;
  setOnlineUsers: (count: number) => void;
  setLoading: (loading: boolean) => void;
  setRefreshing: (refreshing: boolean) => void;
}

export const useHomeStore = create<HomeState>(set => ({
  // Initial state
  liveStreams: [],
  countries: [],
  selectedCountry: 'all',
  onlineUsers: 0,
  isLoading: false,
  isRefreshing: false,

  // Actions
  setLiveStreams: streams => set({ liveStreams: streams }),
  setCountries: countries => set({ countries }),
  setSelectedCountry: countryId => set({ selectedCountry: countryId }),
  setOnlineUsers: count => set({ onlineUsers: count }),
  setLoading: loading => set({ isLoading: loading }),
  setRefreshing: refreshing => set({ isRefreshing: refreshing }),
}));
