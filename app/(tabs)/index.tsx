import React from 'react';
import { View } from 'react-native';

import { Posts } from '@/components';

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <Posts />
    </View>
  );
}
