import { Text } from 'react-native';
import { colors } from '@/theme';
export const SectionHeader = ({ title }: { title: string }) =>
  <Text style={{ color: colors.muted, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginTop: 8 }}>{title}</Text>;
