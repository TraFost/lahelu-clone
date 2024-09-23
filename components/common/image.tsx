import React from 'react';
import { Image as OriginalImage, ImageProps, ImageStyle } from 'react-native';

interface Props extends ImageProps {
  type?: 'avatar' | 'post' | 'basic';
}

export default function Image({ type = 'basic', ...props }: Props) {
  const defaultStyle = {
    avatar: {
      width: 30,
      height: 30,
      borderRadius: 100,
    },
    post: {
      height: 390,
      width: '100%',
    },
    basic: {
      width: 50,
      height: 50,
      borderRadius: 50,
    },
  }[type];

  return (
    <OriginalImage
      {...props}
      style={{
        objectFit: 'cover',
        ...(defaultStyle as ImageStyle),
        ...(props.style as ImageStyle),
      }}
    />
  );
}
