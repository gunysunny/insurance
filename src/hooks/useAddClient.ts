import { useState } from 'react';
import { createClient } from '@/services/client.service';

export function useAddClient() {
  const [loading, setLoading] = useState(false);

  const submit = async (input: {
    name: string;
    phone: string;
    gender: 'male' | 'female' | null;
    address: string | null;
    birth: string | null;
    memo: string;
  }) => {
    setLoading(true);
    try {
      await createClient(input);
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading };
}