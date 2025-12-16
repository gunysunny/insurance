import { useSignupForm } from '@/hooks/useSignupForm';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const { values, setters, submit, loading } = useSignupForm();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await submit();
      alert('회원가입이 완료되었습니다. 로그인해주세요.');
      navigate('/login');
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-5">
        {/* 타이틀 */}
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold mb-2">관리자 회원가입</h1>
          <p className="text-sm text-gray-500">
            새로운 관리자 계정을 생성합니다
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
              placeholder="비밀번호"
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
                focus:ring-2 focus:ring-blue-500
              "
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              비밀번호 확인
            </label>
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={values.passwordConfirm}
              onChange={(e) => setters.setPasswordConfirm(e.target.value)}
              className="
                w-full
                border-0
                rounded-xl
                px-5 py-3
                text-base
                bg-gray-200
                text-black
                outline-none
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
          {loading ? '가입 중...' : '회원가입'}
        </button>

        {/* 로그인 이동 */}
        <div className="mt-8 text-center text-sm text-gray-500">
          이미 계정이 있으신가요?{' '}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium cursor-pointer"
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
