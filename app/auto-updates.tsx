import { useEffect } from 'react';
import * as Updates from 'expo-updates';

async function onFetchUpdateAsync() {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (error) {
    console.log(`Error fetching latest Expo update: ${error}`);
  }
}

export default function UpdateProvider() {
  useEffect(() => {
    if (!__DEV__) {
      onFetchUpdateAsync();
    }
  }, []);

  return null;
}
