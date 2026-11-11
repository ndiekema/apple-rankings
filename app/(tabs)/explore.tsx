import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { AppleRow } from '@/components/AppleRow';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';
import { apples } from '@/data/apples';

export default function ExploreScreen() {
  const [query, setQuery] = useState('');
  const visibleApples = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return apples;
    return apples.filter((apple) => [apple.name, ...apple.aliases].some((term) => term.toLowerCase().includes(normalized)));
  }, [query]);

  return (
    <Screen>
      <View>
        <Text style={styles.eyebrow}>The Pip catalog</Text>
        <Text style={styles.title}>Find an apple</Text>
      </View>
      <TextInput
        accessibilityLabel="Search the apple catalog"
        autoCapitalize="words"
        onChangeText={setQuery}
        placeholder="Search Honeycrisp, Pink Lady, Mac…"
        placeholderTextColor={colors.muted}
        style={styles.search}
        value={query}
      />
      <View style={styles.headingRow}>
        <Text style={styles.sectionTitle}>{query ? 'Matches' : 'In season'}</Text>
        {!query ? <View style={styles.seasonPill}><Text style={styles.seasonText}>Fall</Text></View> : null}
      </View>
      {visibleApples.map((apple) => (
        <AppleRow
          apple={apple}
          detail={`${apple.origin} · ${apple.traits.join(', ')}`}
          key={apple.id}
          onPress={() => router.push(`/apple/${apple.id}`)}
        />
      ))}
      {!visibleApples.length ? <Text style={styles.empty}>No approved Pip variety matches that search yet.</Text> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  eyebrow: { color: colors.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  title: { color: colors.ink, fontFamily: 'Georgia', fontSize: 34, letterSpacing: -1.4, marginTop: 5 },
  search: { backgroundColor: colors.surface, borderColor: colors.line, borderRadius: 13, borderWidth: 1, color: colors.ink, fontSize: 14, paddingHorizontal: 15, paddingVertical: 13 },
  headingRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  sectionTitle: { color: colors.ink, fontFamily: 'Georgia', fontSize: 22 },
  seasonPill: { backgroundColor: colors.greenSoft, borderRadius: 99, paddingHorizontal: 10, paddingVertical: 5 },
  seasonText: { color: colors.green, fontSize: 11, fontWeight: '700' },
  empty: { color: colors.muted, fontSize: 14, lineHeight: 21, paddingVertical: 30, textAlign: 'center' },
});
