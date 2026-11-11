import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppleRow } from '@/components/AppleRow';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';
import { apples } from '@/data/apples';

export default function GlobalScreen() {
  const leaderboard = [...apples].sort((a, b) => a.globalRank - b.globalRank);
  const topApple = leaderboard[0];

  return (
    <Screen>
      <View>
        <Text style={styles.eyebrow}>Everyone's picks</Text>
        <Text style={styles.title}>Global orchard</Text>
      </View>
      <View style={styles.topCard}>
        <Text style={styles.eyebrow}>Current #1</Text>
        <View style={styles.topRow}>
          <Text style={styles.rank}>1</Text>
          <View style={styles.appleWrap}><AppleRow apple={topApple} detail={`${topApple.globalScore.toFixed(1)} average · ${topApple.ratingCount} rankings`} onPress={() => router.push(`/apple/${topApple.id}`)} /></View>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Leaderboard</Text>
      {leaderboard.slice(1).map((apple) => (
        <AppleRow
          apple={apple}
          detail={`${apple.globalScore.toFixed(1)} average · ${apple.ratingCount} rankings`}
          key={apple.id}
          onPress={() => router.push(`/apple/${apple.id}`)}
          rank={apple.globalRank}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  eyebrow: { color: colors.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  title: { color: colors.ink, fontFamily: 'Georgia', fontSize: 34, letterSpacing: -1.4, marginTop: 5 },
  topCard: { backgroundColor: colors.goldSoft, borderRadius: 21, gap: 10, padding: 17 },
  topRow: { alignItems: 'center', flexDirection: 'row', gap: 7 },
  rank: { color: colors.red, fontFamily: 'Georgia', fontSize: 34 },
  appleWrap: { flex: 1 },
  sectionTitle: { color: colors.ink, fontFamily: 'Georgia', fontSize: 22, marginTop: 4 },
});
