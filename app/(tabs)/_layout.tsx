import { SymbolView } from 'expo-symbols';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import type { ColorValue } from 'react-native';

import { colors } from '@/constants/theme';

type IconName = ComponentProps<typeof SymbolView>['name'];

function TabIcon({ color, name }: { color: ColorValue; name: IconName }) {
  return <SymbolView name={name} size={27} tintColor={color ?? colors.muted} weight="semibold" />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.cream },
        tabBarActiveTintColor: colors.red,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.line,
          height: 88,
          paddingBottom: 17,
          paddingTop: 8,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabIcon color={color} name={{ ios: 'house.fill', android: 'home', web: 'home' }} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <TabIcon color={color} name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }} />,
        }}
      />
      <Tabs.Screen
        name="rank"
        options={{
          title: 'Rank',
          tabBarIcon: ({ color }) => <TabIcon color={color} name={{ ios: 'plus.circle.fill', android: 'add_circle', web: 'add_circle' }} />,
        }}
      />
      <Tabs.Screen
        name="global"
        options={{
          title: 'Global',
          tabBarIcon: ({ color }) => <TabIcon color={color} name={{ ios: 'crown.fill', android: 'workspace_premium', web: 'workspace_premium' }} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabIcon color={color} name={{ ios: 'person.crop.circle.fill', android: 'account_circle', web: 'account_circle' }} />,
        }}
      />
    </Tabs>
  );
}
