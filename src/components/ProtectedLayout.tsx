import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';

export default function ProtectedLayout() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <Outlet />
      </main>
    </>
  );
}