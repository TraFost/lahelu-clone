import React from 'react';
import { Tabs } from 'expo-router';

import { ProfileDrawer, TabBarIcon, LoginModal } from '@/components';

import { screens } from '@/constants/screens';
import { useToggle } from '@/hooks';
import { EventArgType } from '@/types/event';

const defaultTabOptions = (icon: { regular: string; focused: string }) => {
  return {
    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
      <TabBarIcon name={(focused ? icon.focused : icon.regular) as any} color={color} />
    ),
    title: '',
  };
};

export default function TabLayout() {
  const [profileDrawerVisible, toggleProfileDrawerVisible] = useToggle(false);
  const [loginModalVisible, toggleLoginModalVisible] = useToggle(false);

  const handleTabPress = (screenName: string) => (e: EventArgType) => {
    const handler: Record<string, () => void> = {
      profile: toggleProfileDrawerVisible,
      post: toggleLoginModalVisible,
    };

    e.preventDefault();
    handler[screenName]?.();
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#64A3EC',
          tabBarInactiveTintColor: 'white',
          tabBarStyle: {
            backgroundColor: '#1A1A1A',
            borderTopColor: 'black',
            borderTopWidth: 1,
            padding: 5,
          },
          headerShown: false,
        }}>
        {screens.map(screen => (
          <Tabs.Screen
            key={screen.name}
            name={screen.name}
            options={
              {
                ...defaultTabOptions(screen.icon),
                ...screen.options,
              } as any
            }
            listeners={{
              tabPress: handleTabPress(screen.name),
            }}
          />
        ))}
      </Tabs>

      <ProfileDrawer open={profileDrawerVisible} onClose={toggleProfileDrawerVisible} />

      <LoginModal visible={loginModalVisible} onClose={toggleLoginModalVisible} />
    </>
  );
}
