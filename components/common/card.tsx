import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

import { Colors } from '@/constants/Colors';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function Card({ children, style }: Props) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
  },
});
