import { useNavigate } from 'react-router-dom';
import { logout } from '@/services/auth.service';

export function useLogout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return { handleLogout };
}