import React from 'react';
import { Text as OriginalText, TextProps, StyleProp, TextStyle, StyleSheet } from 'react-native';

interface Props extends TextProps {
  children?: React.ReactNode;
  type?: 'header' | 'navTitle' | 'postType' | 'content' | 'option';
  size?: TextStyle['fontSize'];
  textAlign?: TextStyle['textAlign'];
  fontWeight?: TextStyle['fontWeight'];
  color?: TextStyle['color'];
}

export default function Text({
  children,
  type = 'content',
  size,
  textAlign = 'center',
  fontWeight = '700',
  color = 'white',
  ...props
}: Props) {
  const defaultStyle: StyleProp<TextStyle> = {
    fontFamily: 'Sans-serif',
    width: '100%',
    color,
    fontWeight,
    textAlign,
    ...styles[type],
    ...(props.style as TextStyle),
    fontSize: size,
  };

  return (
    <OriginalText {...props} style={defaultStyle}>
      {children}
    </OriginalText>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
  },

  navTitle: {
    fontWeight: '900',
    color: 'rgb(101, 164, 236)',
    fontSize: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },

  postType: {
    fontSize: 14,
  },

  content: {
    fontSize: 12,
  },

  option: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgb(228, 228, 228)',
  },
});
