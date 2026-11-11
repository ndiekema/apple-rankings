import { StyleSheet, View } from 'react-native';

import { colors } from '@/constants/theme';
import type { AppleTone } from '@/types/domain';

type Props = {
  tone: AppleTone;
  size?: number;
};

const fills: Record<AppleTone, string> = {
  red: colors.red,
  gold: colors.gold,
  green: '#91AE75',
};

export function AppleMark({ tone, size = 42 }: Props) {
  return (
    <View style={[styles.wrap, { width: size, height: size + size * 0.2 }]} accessibilityLabel="Apple illustration">
      <View style={[styles.stem, { left: size * 0.46, top: 0, height: size * 0.25 }]} />
      <View style={[styles.leaf, { left: size * 0.57, top: size * 0.03, width: size * 0.3, height: size * 0.16 }]} />
      <View style={[styles.fruit, { backgroundColor: fills[tone], width: size, height: size, top: size * 0.16 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
  },
  fruit: {
    borderRadius: 999,
    position: 'absolute',
  },
  stem: {
    backgroundColor: '#5B4433',
    borderRadius: 99,
    position: 'absolute',
    transform: [{ rotate: '18deg' }],
    width: 3,
  },
  leaf: {
    backgroundColor: colors.green,
    borderRadius: 99,
    position: 'absolute',
    transform: [{ rotate: '-28deg' }],
  },
});
