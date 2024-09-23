import React from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface Props {
  name: typeof Ionicons.defaultProps.name;
  color?: string;
  size?: number;
  iconType?: 'Ionicons' | 'MaterialIcons';
}

export default function Icons({ name, color = 'white', size = 32, iconType = 'Ionicons' }: Props) {
  return iconType === 'Ionicons' ? (
    <Ionicons name={name} size={size} color={color} />
  ) : (
    <MaterialIcons name={name} size={size} color={color} />
  );
}
