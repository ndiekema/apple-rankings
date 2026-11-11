import { router } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppleRow } from '@/components/AppleRow';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';
import { apples, myRankings } from '@/data/apples';
import { useAuth } from '@/providers/AuthProvider';

export default function ProfileScreen() {
  const { signOut, user } = useAuth();
  const displayName = user?.user_metadata.display_name ?? 'Pip taster';
  const username = user?.user_metadata.username ?? 'apple_fan';
  const initial = displayName.slice(0, 1).toUpperCase();

  const handleSignOut = () => {
    Alert.alert('Log out of Pip?', 'You can log back in whenever you like.', [
      { style: 'cancel', text: 'Cancel' },
      { style: 'destructive', text: 'Log out', onPress: () => void signOut() },
    ]);
  };

  return (
    <Screen>
      <View style={styles.profile}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{initial}</Text></View>
        <Text style={styles.name}>{displayName}</Text>
        <Text style={styles.meta}>@{username} · 22 apples ranked · 14 friends</Text>
        <View style={styles.publicPill}><Text style={styles.publicText}>Public profile</Text></View>
        <Pressable accessibilityRole="button" onPress={handleSignOut} style={styles.signOut}><Text style={styles.signOutText}>Log out</Text></Pressable>
      </View>
      <View style={styles.headingRow}>
        <Text style={styles.sectionTitle}>Your list</Text>
        <View style={styles.countPill}><Text style={styles.countText}>22 ranked</Text></View>
      </View>
      {myRankings.map((ranking) => {
        const apple = apples.find((item) => item.id === ranking.appleId);
        if (!apple) return null;
        return (
          <AppleRow
            apple={apple}
            detail={`${ranking.score.toFixed(1)} personal score · ranked ${ranking.rankedAt}`}
            key={ranking.appleId}
            onPress={() => router.push(`/apple/${apple.id}`)}
            rank={ranking.rank}
          />
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  profile: { alignItems: 'center', gap: 7, paddingVertical: 5 },
  avatar: { alignItems: 'center', backgroundColor: '#E5BCB3', borderRadius: 99, height: 76, justifyContent: 'center', width: 76 },
  avatarText: { color: colors.red, fontFamily: 'Georgia', fontSize: 35 },
  name: { color: colors.ink, fontFamily: 'Georgia', fontSize: 34, letterSpacing: -1 },
  meta: { color: colors.muted, fontSize: 13 },
  publicPill: { backgroundColor: colors.greenSoft, borderRadius: 99, marginTop: 3, paddingHorizontal: 10, paddingVertical: 5 },
  publicText: { color: colors.green, fontSize: 11, fontWeight: '700' },
  signOut: { marginTop: 2, padding: 6 },
  signOutText: { color: colors.red, fontSize: 12, fontWeight: '700' },
  headingRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  sectionTitle: { color: colors.ink, fontFamily: 'Georgia', fontSize: 22 },
  countPill: { backgroundColor: colors.redSoft, borderRadius: 99, paddingHorizontal: 10, paddingVertical: 5 },
  countText: { color: colors.red, fontSize: 11, fontWeight: '700' },
});
