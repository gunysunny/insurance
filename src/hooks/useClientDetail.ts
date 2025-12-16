import { useEffect, useState } from 'react';
import { fetchClientById } from '@/services/client.service';
import type { Client } from '@/types/client';

export function useClientDetail(id: string) {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClientById(id)
      .then(setClient)
      .finally(() => setLoading(false));
  }, [id]);

  return { client, loading };
}
