import { useLoginForm } from '@/hooks/useLoginForm';
import { Link } from 'react-router-dom';

export default function Login() {
  const { values, setters, submit, loading } = useLoginForm();

  const handleSubmit = async () => {
    try {
      await submit();
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    // 🔹 전체 화면
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10">
        {/* 🔹 로그인 카드 */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10">
          {/* 타이틀 */}
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-bold mb-2">관리자 로그인</h1>
            <p className="text-sm text-gray-500">
              고객 관리를 위해 로그인해주세요
            </p>
          </div>

          {/* 입력 영역 */}
          <div className="space-y-8">
            {/* 이메일 */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                이메일
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                value={values.email}
                onChange={(e) => setters.setEmail(e.target.value)}
                className="
                  w-full
                  border-0
                  rounded-xl
                  px-5 py-3
                  text-base
                  bg-gray-200
                  text-black
                  outline-none
                  focus:outline-none
                  focus:ring-2 focus:ring-blue-500
                "
              />
            </div>

            {/* 비밀번호 */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={values.password}
                onChange={(e) => setters.setPassword(e.target.value)}
                className="
                  w-full
                  border-0
                  rounded-xl
                  px-5 py-3
                  text-base
                  bg-gray-200
                  text-black
                  outline-none
                  focus:outline-none
                  focus:ring-2 focus:ring-blue-500
                "
              />
            </div>
          </div>

          {/* 버튼 */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              w-full
              mt-12
              bg-blue-600
              text-white
              py-4
              rounded-xl
              text-base font-semibold
              hover:bg-blue-700
              disabled:opacity-50
            "
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>

          {/* 회원가입 */}
          <div className="mt-8 text-center text-sm text-gray-500">
            계정이 없으신가요?{' '}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              관리자 회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}