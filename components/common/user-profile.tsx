import React from 'react';
import { View, StyleSheet } from 'react-native';

import Image from './image';
import Text from './text';

import { convertToDaysSince } from '@/utils/date';
import { Colors } from '@/constants/Colors';

interface Props {
  avatarUri: string;
  username: string;
  createdAt: string;
}

export default function UserProfile({ avatarUri, username, createdAt }: Props) {
  return (
    <View style={styles.headerContent}>
      <Image type="avatar" source={{ uri: avatarUri }} />
      <Text size={12} textAlign="left">
        {username}
        {' · '}
        <Text fontWeight="400" size={12} color={Colors.gray}>
          {convertToDaysSince(createdAt)}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
});
