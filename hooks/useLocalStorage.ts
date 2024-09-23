import { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useLocalStorage(key: string) {
  const [storedData, setStoredData] = useState('');

  const storeData = async (value: string | object) => {
    try {
      const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, valueToStore);
      setStoredData(valueToStore);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const storageValue = await AsyncStorage.getItem(key);
        if (storageValue !== null) {
          setStoredData(storageValue);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, [key]);

  return { storedData, storeData };
}
