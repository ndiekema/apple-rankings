import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppleMark } from '@/components/AppleMark';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';
import { findApple } from '@/data/apples';

export default function RankingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const apple = findApple(id);
  const comparisonApple = findApple('golden-delicious');
  const [choice, setChoice] = useState<string | null>(null);

  if (!apple || !comparisonApple) {
    return <Screen><Text style={styles.body}>This apple is unavailable.</Text></Screen>;
  }

  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.topBar}>
        <Text onPress={() => router.back()} style={styles.close}>×</Text>
        <Text style={styles.progress}>1 of 3 comparisons</Text>
      </View>
      <View>
        <Text style={styles.eyebrow}>Place {apple.name}</Text>
        <Text style={styles.title}>A very serious decision.</Text>
        <Text style={styles.prompt}>Which do you prefer?</Text>
      </View>
      <View style={styles.compareRow}>
        <Pressable onPress={() => setChoice(apple.id)} style={[styles.choiceCard, choice === apple.id && styles.selected]}>
          <AppleMark tone={apple.tone} size={72} />
          <Text style={styles.choiceName}>{apple.name}</Text>
          <Text style={styles.choiceMeta}>New apple</Text>
        </Pressable>
        <Text style={styles.or}>or</Text>
        <Pressable onPress={() => setChoice(comparisonApple.id)} style={[styles.choiceCard, choice === comparisonApple.id && styles.selected]}>
          <AppleMark tone={comparisonApple.tone} size={72} />
          <Text style={styles.choiceName}>{comparisonApple.name}</Text>
          <Text style={styles.choiceMeta}>Your #2</Text>
        </Pressable>
      </View>
      <Pressable onPress={() => setChoice('equal')} style={[styles.equalButton, choice === 'equal' && styles.equalSelected]}><Text style={styles.equalText}>I like them equally</Text></Pressable>
      <View style={styles.footer}>
        <Text style={styles.remaining}>2 more comparisons to find its spot</Text>
        <Pressable disabled={!choice} onPress={() => router.back()} style={[styles.continueButton, !choice && styles.disabled]}><Text style={styles.continueText}>Continue</Text></Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, justifyContent: 'space-between' },
  topBar: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  close: { color: colors.ink, fontSize: 31, lineHeight: 31 },
  progress: { color: colors.muted, fontSize: 12, fontWeight: '700' },
  eyebrow: { color: colors.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginTop: 18, textTransform: 'uppercase' },
  title: { color: colors.ink, fontFamily: 'Georgia', fontSize: 34, letterSpacing: -1.4, marginTop: 5 },
  prompt: { color: colors.muted, fontSize: 14, marginTop: 10, textAlign: 'center' },
  compareRow: { alignItems: 'center', flexDirection: 'row', gap: 8, justifyContent: 'center' },
  choiceCard: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.line, borderRadius: 19, borderWidth: 1, flex: 1, gap: 8, justifyContent: 'center', minHeight: 176, padding: 11 },
  selected: { borderColor: colors.red, borderWidth: 2, backgroundColor: '#FFF5F1' },
  choiceName: { color: colors.ink, fontFamily: 'Georgia', fontSize: 18, textAlign: 'center' },
  choiceMeta: { color: colors.muted, fontSize: 12 },
  or: { color: colors.muted, fontFamily: 'Georgia', fontSize: 14 },
  equalButton: { alignItems: 'center', borderColor: colors.ink, borderRadius: 12, borderWidth: 1, padding: 13 },
  equalSelected: { backgroundColor: colors.goldSoft },
  equalText: { color: colors.ink, fontSize: 14, fontWeight: '700' },
  footer: { gap: 14 },
  remaining: { color: colors.muted, fontSize: 12, textAlign: 'center' },
  continueButton: { alignItems: 'center', backgroundColor: colors.red, borderRadius: 12, padding: 14 },
  disabled: { opacity: 0.38 },
  continueText: { color: colors.surface, fontSize: 14, fontWeight: '700' },
  body: { color: colors.ink, fontSize: 16 },
});
