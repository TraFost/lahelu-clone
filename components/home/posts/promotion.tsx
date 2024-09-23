import React, { useEffect, useState } from 'react';

import { Text, Container } from '@/components/common';

const promotionContent = [
  '😍 Ingin download meme di Lahelu? Klik disini!',
  '🎉 Mari merapat! Klik untuk join giveaway kemerdekaan!',
  '🗣️ Cari jenis meme favorit kamu lewat Topik!',
];

export default function Promotion() {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    const randomContent = promotionContent[Math.floor(Math.random() * promotionContent.length)];

    setContent(randomContent);
  }, [setContent]);

  return (
    <Container type="promotion">
      <Text textAlign="left" size={16} color="rgb(228, 228, 228)">
        {`${content.split(' ')[0]}  ${content.split(' ').slice(1).join(' ')}`}
      </Text>
    </Container>
  );
}
