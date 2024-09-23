import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  navigation: any;
  route: any;
};

const group = (props: Props) => {
  return (
    <View>
      <Text>group</Text>
    </View>
  );
};

export default group;
