import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text, Icons, Container } from '@/components/common';

import { postCategories } from '@/constants/screens';

export default function Categories() {
  return (
    <View style={styles.container}>
      {postCategories.map(category => (
        <Container gap={12} type="spaceBetween" style={styles.category} key={category.name}>
          <Icons name={category.icon} size={20} />
          <Text fontWeight="400" size={16} textAlign="left">
            {category.name}
          </Text>
        </Container>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },

  category: {
    alignItems: 'center',
    paddingVertical: 10,
  },
});
