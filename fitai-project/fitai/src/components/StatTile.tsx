import { View, Text } from 'react-native';
import { Card } from './Card';
import { colors } from '@/theme';
export const StatTile = ({ value, label }: { value: number | string; label: string }) => (
  <Card style={{ flex: 1, alignItems: 'center', paddingVertical: 18 }}>
    <View><Text style={{ color: colors.accent, fontSize: 28, fontWeight: '300', textAlign: 'center' }}>{value}</Text>
    <Text style={{ color: colors.muted, fontSize: 12, marginTop: 2 }}>{label}</Text></View>
  </Card>
);
