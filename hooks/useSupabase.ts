import { useState } from 'react';
import { supabase } from '@/utils/supabase';

interface UseSupabaseReturn {
  insert: (_table: string, _data: object) => Promise<any>;
  update: (_table: string, _id: number, _data: object) => Promise<any>;
  remove: (_table: string, _id: number) => Promise<any>;
  loading: boolean;
  error: string | null;
}

export default function useSupabase(): UseSupabaseReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const insert = async (table: string, data: object) => {
    setLoading(true);
    setError(null);
    try {
      const { data: result, error } = await supabase.from(table).insert(data);
      if (error) throw new Error(error.message);
      return result;
    } catch (err) {
      err instanceof Error && setError(err.message);
      return err;
    } finally {
      setLoading(false);
    }
  };

  const update = async (table: string, id: number, data: object) => {
    setLoading(true);
    setError(null);

    try {
      const result = await supabase.from(table).update(data).eq('id', id).select();

      if (error) throw new Error(result?.error?.message);
      return result;
    } catch (err) {
      err instanceof Error && setError(err.message);

      return err;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (table: string, id: number) => {
    setLoading(true);
    setError(null);
    try {
      const { data: result, error } = await supabase.from(table).delete().eq('id', id);

      if (error) throw new Error(error.message);
      return result;
    } catch (err) {
      err instanceof Error && setError(err.message);
      return err;
    } finally {
      setLoading(false);
    }
  };

  return { insert, loading, error, update, remove };
}
