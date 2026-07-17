import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Country, useHomeStore } from '../../../store/useHomeStore';

interface CountryTabProps {
  country: Country;
}

const CountryTab: React.FC<CountryTabProps> = ({ country }) => {
  const selectedCountry = useHomeStore(state => state.selectedCountry);
  const setSelectedCountry = useHomeStore(state => state.setSelectedCountry);

  const isSelected = selectedCountry === country.id;

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(isSelected ? '#662D91' : '#1F1F2E', {
      duration: 200,
    }),
    transform: [
      { scale: withTiming(isSelected ? 1.05 : 1, { duration: 200 }) },
    ],
  }));

  return (
    <TouchableOpacity
      onPress={() => setSelectedCountry(country.id)}
      activeOpacity={0.8}
    >
      <Animated.View style={[styles.tab, animatedStyle]}>
        <Text style={styles.flag}>{country.flag}</Text>
        <Text style={[styles.text, isSelected && styles.selectedText]}>
          {country.name}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
  },
  flag: {
    fontSize: 18,
    marginRight: 6,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A0A0A0',
  },
  selectedText: {
    color: '#FFFFFF',
  },
});

export default CountryTab;
