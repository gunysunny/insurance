import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function ProtectedRoute({
  children,
}: {
  children: ReactNode;
}) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return <p>인증 확인 중...</p>;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}