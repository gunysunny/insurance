import { createBrowserRouter } from 'react-router-dom';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ClientList from '@/pages/ClientList';
import AddClient from '@/pages/AddClient';
import ClientDetail from '@/pages/ClientDetail';
import EditClient from '@/pages/EditClient';
import ProtectedRoute from '@/components/ProtectedRoute';
import ProtectedLayout from '@/components/ProtectedLayout';

export const router = createBrowserRouter([
  // 🔓 로그인 / 회원가입
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },

  // 🔐 보호 영역
  {
    element: <ProtectedRoute />, // ✅ children 전달 ❌
    children: [
      {
        element: <ProtectedLayout />, // 레이아웃
        children: [
          { index: true, element: <ClientList /> },
          { path: 'clients/new', element: <AddClient /> },
          { path: 'clients/:id', element: <ClientDetail /> },
          { path: 'clients/:id/edit', element: <EditClient /> },
        ],
      },
    ],
  },
]);