import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';

export function EmptyState({ icon, title, body }: { icon: keyof typeof Ionicons.glyphMap; title: string; body: string }) {
  return (
    <View style={{ alignItems: 'center', paddingVertical: 48, gap: 10 }}>
      <Ionicons name={icon} size={44} color={colors.muted} />
      <Text style={{ color: colors.text, fontSize: 18, fontWeight: '500' }}>{title}</Text>
      <Text style={{ color: colors.muted, textAlign: 'center', lineHeight: 20, maxWidth: 280 }}>{body}</Text>
    </View>
  );
}
