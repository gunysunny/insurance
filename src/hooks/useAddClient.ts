import { useState } from 'react';
import { createClient } from '@/services/client.service';
import type { Client } from '@/types/client';

export function useAddClient() {
  const [loading, setLoading] = useState(false);

  const submit = async (
    input: Omit<Client, 'id' | 'created_at' | 'user_id'>
  ) => {
    setLoading(true);
    try {
      await createClient(input);
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading };
}