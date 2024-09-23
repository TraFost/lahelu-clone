import React from 'react';
import { View, ViewStyle, ViewProps, StyleSheet } from 'react-native';

import { Colors } from '@/constants/Colors';

interface Props extends ViewProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  type?:
    | 'container'
    | 'content'
    | 'column'
    | 'middle'
    | 'spaceBetween'
    | 'drawer'
    | 'sideDrawer'
    | 'wrapper'
    | 'promotion'
    | 'post'
    | 'postHeader';
  gap?: number;
}

export default function Container({ children, style, gap, type = 'content', ...props }: Props) {
  const containerStyle: ViewStyle = {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap,
    ...styles[type],
    ...style,
  };

  return (
    <View {...props} style={containerStyle}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
  },

  column: {
    flexDirection: 'column',
  },

  middle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  spaceBetween: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },

  drawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sideDrawer: {
    transform: [{ translateY: 70 }],
    zIndex: 1000,
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },

  wrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },

  promotion: {
    width: '90%',
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: 'rgb(44, 57, 66)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    alignSelf: 'center',
  },

  post: {
    // flexDirection: 'column',
    // alignItems: 'center',
    // width: '100%',
    // paddingHorizontal: 30,
    // flex: 1,
    // paddingHorizontal: 25,
  },

  postHeader: { gap: 8, paddingHorizontal: 16 },
});
