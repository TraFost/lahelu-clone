import React from 'react';

import { Card, Space, Button, Text } from '@/components/common';

export default function LoginCard() {
  return (
    <Card>
      <Text size={16}>{'Mau ngepost meme \nkamu sendiri?'}</Text>
      <Space height={8} />

      <Text fontWeight="400">{'Login dengan Google \nSekarang!'}</Text>
      <Space height={8} />

      <Button theme="primary">
        <Text size={16}>Login</Text>
      </Button>
    </Card>
  );
}
