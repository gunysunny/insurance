import { useEffect, useState } from 'react';
import { fetchClients } from '@/services/client.service';
import type { Client } from '@/types/client';

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClients()
      .then(setClients)
      .catch((err) => {
        console.error('FETCH CLIENTS ERROR:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return { clients, loading, error };
}