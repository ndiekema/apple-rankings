import 'react-native-url-polyfill/auto';
import 'expo-sqlite/localStorage/install';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error('Pip is missing its Supabase connection settings. Add them to .env and restart Expo.');
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    // Expo SQLite supplies localStorage on native. It is unavailable only while
    // Expo server-renders the web shell, where there is no user session yet.
    storage: globalThis.localStorage,
    autoRefreshToken: true,
    persistSession: typeof globalThis.localStorage !== 'undefined',
    detectSessionInUrl: false,
  },
});
