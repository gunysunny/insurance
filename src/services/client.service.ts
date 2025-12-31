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
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('FETCH CLIENTS ERROR:', error);
    throw error;
  }

  return data as Client[];
}

/**
 * 고객 단건 조회
 */
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
    .eq('id', id)
    .eq('user_id', user.id) // 🔥 이 줄이 핵심
    .single();

  if (error) {
    console.error('FETCH CLIENT DETAIL ERROR:', error);
    throw error;
  }

  return data as Client;
}