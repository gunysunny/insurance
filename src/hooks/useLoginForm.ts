import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/services/auth.service';

export function useLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    if (!email || !password) {
      throw new Error('이메일과 비밀번호를 입력하세요.');
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate('/'); // 로그인 성공
    } finally {
      setLoading(false);
    }
  };

  return {
    values: { email, password },
    setters: { setEmail, setPassword },
    submit,
    loading,
  };
}