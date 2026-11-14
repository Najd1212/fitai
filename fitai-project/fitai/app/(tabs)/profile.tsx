import { useEffect, useState } from 'react';
import { Text, Alert } from 'react-native';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { Screen } from '@/components/Screen';
import { Field } from '@/components/Field';
import { Button } from '@/components/Button';
import { colors } from '@/theme';

const csv = (s: string) => s.split(',').map(x => x.trim()).filter(Boolean);

export default function Profile() {
  const { session } = useAuth();
  const uid = session!.user.id;
  const [name, setName] = useState(''); const [gender, setGender] = useState('');
  const [top, setTop] = useState(''); const [bottom, setBottom] = useState(''); const [shoes, setShoes] = useState('');
  const [colorsTxt, setColorsTxt] = useState(''); const [styles, setStyles] = useState('');
  const [busy, setBusy] = useState(false); const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase.from('profiles').select('*').eq('id', uid).single().then(({ data, error }) => {
      if (error) Alert.alert('Could not load profile', error.message);
      if (data) {
        setName(data.display_name ?? ''); setGender(data.gender ?? '');
        setTop(data.sizes?.top ?? ''); setBottom(data.sizes?.bottom ?? ''); setShoes(data.sizes?.shoes ?? '');
        setColorsTxt((data.favorite_colors ?? []).join(', ')); setStyles((data.style_preferences ?? []).join(', '));
      }
      setLoaded(true);
    });
  }, [uid]);

  const save = async () => {
    setBusy(true);
    const { error } = await supabase.from('profiles').update({
      display_name: name, gender, sizes: { top, bottom, shoes },
      favorite_colors: csv(colorsTxt), style_preferences: csv(styles),
    }).eq('id', uid);
    setBusy(false);
    Alert.alert(error ? 'Save failed' : 'Saved', error?.message ?? 'Profile updated.');
  };

  return (
    <Screen title="Profile">
      <Text style={{ color: colors.muted }}>{session!.user.email}</Text>
      <Field placeholder="Display name" value={name} onChangeText={setName} editable={loaded} />
      <Field placeholder="Gender" value={gender} onChangeText={setGender} editable={loaded} />
      <Field placeholder="Top size (e.g. M)" value={top} onChangeText={setTop} />
      <Field placeholder="Bottom size (e.g. 32)" value={bottom} onChangeText={setBottom} />
      <Field placeholder="Shoe size (e.g. 42)" value={shoes} onChangeText={setShoes} />
      <Field placeholder="Favorite colors (comma separated)" value={colorsTxt} onChangeText={setColorsTxt} />
      <Field placeholder="Style preferences (minimal, streetwear…)" value={styles} onChangeText={setStyles} />
      <Button title="Save" onPress={save} loading={busy} />
      <Button title="Log out" variant="ghost" onPress={() => supabase.auth.signOut()} />
    </Screen>
  );
}
