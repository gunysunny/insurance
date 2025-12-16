export type Client = {
  id: string;
  user_id: string;

  name: string;
  phone: string | null;
  gender: 'male' | 'female' | null;
  address: string | null;

  birth: string | null;
  memo: string | null;

  created_at: string;
};