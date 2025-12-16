import { createBrowserRouter } from 'react-router-dom';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ClientList from '@/pages/ClientList';
import AddClient from '@/pages/AddClient';

import ProtectedRoute from '@/components/ProtectedRoute';
import ProtectedLayout from '@/components/ProtectedLayout';

export const router = createBrowserRouter([
  // ✅ 로그인 / 회원가입 (레이아웃 ❌)
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },

  // ✅ 로그인 후 영역 (레이아웃 ⭕)
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <ProtectedLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <ClientList /> },
      { path: 'clients/new', element: <AddClient /> },
    ],
  },
]);