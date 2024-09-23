import { useEffect } from 'react';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { Header } from '@/components';

import { ActiveProvider } from '@/contexts/activeContext';
import UpdateProvider from './auto-updates';

import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    openSans: require('../assets/fonts/OpenSans-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DarkTheme}>
      <ActiveProvider>
        <UpdateProvider />
        <Stack
          screenOptions={{
            header: Header,
          }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ActiveProvider>
    </ThemeProvider>
  );
}
