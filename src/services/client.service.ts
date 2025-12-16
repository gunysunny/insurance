import { supabase } from '@/lib/supabase';
import type { Client } from '@/types/client';

type CreateClientInput = {
  name: string;
  phone: string;
  birth: string | null;
  memo: string;
};

/**
 * 고객 목록 조회
 */
export async function fetchClients(): Promise<Client[]> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', user.id) // 🔥 핵심
    .order('created_at', { ascending: false });

  if (error) {
    console.error('FETCH ERROR:', error);
    throw error;
  }

  return data as Client[];
}

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
        user_id: user.id,
      },
    ])
    .select();

  if (error) {
    console.error('INSERT ERROR:', error);
    throw error;
  }

  return data as Client[];
}

export async function fetchClientById(id: string): Promise<Client> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)           // 🔥 고객 ID
    .eq('user_id', user.id) // 🔥 어드민 소유 데이터만
    .single();              // 🔥 한 건만

  if (error) {
    console.error('FETCH DETAIL ERROR:', error);
    throw error;
  }

  return data as Client;
}

