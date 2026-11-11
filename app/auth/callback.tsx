import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/theme';

// The session is created by AuthProvider after Supabase redirects here.
export default function AuthCallbackScreen() {
  return (
    <View style={styles.page}>
      <ActivityIndicator color={colors.red} size="large" />
      <Text style={styles.title}>Finishing your Pip sign-in…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { alignItems: 'center', backgroundColor: colors.cream, flex: 1, gap: 16, justifyContent: 'center', padding: 24 },
  title: { color: colors.ink, fontFamily: 'Georgia', fontSize: 22 },
});
