import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';

import Text from './text';
import Button from './button';
import Icons from './icons';
import Container from './container';

import { Colors } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

interface Props {
  direction?: 'bottom' | 'left' | 'right';
  visible: boolean;
  onClose: () => void;
  closeText?: string;
  children: React.ReactNode;
}

export default function ReusableDrawer({
  direction = 'left',
  visible,
  onClose,
  children,
  closeText = 'Close',
}: Props) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const drawerStyle = {
    bottom: {
      transform: [
        { translateY: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [height, 0] }) },
      ],
    },
    left: {
      transform: [
        {
          translateX: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [-width, 0] }),
        },
      ],
    },
    right: {
      transform: [
        { translateX: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [width, 0] }) },
      ],
    },
  }[direction];

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return visible ? (
    <>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[
            styles.overlay,
            { height: direction === 'bottom' ? 100000 : height, opacity: overlayOpacity },
          ]}
        />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles[`${direction}DrawerContainer`], drawerStyle]}>
        {direction === 'bottom' && (
          <Container style={styles.closeContainer} type="spaceBetween">
            <Text textAlign="left" size={20} style={styles.closeText}>
              {closeText}
            </Text>

            <Button onPress={onClose}>
              <Icons name="close-outline" size={24} />
            </Button>
          </Container>
        )}
        {children}
      </Animated.View>
    </>
  ) : null;
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 998,
  },
  bottomDrawerContainer: {
    position: 'absolute',
    width,
    flex: 1,
    height: height * (2 / 3),
    backgroundColor: '#181818',
    zIndex: 999,
  },
  leftDrawerContainer: {
    position: 'absolute',
    left: 0,
    width: width * 0.57,
    height,
    backgroundColor: '#181818',
    zIndex: 999,
  },
  rightDrawerContainer: {
    position: 'absolute',
    width: '100%',
    top: 0,
    height,
    backgroundColor: '#181818',
    zIndex: 999,
  },
  closeText: {
    marginTop: 20,
  },
  closeContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    paddingRight: 30,
    width: '100%',
    borderBottomColor: Colors.secondary,
  },
});
