import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';

const tab = (name: string, title: string, icon: keyof typeof Ionicons.glyphMap) => (
  <Tabs.Screen key={name} name={name} options={{ title,
    tabBarIcon: ({ color, size }) => <Ionicons name={icon} color={color} size={size} /> }} />
);
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.accent,
      tabBarInactiveTintColor: colors.muted,
      tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border } }}>
      {tab('index', 'Home', 'home-outline')}
      {tab('wardrobe', 'Wardrobe', 'shirt-outline')}
      {tab('stylist', 'Stylist', 'sparkles-outline')}
      {tab('outfits', 'Outfits', 'albums-outline')}
      {tab('profile', 'Profile', 'person-outline')}
    </Tabs>
  );
}
