import React from 'react';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';

import { Modal, Image, Text, Button, Icons } from '@/components/common';

import MainLogo from '@/assets/images/lahelu.png';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function LoginModal({ visible, onClose }: Props) {
  return (
    <Modal onClose={onClose} visible={visible}>
      <Image source={MainLogo as ImageSourcePropType} />
      <Text size={20}>Selamat Datang!</Text>
      <Text color="rgb(148, 148, 148)" size={12}>
        Buat meme, beri vote, dan berkomentar setelah login!
      </Text>

      <View style={styles.buttonContainer}>
        <Button style={styles.button} theme="secondary" onPress={onClose}>
          <Icons name="logo-google" size={20} />
          <Text style={styles.buttonTxt}>Sign in dengan google</Text>
        </Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 250,
    minWidth: 250,
    marginTop: 10,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  buttonTxt: {
    flex: 1,
    color: '#C0C0C0',
    fontSize: 12,
  },
});
