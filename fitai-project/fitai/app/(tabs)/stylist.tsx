import { useState } from 'react';
import { Text } from 'react-native';
import { Screen } from '@/components/Screen';
import { Chip } from '@/components/Chip';
import { Field } from '@/components/Field';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { SectionHeader } from '@/components/SectionHeader';
import { colors } from '@/theme';

const OCCASIONS = ['School', 'Casual', 'Party', 'Formal', 'Sports', 'Special event'];

export default function Stylist() {
  const [occasion, setOccasion] = useState('Casual');
  const [notes, setNotes] = useState('');
  return (
    <Screen title="AI Stylist">
      <SectionHeader title="Occasion" />
      <Card style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {OCCASIONS.map(o => <Chip key={o} label={o} active={occasion === o} onPress={() => setOccasion(o)} />)}
      </Card>
      <Field placeholder="Anything else? (weather, mood, dress code)" value={notes} onChangeText={setNotes} />
      <Button title="Create outfit" onPress={() => {}} />
      <Text style={{ color: colors.muted, textAlign: 'center' }}>
        Recommendations are generated from your real wardrobe by Claude in Stage 3.
      </Text>
    </Screen>
  );
}
