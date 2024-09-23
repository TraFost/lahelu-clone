import React from 'react';
import { StyleSheet, TextStyle, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

import Text from './text';

import { Colors } from '@/constants/Colors';

interface Props extends TouchableOpacityProps {
  children?: React.ReactNode;
  theme?: 'primary' | 'secondary' | string;
  bgColor?: string;
  title?: string;
  icon?: React.ReactNode;
  textStyle?: TextStyle;
}

export default function Button({
  children,
  theme = '',
  bgColor,
  title,
  icon,
  textStyle,
  ...props
}: Props) {
  const buttonStyle = {
    primary: {
      backgroundColor: Colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 999,
    },
    secondary: {
      padding: 12,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: Colors.secondary,
    },
    default: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: bgColor,
      backgroundColor: bgColor,
    },
    transparent: {
      backgroundColor: 'transparent',
      paddingHorizontal: 12,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: 'rgb(65, 65, 65)',
    },
  }[theme];

  return (
    <TouchableOpacity {...props} style={[buttonStyle, props.style]}>
      {title && (
        <View style={styles.titleContainer}>
          {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
          <Text textAlign="left" style={textStyle}>
            {title}
          </Text>
        </View>
      )}

      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
