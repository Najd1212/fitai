import { ReactNode } from 'react';
import { Pressable, View, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius } from '@/theme';

export function Card({ children, onPress, style }: { children: ReactNode; onPress?: () => void; style?: ViewStyle }) {
  const body = [s.card, style];
  if (!onPress) return <View style={body}>{children}</View>;
  return <Pressable onPress={onPress} style={({ pressed }) => [body, pressed && { opacity: 0.85, transform: [{ scale: 0.99 }] }]}>{children}</Pressable>;
}
const s = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: radius.lg, padding: 16, borderWidth: 1, borderColor: colors.border },
});
