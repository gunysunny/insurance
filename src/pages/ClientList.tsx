import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClients } from '@/hooks/useClients';

export default function ClientList() {
  const { clients, loading, error } = useClients();
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  if (loading) return <p className="p-6">로딩중...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  const filteredClients = clients.filter((client) =>
    client.name.includes(keyword)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* 🔹 페이지 타이틀 */}
      <h1 className="text-2xl font-bold mb-6 text-black">고객 관리</h1>

      {/* 🔹 상단 액션 영역 */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* 검색 */}
        <input
          placeholder="이름으로 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="
            flex-1
            rounded-xl
            bg-gray-200
            px-5 py-3
            text-base
            text-black
            outline-none
            focus:ring-2 focus:ring-blue-500
          "
        />

        {/* 신규 고객 등록 */}
        <button
          onClick={() => navigate('/clients/new')}
          className="
            rounded-xl
            bg-blue-600
            px-6 py-3
            text-white
            font-semibold
            hover:bg-blue-700
            whitespace-nowrap
            cursor-pointer
          "
        >
          + 신규 고객 등록
        </button>
      </div>

      {/* 🔹 고객 리스트 */}
      <div className="bg-white rounded-2xl shadow divide-y">
        {filteredClients.map((client, index) => (
          <div
            key={client.id}
            onClick={() => navigate(`/clients/${client.id}`)}
            className={`
              flex items-center justify-between
              text-black
              px-6 py-2
              cursor-pointer
              hover:bg-gray-300
              ${index % 2 === 1 ? 'bg-gray-200' : 'bg-white'}
            `}
          >
            {/* 왼쪽 정보 */}
            <div>
              <div className="font-medium text-lg">
                {index + 1}. {client.name}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {client.phone ?? '전화번호 없음'}
                {client.address && ` · ${client.address}`}
              </div>
            </div>

            {/* 오른쪽 화살표 */}
            <span className="text-gray-400 text-xl">›</span>
          </div>
        ))}
      </div>
    </div>
  );
}
