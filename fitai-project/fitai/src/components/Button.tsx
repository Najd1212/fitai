import { Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors, radius } from '@/theme';

export function Button({ title, onPress, loading, variant = 'primary' }:
  { title: string; onPress: () => void; loading?: boolean; variant?: 'primary' | 'ghost' }) {
  return (
    <Pressable onPress={onPress} disabled={loading}
      style={({ pressed }) => [s.base, variant === 'ghost' ? s.ghost : s.primary, pressed && { opacity: 0.8 }]}>
      {loading ? <ActivityIndicator color={variant === 'ghost' ? colors.text : '#000'} />
        : <Text style={[s.text, variant === 'ghost' && { color: colors.text }]}>{title}</Text>}
    </Pressable>
  );
}
const s = StyleSheet.create({
  base: { height: 52, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
  primary: { backgroundColor: colors.accent },
  ghost: { borderWidth: 1, borderColor: colors.border },
  text: { color: '#000', fontSize: 16, fontWeight: '600', letterSpacing: 0.3 },
});
