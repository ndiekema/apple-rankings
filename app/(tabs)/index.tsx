import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppleMark } from '@/components/AppleMark';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';
import { apples, friendActivities } from '@/data/apples';

export default function HomeScreen() {
  return (
    <Screen>
      <View>
        <Text style={styles.eyebrow}>Tuesday, October 22</Text>
        <Text style={styles.title}>Your orchard</Text>
      </View>

      <View style={styles.weekCard}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.eyebrow}>This week</Text>
            <Text style={styles.cardTitle}>2 apples ranked</Text>
          </View>
          <AppleMark tone="gold" />
        </View>
        <View style={styles.progressTrack}><View style={styles.progress} /></View>
        <Text style={styles.muted}>Your next ranking is one bite away.</Text>
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.sectionTitle}>Friends are ranking</Text>
        <Text style={styles.muted}>See all</Text>
      </View>

      {friendActivities.map((activity) => {
        const apple = apples.find((item) => item.id === activity.appleId);
        if (!apple) return null;
        return (
          <View key={activity.id} style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <View style={[styles.avatar, activity.initials === 'A' && styles.greenAvatar]}><Text style={styles.avatarText}>{activity.initials}</Text></View>
              <View style={styles.activityCopy}>
                <Text style={styles.activityTitle}>{activity.person} {activity.action}</Text>
                <Text style={styles.muted}>{activity.happenedAt}</Text>
              </View>
            </View>
            {activity.caption ? <Text style={styles.caption}>“{activity.caption}”</Text> : null}
            <View style={styles.divider} />
            <View style={styles.appleRow}>
              <AppleMark tone={apple.tone} size={38} />
              <View style={styles.activityCopy}>
                <Text style={styles.activityTitle}>{apple.name}</Text>
                <Text style={styles.muted}>{apple.traits.join(' · ')}</Text>
              </View>
              <Text onPress={() => router.push(`/apple/${apple.id}`)} style={styles.chevron}>›</Text>
            </View>
          </View>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  eyebrow: { color: colors.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  title: { color: colors.ink, fontFamily: 'Georgia', fontSize: 34, letterSpacing: -1.4, marginTop: 5 },
  cardTitle: { color: colors.ink, fontFamily: 'Georgia', fontSize: 22, marginTop: 5 },
  sectionTitle: { color: colors.ink, fontFamily: 'Georgia', fontSize: 22 },
  weekCard: { backgroundColor: colors.surface, borderColor: colors.line, borderRadius: 20, borderWidth: 1, gap: 12, padding: 16 },
  rowBetween: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  muted: { color: colors.muted, fontSize: 12 },
  progressTrack: { backgroundColor: '#EEE8DC', borderRadius: 99, height: 7, overflow: 'hidden' },
  progress: { backgroundColor: colors.green, borderRadius: 99, height: '100%', width: '68%' },
  activityCard: { backgroundColor: colors.surface, borderColor: colors.line, borderRadius: 20, borderWidth: 1, padding: 15 },
  activityHeader: { alignItems: 'center', flexDirection: 'row', gap: 10 },
  avatar: { alignItems: 'center', backgroundColor: '#E5BCB3', borderRadius: 99, height: 38, justifyContent: 'center', width: 38 },
  greenAvatar: { backgroundColor: '#CAD6C3' },
  avatarText: { color: colors.red, fontFamily: 'Georgia', fontSize: 19 },
  activityCopy: { flex: 1, gap: 3 },
  activityTitle: { color: colors.ink, fontSize: 14, fontWeight: '700' },
  caption: { color: colors.ink, fontFamily: 'Georgia', fontSize: 16, lineHeight: 22, marginTop: 14 },
  divider: { backgroundColor: colors.line, height: 1, marginVertical: 14 },
  appleRow: { alignItems: 'center', flexDirection: 'row', gap: 10 },
  chevron: { color: colors.red, fontFamily: 'Georgia', fontSize: 28 },
});
