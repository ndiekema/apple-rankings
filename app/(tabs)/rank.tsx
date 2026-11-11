import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppleMark } from '@/components/AppleMark';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';
import { apples } from '@/data/apples';

export default function RankScreen() {
  const apple = apples.find((item) => item.id === 'honeycrisp')!;

  return (
    <Screen contentStyle={styles.content}>
      <View>
        <Text style={styles.eyebrow}>Your next opinion</Text>
        <Text style={styles.title}>Ready to rank?</Text>
      </View>
      <View style={styles.heroCard}>
        <AppleMark tone={apple.tone} size={76} />
        <View style={styles.copy}>
          <Text style={styles.name}>Honeycrisp</Text>
          <Text style={styles.muted}>Crisp · juicy · sweet-tart</Text>
        </View>
        <Text onPress={() => router.push(`/ranking/${apple.id}`)} style={styles.rankButton}>Rank it</Text>
      </View>
      <View style={styles.howCard}>
        <Text style={styles.sectionTitle}>A few comparisons, then it’s placed.</Text>
        <Text style={styles.body}>Pip asks which apple you prefer, instead of asking you to invent a number. Your personal score follows from its position in your list.</Text>
        <Text style={styles.tip}>Only rank apples you have tried.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { justifyContent: 'space-between', minHeight: 520 },
  eyebrow: { color: colors.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  title: { color: colors.ink, fontFamily: 'Georgia', fontSize: 34, letterSpacing: -1.4, marginTop: 5 },
  heroCard: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.line, borderRadius: 22, borderWidth: 1, flexDirection: 'row', gap: 14, padding: 18 },
  copy: { flex: 1, gap: 4 },
  name: { color: colors.ink, fontFamily: 'Georgia', fontSize: 22 },
  muted: { color: colors.muted, fontSize: 12 },
  rankButton: { backgroundColor: colors.red, borderRadius: 12, color: colors.surface, fontSize: 13, fontWeight: '700', overflow: 'hidden', paddingHorizontal: 14, paddingVertical: 11 },
  howCard: { backgroundColor: colors.goldSoft, borderRadius: 22, gap: 11, padding: 19 },
  sectionTitle: { color: colors.ink, fontFamily: 'Georgia', fontSize: 22, lineHeight: 28 },
  body: { color: colors.ink, fontSize: 14, lineHeight: 21 },
  tip: { color: colors.green, fontSize: 13, fontWeight: '700', marginTop: 2 },
});
