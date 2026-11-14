import { useState } from 'react';
import { Text, Alert } from 'react-native';
import { Link } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Screen } from '@/components/Screen';
import { Field } from '@/components/Field';
import { Button } from '@/components/Button';
import { colors } from '@/theme';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async () => {
    setBusy(true);
    const { error, data } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) Alert.alert('Log in failed', error.message);
    else if ('login' === 'signup' && !data.session) Alert.alert('Check your email', 'Confirm your address, then log in.');
  };
  return (
    <Screen title="FitAI">
      <Text style={{ color: colors.muted, marginBottom: 12 }}>Your wardrobe, styled by AI.</Text>
      <Field placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <Field placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Log in" onPress={submit} loading={busy} />
      <Link href="/(auth)/signup" style={{ color: colors.accent, textAlign: 'center', marginTop: 8 }}>New here? Create an account</Link>
    </Screen>
  );
}
