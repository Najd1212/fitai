import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, radius } from '@/theme';

export function Chip({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={[s.chip, active && s.active]}>
      <Text style={[s.text, active && { color: '#000' }]}>{label}</Text>
    </Pressable>
  );
}
const s = StyleSheet.create({
  chip: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  active: { backgroundColor: colors.accent, borderColor: colors.accent },
  text: { color: colors.text, fontSize: 14, fontWeight: '500' },
});
