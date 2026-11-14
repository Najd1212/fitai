import { useMemo, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTable } from '@/lib/useTable';
import type { ClothingItem } from '@/types';
import { Field } from '@/components/Field';
import { Chip } from '@/components/Chip';
import { Card } from '@/components/Card';
import { EmptyState } from '@/components/EmptyState';
import { colors } from '@/theme';

export default function Wardrobe() {
  const { data, loading, error, refresh } = useTable<ClothingItem>('clothing_items', 'id,name,category,primary_color,is_clean,created_at');
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<string | null>(null);
  const cats = useMemo(() => [...new Set(data.map(i => i.category))], [data]);
  const shown = data.filter(i => (!cat || i.category === cat) && i.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.accent} />}
        contentContainerStyle={{ padding: 20, gap: 14 }}>
        <Text style={{ color: colors.text, fontSize: 32, fontWeight: '300', letterSpacing: 1 }}>Wardrobe</Text>
        <Field placeholder="Search your clothes" value={q} onChangeText={setQ} />
        {cats.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            <Chip label="All" active={!cat} onPress={() => setCat(null)} />
            {cats.map(c => <Chip key={c} label={c} active={cat === c} onPress={() => setCat(c)} />)}
          </ScrollView>
        )}
        {loading && data.length === 0 && <ActivityIndicator color={colors.accent} />}
        {error && <Text style={{ color: colors.danger }}>{error}</Text>}
        {!loading && !error && data.length === 0 && (
          <EmptyState icon="shirt-outline" title="Your wardrobe is empty"
            body="Adding clothes with the multi-angle scanner arrives in Stage 2." />
        )}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {shown.map(i => (
            <Card key={i.id} style={{ width: '47.5%', opacity: i.is_clean ? 1 : 0.6 }}>
              <Text style={{ color: colors.text, fontSize: 16 }} numberOfLines={1}>{i.name}</Text>
              <Text style={{ color: colors.muted, marginTop: 4 }}>{i.category}{i.is_clean ? '' : ' · dirty'}</Text>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
