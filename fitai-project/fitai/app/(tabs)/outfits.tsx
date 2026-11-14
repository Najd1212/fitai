import { ActivityIndicator, Text } from 'react-native';
import { useTable } from '@/lib/useTable';
import type { Outfit } from '@/types';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { EmptyState } from '@/components/EmptyState';
import { colors } from '@/theme';

export default function Outfits() {
  const { data, loading, error } = useTable<Outfit>('outfits', 'id,name,occasion,tags,created_at');
  return (
    <Screen title="Saved Outfits">
      {loading && <ActivityIndicator color={colors.accent} />}
      {error && <Text style={{ color: colors.danger }}>{error}</Text>}
      {!loading && !error && data.length === 0 && (
        <EmptyState icon="albums-outline" title="No saved outfits yet"
          body="Upload an outfit photo or save an AI suggestion — coming in Stage 3." />
      )}
      {data.map(o => (
        <Card key={o.id}>
          <Text style={{ color: colors.text, fontSize: 17 }}>{o.name}</Text>
          <Text style={{ color: colors.muted, marginTop: 4 }}>{[o.occasion, ...o.tags].filter(Boolean).join(' · ')}</Text>
        </Card>
      ))}
    </Screen>
  );
}
