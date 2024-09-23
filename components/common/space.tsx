import { memo } from 'react';
import { View } from 'react-native';

interface Props {
  height?: number;
  width?: number;
  bgColor?: string;
}

export default memo(function Space({ width, height, bgColor }: Props) {
  return <View style={{ height, width, backgroundColor: bgColor }} />;
});
