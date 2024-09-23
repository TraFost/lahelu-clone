import React from 'react';
import { StyleSheet } from 'react-native';

import { Container, Icons, Text } from '@/components/common';
import { Colors } from '@/constants/Colors';

const mockData = Array.from({ length: 10 }, (_, i) => i + 1);

export default function Explore() {
  return (
    <Container type="wrapper" style={styles.container}>
      <Text fontWeight="800" size={16} textAlign="left" style={styles.text}>
        Telusuri
      </Text>

      <Container type="wrapper">
        {mockData.map(item => (
          <Container key={item} style={styles.containerItem}>
            <Container type="middle" style={styles.item}>
              <Icons name="happy-outline" size={20} />
              <Text fontWeight="400" textAlign="left">{`Item ${item}`}</Text>
            </Container>
            <Icons name="star" size={20} />
          </Container>
        ))}
      </Container>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    gap: 5,
    paddingTop: 10,
  },

  text: {
    color: Colors.primary,
  },

  containerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
  },

  item: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingLeft: 16,
  },
});
