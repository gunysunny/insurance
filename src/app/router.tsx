import { createBrowserRouter } from 'react-router-dom';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ClientList from '@/pages/ClientList';
import AddClient from '@/pages/AddClient';
import ClientDetail from '@/pages/ClientDetail';

import ProtectedRoute from '@/components/ProtectedRoute';
import ProtectedLayout from '@/components/ProtectedLayout';

export const router = createBrowserRouter([
  // 🔓 로그인 / 회원가입 (레이아웃 ❌)
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },

  // 🔐 로그인 후 영역 (레이아웃 ⭕)
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <ProtectedLayout />
      </ProtectedRoute>
    ),
    children: [
      // 메인 페이지
      { index: true, element: <ClientList /> },
      // 신규 고객 등록
      { path: 'clients/new', element: <AddClient /> },
      // 🔥 고객 상세 페이지 (추가)
      { path: 'clients/:id', element: <ClientDetail /> },
    ],
  },
]);