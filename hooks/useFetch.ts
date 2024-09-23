import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/utils/supabase';

interface FetchProps<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchNextPage: () => Promise<void>;
  listLoading: boolean;
  refetch: () => void;
}

export default function useFetch<T>(
  url: string,
  active: string,
  isUpdated?: boolean
): FetchProps<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [listLoading, setListLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [metadata, setMetadata] = useState({ from: 1, to: 5 });
  const isRefetching = useRef(false);

  const getOrderParams = useCallback(() => {
    switch (active) {
      case 'Home':
        return { column: 'id', ascending: false };
      case 'Fresh':
        return { column: 'created_at', ascending: false };
      case 'Trending':
        return { column: 'upvotes', ascending: false };
      default:
        return { column: 'id', ascending: false };
    }
  }, [active]);

  const fetchNextPage = useCallback(async () => {
    if (!hasMore) return;

    setMetadata(prevMetadata => ({
      from: prevMetadata.to + 1,
      to: prevMetadata.to + 5,
    }));

    setListLoading(true);
  }, [hasMore]);

  const refetch = useCallback(() => {
    setData(null);
    setMetadata({ from: 1, to: 5 });
    setHasMore(true);
    isRefetching.current = true;
    setLoading(true);
  }, []);

  const fetchData = useCallback(async () => {
    if (!hasMore) {
      setLoading(false);
      setListLoading(false);
      return;
    }

    try {
      const { from, to } = metadata;
      const { column, ascending } = getOrderParams();

      const { data: fetchedData, error } = await supabase
        .from(url)
        .select('*')
        .range(from, to)
        .order(column, { ascending });

      if (!fetchedData?.length) {
        setHasMore(false);
      }

      if (error) throw new Error(error.message);

      setData(prevData => {
        if (isRefetching.current) {
          isRefetching.current = false;
          return fetchedData as T;
        }
        if (!prevData) return fetchedData as T;

        const mergedData = [...prevData, ...fetchedData].filter(
          (item, index, self) => index === self.findIndex(t => t.id === item.id)
        );
        return mergedData as T;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
      setListLoading(false);
    }
  }, [hasMore, metadata, url, getOrderParams]);

  useEffect(() => {
    refetch();
  }, [active, refetch]);

  useEffect(() => {
    if (isUpdated) {
      refetch();
    }
  }, [isUpdated, refetch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    fetchNextPage,
    listLoading,
    refetch,
  };
}
