# FitAI – Stage 1

## Setup
1. Supabase: create a project, then run `supabase/migrations/001_init.sql` in the SQL editor.
   (Auth → Providers → Email: turn OFF "Confirm email" while developing.)
2. `cp .env.example .env` and fill in your project URL + anon key.
3. `npm install`
4. `npx expo install --fix`   (aligns every package to the Expo SDK)
5. `npx expo start`

## Android phone with Expo Go
1. Install **Expo Go** from the Google Play Store.
2. Phone and computer on the same Wi-Fi.
3. Scan the QR code from the terminal using the Expo Go app.
4. If it can't connect: `npx expo start --tunnel` (accept installing @expo/ngrok).
