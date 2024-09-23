import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';

interface Props extends ScrollViewProps {
  children: React.ReactNode;
}

export default function ScrollContainer({ children, ...props }: Props) {
  const defaultStyle = {
    flex: 1,
    ...(props.style as StyleSheet),
  };

  return (
    <ScrollView {...props} style={defaultStyle} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}
