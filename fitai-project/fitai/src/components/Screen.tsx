import { ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme';

export function Screen({ title, children, scroll = true }: { title?: string; children: ReactNode; scroll?: boolean }) {
  const body = <View style={{ padding: 20, gap: 14 }}>
    {title && <Text style={{ color: colors.text, fontSize: 32, fontWeight: '300', letterSpacing: 1 }}>{title}</Text>}
    {children}
  </View>;
  return <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
    {scroll ? <ScrollView keyboardShouldPersistTaps="handled">{body}</ScrollView> : body}
  </SafeAreaView>;
}
