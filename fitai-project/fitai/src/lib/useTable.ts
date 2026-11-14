import { useCallback, useEffect, useState } from 'react';
import { supabase } from './supabase';

export function useTable<T>(table: string, columns = '*', order = 'created_at') {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const refresh = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from(table).select(columns).order(order, { ascending: false });
    if (error) setError(error.message); else { setError(null); setData((data ?? []) as T[]); }
    setLoading(false);
  }, [table, columns, order]);
  useEffect(() => { refresh(); }, [refresh]);
  return { data, loading, error, refresh };
}
