import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Icons, Button, Text, Container } from '@/components/common';
import NavigationDrawer from '@/components/drawer/navigation';

import { useToggle } from '@/hooks';
import { postCategories } from '@/constants/screens';
import { useActive } from '@/contexts/activeContext';

export default function Header() {
  const { active, changeActive } = useActive();

  const [isDrawerOpen, toggleDrawer] = useToggle(false);

  const changePost = (post: string) => {
    changeActive(post);
  };

  return (
    <View style={styles.mainContainer}>
      <Container style={styles.navContainer}>
        <Container gap={12}>
          <Button onPress={toggleDrawer}>
            <Icons name="menu-outline" />
          </Button>

          <Text textAlign="left" type="navTitle">
            LAHELU
          </Text>
        </Container>

        <Button>
          <Icons name="search-outline" />
        </Button>
      </Container>

      <Container style={styles.postContainer}>
        {postCategories.slice(0, 3).map(category => (
          <Button
            key={category.name}
            onPress={() => changePost(category.name)}
            style={[styles.postButton, active === category.name && styles.postButtonActive]}>
            <Text type="postType" style={active === category.name && styles.postTextActive}>
              {category.name}
            </Text>
          </Button>
        ))}
      </Container>

      <NavigationDrawer open={isDrawerOpen} onClose={toggleDrawer} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 145,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
  },

  navContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 12,
    height: 'auto',
  },

  postContainer: {
    borderTopWidth: 1,
    borderTopColor: 'black',
    width: '100%',
    maxHeight: 45,
  },

  postButton: {
    height: 45,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },

  postButtonActive: {
    borderBottomColor: 'rgb(101, 164, 236)',
  },

  postTextActive: {
    color: 'rgb(101, 164, 236)',
  },
});
