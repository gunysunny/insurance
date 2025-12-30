import { supabase } from '@/lib/supabase';
import type { Client } from '@/types/client';

type CreateClientInput =
  Omit<Client, 'id' | 'created_at' | 'user_id'>;

/**
 * 고객 생성
 */
export async function createClient(
  input: CreateClientInput
): Promise<Client[]> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  const { data, error } = await supabase
    .from('clients')
    .insert([
      {
        ...input,
        user_id: user.id, // 그대로 유지
      },
    ])
    .select();

  if (error) {
    console.error('INSERT ERROR:', error);
    throw error;
  }

  return data as Client[];
}