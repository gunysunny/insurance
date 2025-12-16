import { useLogout } from '@/hooks/useLogout';

export default function Header() {
  const { handleLogout } = useLogout();

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        borderBottom: '1px solid #ddd',
      }}
    >
      <h2>보험 고객 관리</h2>

      <button onClick={handleLogout}>로그아웃</button>
    </header>
  );
}