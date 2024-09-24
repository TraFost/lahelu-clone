import React from 'react';

import { List, Space } from '@/components/common';
import PostItem from './post-item';
import Promotion from './promotion';

import { useFetch, useToggle } from '@/hooks';
import { Post } from '@/types/post';
import { useActive } from '@/contexts/activeContext';

const renderItem = ({
  item,
  setUpdated,
  isScrolling,
}: {
  item: Post;
  setUpdated: () => void;
  isScrolling: boolean;
}) => <PostItem item={item} setUpdated={setUpdated} isScrolling={isScrolling} />;

const ItemSeparatorComponent = () => <Space height={4} bgColor="black" />;

export default function Posts() {
  const [isUpdated, setUpdated] = useToggle(false);
  const [isScrolling, setScrolling] = useToggle(false);

  const { active } = useActive();

  const posts = useFetch<Post[]>('Post', active, isUpdated);

  return (
    <List
      {...posts}
      onScrollBeginDrag={setScrolling}
      onScrollEndDrag={setScrolling}
      ListHeaderComponent={active === 'Home' ? <Promotion /> : null}
      renderItem={props => renderItem({ ...props, setUpdated, isScrolling })}
      ItemSeparatorComponent={ItemSeparatorComponent}
    />
  );
}
