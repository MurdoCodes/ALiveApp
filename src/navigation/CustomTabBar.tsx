import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import { useHomeStore } from '../store/useHomeStore';

const { width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 75;
const BUBBLE_SIZE = 54;
const ICON_SIZE = 24;
const ICON_LIFT = -12;

const getIconName = (routeName: string, isFocused: boolean): string => {
  switch (routeName) {
    case 'Home':
      return isFocused ? 'home' : 'home-outline';
    case 'Search':
      return 'search';
    case 'GoLive':
      return isFocused ? 'radio' : 'radio-outline';
    case 'Messages':
      return isFocused ? 'chatbubble' : 'chatbubble-outline';
    case 'Profile':
      return isFocused ? 'person' : 'person-outline';
    default:
      return 'help';
  }
};

type TabItemProps = {
  iconName: string;
  isFocused: boolean;
  label?: string;
  showLabel: boolean;
  onPress: () => void;
};

const TabItem: React.FC<TabItemProps> = ({
  iconName,
  isFocused,
  label,
  showLabel,
  onPress,
}) => {
  const iconTranslateY = useSharedValue(isFocused ? ICON_LIFT : 0);
  const labelOpacity = useSharedValue(showLabel ? 1 : 0);
  const labelTranslateY = useSharedValue(0);

  React.useEffect(() => {
    iconTranslateY.value = withTiming(isFocused ? ICON_LIFT : 0, {
      duration: 300,
    });
  }, [iconTranslateY, isFocused]);

  React.useEffect(() => {
    if (showLabel) {
      labelOpacity.value = withTiming(1, { duration: 200 });
      labelTranslateY.value = withTiming(0, { duration: 200 });
    }
  }, [labelOpacity, labelTranslateY, showLabel]);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: iconTranslateY.value }],
  }));

  const labelAnimatedStyle = useAnimatedStyle(() => ({
    opacity: labelOpacity.value,
    transform: [{ translateY: labelTranslateY.value }],
  }));

  return (
    <TouchableOpacity onPress={onPress} style={styles.tab} activeOpacity={0.8}>
      <Animated.View style={[styles.iconWrapper, iconAnimatedStyle]}>
        <Icon
          name={iconName}
          size={ICON_SIZE}
          color={isFocused ? '#FFFFFF' : '#A0A0A0'}
        />
      </Animated.View>

      {showLabel && label && (
        <Animated.Text style={[styles.label, labelAnimatedStyle]}>
          {label}
        </Animated.Text>
      )}
    </TouchableOpacity>
  );
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const setSearchModalVisible = useHomeStore(
    storeState => storeState.setSearchModalVisible,
  );

  const activeIndex = useSharedValue(state.index);
  const tabCount = state.routes.length;

  React.useEffect(() => {
    activeIndex.value = withSpring(state.index, {
      damping: 15,
      stiffness: 150,
    });
  }, [activeIndex, state.index]);

  const bubbleStyle = useAnimatedStyle(() => {
    const tabWidth = width / tabCount;
    const translateX =
      activeIndex.value * tabWidth + (tabWidth - BUBBLE_SIZE) / 2;

    return {
      transform: [{ translateX }, { translateY: ICON_LIFT }],
    };
  });

  const handleTabPress = (routeName: string, index: number) => {
    if (routeName === 'Search') {
      setSearchModalVisible(true);
      return;
    }

    const event = navigation.emit({
      type: 'tabPress',
      target: state.routes[index].key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bubble, bubbleStyle]} />

      <View style={styles.tabsContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const iconName = getIconName(route.name, isFocused);
          const showLabel = isFocused && route.name !== 'Search';

          return (
            <TabItem
              key={route.key}
              iconName={iconName}
              isFocused={isFocused}
              label={options.title || route.name}
              showLabel={showLabel}
              onPress={() => handleTabPress(route.name, index)}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: TAB_BAR_HEIGHT,
    backgroundColor: '#0B0C10',
    borderTopWidth: 1,
    borderTopColor: '#1F1F2E',
    position: 'relative',
    justifyContent: 'center',
  },
  bubble: {
    position: 'absolute',
    top: 10.5,
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    borderRadius: BUBBLE_SIZE / 2,
    backgroundColor: '#662D91',
    shadowColor: '#662D91',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  tabsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 4,
    position: 'absolute',
    bottom: 8,
  },
});

export default CustomTabBar;
