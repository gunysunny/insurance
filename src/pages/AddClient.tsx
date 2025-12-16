import { useState } from 'react';
import { useAddClient } from '@/hooks/useAddClient';
import { useNavigate } from 'react-router-dom';

export default function AddClient() {
  const { submit, loading } = useAddClient();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [address, setAddress] = useState('');
  const [birth, setBirth] = useState('');
  const [memo, setMemo] = useState('');

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert('이름은 필수입니다');
      return;
    }

    try {
      await submit({
        name,
        phone,
        gender,
        address: address || null,
        birth: birth || null,
        memo,
      });

      alert('고객 등록 완료');
      navigate('/');
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-10 shadow-lg">
        {/* 타이틀 */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold mb-2 text-black">신규 고객 등록</h1>
          <p className="text-sm text-gray-500">
            고객의 기본 정보와 상담 내용을 입력해주세요
          </p>
        </div>

        {/* 입력 폼 */}
        <div className="space-y-8">
          {/* 이름 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl bg-gray-200 px-5 py-3 text-base outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          {/* 전화번호 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              전화번호
            </label>
            <input
              placeholder="010-0000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-xl bg-gray-200 px-5 py-3 text-base outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          {/* 성별 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              성별
            </label>
            <select
              value={gender ?? ''}
              onChange={(e) =>
                setGender(
                  e.target.value === ''
                    ? null
                    : (e.target.value as 'male' | 'female')
                )
              }
              className="rounded-xl bg-gray-200 px-5 py-3 text-base outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">선택 안 함</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
          </div>

          {/* 주소 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              주소
            </label>
            <input
              placeholder="주소"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="rounded-xl bg-gray-200 px-5 py-3 text-base outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          {/* 생년월일 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              생년월일
            </label>
            <input
              type="date"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
              className="rounded-xl bg-gray-200 px-5 py-3 text-base outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          {/* 메모 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              보험 / 상담 메모
            </label>
            <textarea
              placeholder="상담 내용, 가입 보험, 특이사항 등을 자유롭게 적어주세요"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="h-32 resize-none rounded-xl bg-gray-200 px-5 py-3 text-base outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="mt-12 flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 rounded-xl bg-gray-300 py-4 font-medium text-gray-700 hover:bg-gray-400 cursor-pointer"
          >
            취소
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 rounded-xl bg-blue-600 py-4 font-semibold text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {loading ? '저장 중...' : '등록'}
          </button>
        </div>
      </div>
    </div>
  );
}