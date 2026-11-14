import { useState } from 'react';
import { Text, Alert } from 'react-native';
import { Link } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Screen } from '@/components/Screen';
import { Field } from '@/components/Field';
import { Button } from '@/components/Button';
import { colors } from '@/theme';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async () => {
    setBusy(true);
    const { error, data } = await supabase.auth.signUp({ email: email.trim(), password });
    setBusy(false);
    if (error) Alert.alert('Sign up failed', error.message);
    else if ('signup' === 'signup' && !data.session) Alert.alert('Check your email', 'Confirm your address, then log in.');
  };
  return (
    <Screen title="FitAI">
      <Text style={{ color: colors.muted, marginBottom: 12 }}>Create your account.</Text>
      <Field placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <Field placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Sign up" onPress={submit} loading={busy} />
      <Link href="/(auth)/login" style={{ color: colors.accent, textAlign: 'center', marginTop: 8 }}>Have an account? Log in</Link>
    </Screen>
  );
}
