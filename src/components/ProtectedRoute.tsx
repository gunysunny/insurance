import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function ProtectedRoute() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <p className="p-6">인증 확인 중...</p>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}