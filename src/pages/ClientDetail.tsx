import { useParams, useNavigate } from 'react-router-dom';
import { useClientDetail } from '@/hooks/useClientDetail';

export default function ClientDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 🔥 1. id 없으면 여기서 바로 종료
  if (!id) {
    return <p className="p-6">잘못된 접근입니다.</p>;
  }

  // 🔥 2. id가 확실할 때만 hook 호출
  const { client, loading } = useClientDetail(id);

  if (loading) return <p className="p-6">로딩중...</p>;
  if (!client) return <p className="p-6">고객을 찾을 수 없습니다.</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl bg-white rounded-2xl shadow p-10">
        {/* 상단 */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-black">{client.name}</h1>
            <p className="text-sm text-gray-500 mt-1">
              등록일 · {new Date(client.created_at).toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 hover:underline cursor-pointer"
          >
            ← 목록으로
          </button>
        </div>

        {/* 기본 정보 */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4 text-black">기본 정보</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-bold">
            <Info label="전화번호" value={client.phone}  />
            <Info label="성별" value={genderText(client.gender)} />
            <Info label="주소" value={client.address} />
            <Info label="생년월일" value={client.birth} />
          </div>
        </section>

        {/* 메모 */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-black">
            보험 / 상담 메모
          </h2>

          <div className="whitespace-pre-wrap rounded-xl bg-gray-100 p-6 text-base text-gray-800 leading-relaxed">
            {client.memo || '작성된 메모가 없습니다.'}
          </div>
        </section>
      </div>
    </div>
  );
}

/* --- 서브 컴포넌트 --- */

function Info({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="rounded-xl border bg-gray-50 p-5">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-base font-semibold text-gray-900">
        {value || '-'}
      </p>
    </div>
  );
}

function genderText(gender: 'male' | 'female' | null) {
  if (gender === 'male') return '남성';
  if (gender === 'female') return '여성';
  return '-';
}
