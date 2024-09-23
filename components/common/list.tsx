import React from 'react';
import { FlatList, FlatListProps } from 'react-native';

import Loading from '@/components/common/loading';

interface Identifiable {
  id: string | number;
}

interface Props<T extends Identifiable> extends FlatListProps<T> {
  loading?: boolean;
  listLoading?: boolean;
  hasMore?: boolean;
  fetchNextPage?: () => Promise<void>;
}

export default function List<T extends Identifiable>({
  loading,
  listLoading,
  fetchNextPage,
  ...props
}: Props<T>) {
  return loading ? (
    <Loading />
  ) : (
    <FlatList
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id.toString()}
      ListFooterComponent={() => (listLoading ? <Loading /> : null)}
      onEndReachedThreshold={0.1}
      onEndReached={fetchNextPage}
      {...props}
    />
  );
}
