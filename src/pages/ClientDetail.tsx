import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useClientDetail } from '@/hooks/useClientDetail';
import type { ClientExtra } from '@/types/client';
import { useEffect } from 'react';

export default function ClientDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  if (!id) {
    return <p className="p-6">잘못된 접근입니다.</p>;
  }

  const { client, loading, refetch } = useClientDetail(id);

  /* 🔥 수정 1: updated 처리 후 state 제거 */
  useEffect(() => {
    if (!location.state || !('updated' in location.state)) return;

    if (location.state.updated) {
      refetch();

      // 🔥 state 제거 (중요)
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, refetch, navigate, location.pathname]);

  /* 🔍 디버그 로그 (선택) */
  useEffect(() => {
    if (client) {
      console.log('📦 client 최신값:', client);
    }
  }, [client]);

  /* 🔒 렌더 가드 */
  if (loading) return <p className="p-6">로딩중...</p>;
  if (!client) return <p className="p-6">고객을 찾을 수 없습니다.</p>;

  /* ✅ 여기부터 client는 항상 존재 */
  const extra: ClientExtra | undefined = client.extra;


  return (
    <div className="min-h-screen bg-gray-50 p-6 text-black">
      <div className="mx-auto max-w-6xl bg-white p-6 shadow space-y-10">

        {/* ===== 상단 ===== */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{client.name}</h1>
            <p className="text-sm text-gray-500 mt-1">
              등록일 · {new Date(client.created_at).toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 hover:underline"
          >
            ← 목록으로
          </button>
        </div>

        {/* ===== 고객 ===== */}
        <Section title="고객">
          <Table
            headers={['No', '이름', '전화번호', '관계', '주민번호', '직업']}
          >
            <tr>
              <Td center>1</Td>
              <Td><ReadonlyCell value={client.name} /></Td>
              <Td><ReadonlyCell value={client.phone} /></Td>
              <Td><ReadonlyCell value={extra?.relation} /></Td>
              <Td><ReadonlyCell value={extra?.rrn} /></Td>
              <Td><ReadonlyCell value={extra?.job} /></Td>
            </tr>
          </Table>
        </Section>

        {/* ===== 신분증 ===== */}
        <Section title="신분증">
          <Table headers={['발급기관', '발급일', '면허번호']}>
            <tr>
              <Td><ReadonlyCell value={extra?.identity?.idIssueOrg} /></Td>
              <Td><ReadonlyCell value={extra?.identity?.idIssueDate} /></Td>
              <Td><ReadonlyCell value={extra?.identity?.licenseNo} /></Td>
            </tr>
          </Table>
        </Section>

        {/* ===== 계좌 ===== */}
        <Section title="계좌">
          <Table headers={['금융기관', '예금주', '계좌번호']}>
            <tr>
              <Td><ReadonlyCell value={extra?.account?.bank} /></Td>
              <Td><ReadonlyCell value={extra?.account?.accountHolder} /></Td>
              <Td><ReadonlyCell value={extra?.account?.accountNo} /></Td>
            </tr>
          </Table>
        </Section>

        {/* ===== 주소 ===== */}
        <Section title="주소">
          <div className="border border-gray-300 px-4 py-3 text-lg font-semibold">
            {client.address || '-'}
          </div>
        </Section>

        {/* ===== 차량정보 ===== */}
        <Section title="차량정보">
          <Table
            headers={[
              '계약자',
              '피보험자',
              '차량번호',
              '차종',
              '가입회사',
              '만기일',
            ]}
          >
            {extra?.vehicles?.length ? (
              extra.vehicles.map((v, i) => (
                <tr key={i}>
                  <Td><ReadonlyCell value={v.contractor} /></Td>
                  <Td><ReadonlyCell value={v.insured} /></Td>
                  <Td><ReadonlyCell value={v.carNumber} /></Td>
                  <Td><ReadonlyCell value={v.carType} /></Td>
                  <Td><ReadonlyCell value={v.company} /></Td>
                  <Td><ReadonlyCell value={v.expireDate} /></Td>
                </tr>
              ))
            ) : (
              <EmptyRow colSpan={6} />
            )}
          </Table>
        </Section>

        {/* ===== 보험가입사항 ===== */}
        <Section title="보험가입사항">
          <Table
            headers={[
              '계약자',
              '피보험자',
              '상품명',
              '계약일',
              '이체일',
              '은행',
              '보험료',
            ]}
          >
            {extra?.insurances?.length ? (
              extra.insurances.map((i, idx) => (
                <tr key={idx}>
                  <Td><ReadonlyCell value={i.contractor} /></Td>
                  <Td><ReadonlyCell value={i.insured} /></Td>
                  <Td><ReadonlyCell value={i.product} /></Td>
                  <Td><ReadonlyCell value={i.contractDate} /></Td>
                  <Td><ReadonlyCell value={i.transferDate} /></Td>
                  <Td><ReadonlyCell value={i.bank} /></Td>
                  <Td><ReadonlyCell value={i.premium} /></Td>
                </tr>
              ))
            ) : (
              <EmptyRow colSpan={7} />
            )}
          </Table>
        </Section>

        {/* ===== 메모 ===== */}
        <Section title="메모장">
          <div className="whitespace-pre-wrap border border-gray-300 rounded px-4 py-3 text-lg font-semibold">
            {client.memo || '작성된 메모가 없습니다.'}
          </div>
        </Section>

        {/* ===== 버튼 ===== */}
        <div className="flex justify-end pt-6">
          <button
            onClick={() => navigate(`/clients/${client.id}/edit`)}
            className="rounded bg-blue-600 px-6 py-2 text-white cursor-pointer cursor-pointer"
          >
            수정하기
          </button>
        </div>

      </div>
    </div>
  );
}

/* =============================
   공통 UI
============================= */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-2 font-semibold text-lg">{title}</h2>
      {children}
    </div>
  );
}

function Table({
  headers,
  children,
}: {
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <table className="w-full border border-gray-300 text-sm">
      <thead className="bg-gray-100 font-semibold">
        <tr>
          {headers.map((h) => (
            <th key={h} className="border px-2 py-2">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

function Td({
  children,
  center,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <td className={`border px-2 ${center ? 'text-center' : ''}`}>
      {children}
    </td>
  );
}

function EmptyRow({ colSpan }: { colSpan: number }) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="border text-center py-4 text-gray-500"
      >
        등록된 정보가 없습니다.
      </td>
    </tr>
  );
}

function ReadonlyCell({ value }: { value?: string | null }) {
  return (
    <div className="px-2 py-2 text-lg font-semibold">
      {value || '-'}
    </div>
  );
}