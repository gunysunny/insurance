import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useSignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email || !password) {
      throw new Error('이메일과 비밀번호를 입력해주세요');
    }

    if (password !== passwordConfirm) {
      throw new Error('비밀번호가 일치하지 않습니다');
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) throw error;
  };

  return {
    values: { email, password, passwordConfirm },
    setters: { setEmail, setPassword, setPasswordConfirm },
    submit,
    loading,
  };
}