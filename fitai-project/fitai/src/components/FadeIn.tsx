import { ReactNode, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => { Animated.timing(v, { toValue: 1, duration: 450, delay, useNativeDriver: true }).start(); }, [v, delay]);
  return <Animated.View style={{ opacity: v, transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }] }}>{children}</Animated.View>;
}
