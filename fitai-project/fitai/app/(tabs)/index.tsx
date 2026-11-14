import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { useTable } from '@/lib/useTable';
import type { ClothingItem } from '@/types';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { StatTile } from '@/components/StatTile';
import { SectionHeader } from '@/components/SectionHeader';
import { FadeIn } from '@/components/FadeIn';
import { colors } from '@/theme';

export default function Home() {
  const { session } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const { data: items, error } = useTable<ClothingItem>('clothing_items', 'id,name,category,primary_color,is_clean,created_at');
  useEffect(() => {
    supabase.from('profiles').select('display_name').eq('id', session!.user.id).single()
      .then(({ data }) => setName(data?.display_name ?? ''));
  }, [session]);
  const clean = items.filter(i => i.is_clean).length;

  return (
    <Screen>
      <FadeIn>
        <Text style={{ color: colors.muted, letterSpacing: 2, fontSize: 12 }}>WELCOME BACK</Text>
        <Text style={{ color: colors.text, fontSize: 34, fontWeight: '300' }}>{name || 'Stylist'}</Text>
      </FadeIn>
      {error && <Text style={{ color: colors.danger }}>{error}</Text>}
      <FadeIn delay={120}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <StatTile value={items.length} label="Pieces" />
          <StatTile value={clean} label="Clean" />
          <StatTile value={items.length - clean} label="Dirty" />
        </View>
      </FadeIn>
      <SectionHeader title="Quick actions" />
      <FadeIn delay={240}>
        <Card onPress={() => router.push('/(tabs)/stylist')} style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <Ionicons name="sparkles" size={26} color={colors.accent} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.text, fontSize: 17 }}>Style me</Text>
            <Text style={{ color: colors.muted, marginTop: 2 }}>Outfits from your own wardrobe</Text>
          </View>
        </Card>
      </FadeIn>
      <FadeIn delay={340}>
        <Card onPress={() => router.push('/(tabs)/wardrobe')} style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <Ionicons name="shirt" size={26} color={colors.accent} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.text, fontSize: 17 }}>Your wardrobe</Text>
            <Text style={{ color: colors.muted, marginTop: 2 }}>Browse, search and filter</Text>
          </View>
        </Card>
      </FadeIn>
    </Screen>
  );
}
