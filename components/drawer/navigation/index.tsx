import React from 'react';

import { Drawer, Container, ScrollContainer } from '@/components/common';

import LoginCard from './login-card';
import Categories from './categories';
import Accordions from './accordions';
import Explore from './explore';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NavigationDrawer({ open, onClose }: Props) {
  return (
    <Drawer direction="left" visible={open} onClose={onClose} closeText="Pilihan">
      <ScrollContainer style={{ flex: 1 }}>
        <Container gap={20} type="sideDrawer">
          <LoginCard />
          <Categories />
          <Accordions />
          <Explore />
        </Container>
      </ScrollContainer>
    </Drawer>
  );
}
