import React, { useEffect, useRef } from 'react';
import { Modal, View, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';

import { Colors } from '@/constants/Colors';

interface Props {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function CustomModal({ visible, onClose, children }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, opacity]);

  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.overlay, { opacity }]}>
          <View style={styles.modalContainer}>
            <View style={styles.content}>{children}</View>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContainer: {
    width: '100%',
    height: 203,
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
