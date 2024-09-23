import React from 'react';
import { StyleSheet } from 'react-native';

import { Drawer, Button, Icons, Container, Text } from '@/components/common';

import { options } from '@/constants/screens';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ProfileDrawer({ open, onClose }: Props) {
  return (
    <Container type="drawer">
      <Drawer direction="bottom" visible={open} onClose={onClose} closeText="Pilihan">
        <Container type="column" style={{ ...styles.optionContainer, ...styles.borderOptions }}>
          {options.slice(0, 2).map(option => (
            <Button key={option.name} style={styles.optionButton}>
              <Icons name={option.icon} size={20} />
              <Text textAlign="left" type="option">
                {option.name}
              </Text>
            </Button>
          ))}
        </Container>

        <Container type="column" style={styles.optionContainer}>
          {options.slice(2).map(option => (
            <Button key={option.name} style={styles.optionButton}>
              <Icons name={option.icon} size={20} />
              <Text textAlign="left" type="option">
                {option.name}
              </Text>
            </Button>
          ))}
        </Container>
      </Drawer>
    </Container>
  );
}

const styles = StyleSheet.create({
  drawerItem: {
    color: 'white',
    fontSize: 18,
    marginVertical: 10,
  },
  openDrawerText: {
    fontSize: 18,
    color: 'blue',
  },
  optionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'flex-start',
  },
  optionButton: {
    flexDirection: 'row',
    padding: 10,
    gap: 12,
  },
  borderOptions: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(65, 65, 65)',
  },
});
