import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/theme';
import type { Apple } from '@/types/domain';
import { AppleMark } from './AppleMark';

type Props = {
  apple: Apple;
  detail: string;
  onPress?: () => void;
  rank?: number;
};

export function AppleRow({ apple, detail, onPress, rank }: Props) {
  const content = (
    <>
      {rank ? <Text style={styles.rank}>{rank}</Text> : null}
      <AppleMark tone={apple.tone} />
      <View style={styles.copy}>
        <Text style={styles.name}>{apple.name}</Text>
        <Text style={styles.detail}>{detail}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </>
  );

  if (onPress) {
    return <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>{content}</Pressable>;
  }

  return <View style={styles.row}>{content}</View>;
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    minHeight: 74,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  pressed: {
    opacity: 0.72,
  },
  rank: {
    color: colors.red,
    fontFamily: 'Georgia',
    fontSize: 24,
    minWidth: 22,
  },
  copy: {
    flex: 1,
    gap: 3,
  },
  name: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '700',
  },
  detail: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
  },
  chevron: {
    color: colors.red,
    fontFamily: 'Georgia',
    fontSize: 27,
  },
});
