import { useEffect, useState, useCallback } from 'react';
import { fetchClientById } from '@/services/client.service';
import type { Client } from '@/types/client';

export function useClientDetail(id: string) {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchClient = useCallback(() => {
    setLoading(true);
    fetchClientById(id)
      .then((data) => {
        setClient({ ...data }); // 🔥 새 객체로 강제
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetchClient();
  }, [fetchClient]);

  return { client, loading, refetch: fetchClient };
}