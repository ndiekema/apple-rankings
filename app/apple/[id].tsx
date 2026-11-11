import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppleMark } from '@/components/AppleMark';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';
import { findApple } from '@/data/apples';

export default function AppleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const apple = findApple(id);

  if (!apple) {
    return (
      <Screen><Text style={styles.notFound}>That apple is not in Pip’s approved catalog yet.</Text></Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.topBar}>
        <Text onPress={() => router.back()} style={styles.back}>‹</Text>
        <Text style={styles.save}>♡</Text>
      </View>
      <View style={styles.hero}>
        <AppleMark tone={apple.tone} size={112} />
        <Text style={styles.eyebrow}>Apple variety</Text>
        <Text style={styles.title}>{apple.name}</Text>
        <View style={styles.rankPill}><Text style={styles.rankPillText}>Global #{apple.globalRank} · {apple.globalScore.toFixed(1)}</Text></View>
      </View>
      <View style={styles.divider} />
      <View style={styles.scoreRow}>
        <View>
          <Text style={styles.eyebrow}>Community score</Text>
          <Text style={styles.score}>{apple.globalScore.toFixed(1)} <Text style={styles.scoreMeta}>from {apple.ratingCount} rankings</Text></Text>
        </View>
        <Pressable onPress={() => router.push(`/ranking/${apple.id}`)} style={styles.rankButton}><Text style={styles.rankButtonText}>Rank it</Text></Pressable>
      </View>
      <View style={styles.traitCard}>
        {apple.traits.map((trait, index) => (
          <View key={trait} style={styles.traitRow}>
            <Text style={styles.traitLabel}>{trait}</Text>
            <View style={styles.traitTrack}><View style={[styles.traitFill, { width: `${[86, 100, 80][index] ?? 74}%` }]} /></View>
          </View>
        ))}
      </View>
      <View style={styles.descriptionCard}>
        <Text style={styles.eyebrow}>From the catalog</Text>
        <Text style={styles.description}>{apple.description}</Text>
        <Text style={styles.origin}>{apple.origin} · {apple.season}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  back: { color: colors.ink, fontFamily: 'Georgia', fontSize: 38, lineHeight: 38 },
  save: { color: colors.ink, fontSize: 27 },
  hero: { alignItems: 'center', gap: 8, marginTop: 4 },
  eyebrow: { color: colors.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  title: { color: colors.ink, fontFamily: 'Georgia', fontSize: 36, letterSpacing: -1.4 },
  rankPill: { backgroundColor: colors.redSoft, borderRadius: 99, paddingHorizontal: 11, paddingVertical: 6 },
  rankPillText: { color: colors.red, fontSize: 12, fontWeight: '700' },
  divider: { backgroundColor: colors.line, height: 1, marginVertical: 8 },
  scoreRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  score: { color: colors.ink, fontFamily: 'Georgia', fontSize: 25, marginTop: 5 },
  scoreMeta: { color: colors.muted, fontFamily: 'System', fontSize: 12 },
  rankButton: { backgroundColor: colors.red, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12 },
  rankButtonText: { color: colors.surface, fontSize: 14, fontWeight: '700' },
  traitCard: { backgroundColor: colors.surface, borderColor: colors.line, borderRadius: 19, borderWidth: 1, gap: 15, padding: 16 },
  traitRow: { gap: 7 },
  traitLabel: { color: colors.ink, fontSize: 13, fontWeight: '700', textTransform: 'capitalize' },
  traitTrack: { backgroundColor: '#EEE8DC', borderRadius: 99, height: 7, overflow: 'hidden' },
  traitFill: { backgroundColor: colors.green, borderRadius: 99, height: '100%' },
  descriptionCard: { backgroundColor: colors.goldSoft, borderRadius: 19, gap: 9, padding: 17 },
  description: { color: colors.ink, fontFamily: 'Georgia', fontSize: 18, lineHeight: 24 },
  origin: { color: colors.green, fontSize: 12, fontWeight: '700' },
  notFound: { color: colors.ink, fontSize: 16, textAlign: 'center' },
});
