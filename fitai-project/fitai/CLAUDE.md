# FitAI – AI personal stylist (Expo + TypeScript + Supabase + Claude)
Stack: Expo Router, Supabase (auth/db/storage), Claude API called ONLY from Supabase Edge Functions (never from the app).
Rules: real DB operations only; no hardcoded inventory; no fake recommendations; never recommend dirty clothes; reusable components in src/components.
Stages: 1 structure/auth/schema/tabs (done) -> 2 wardrobe + multi-angle scanner -> 3 AI stylist + saved outfits -> 4 3D avatar + outfit preview.
Run: npm install && npx expo install --fix && npx expo start
