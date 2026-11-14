import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { colors, radius } from '@/theme';
export const Field = (p: TextInputProps) =>
  <TextInput placeholderTextColor={colors.muted} autoCapitalize="none" {...p} style={[s.input, p.style]} />;
const s = StyleSheet.create({
  input: { height: 52, borderRadius: radius.md, backgroundColor: colors.card, color: colors.text,
    paddingHorizontal: 16, fontSize: 16, borderWidth: 1, borderColor: colors.border },
});
