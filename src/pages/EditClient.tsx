import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useClientDetail } from '@/hooks/useClientDetail';
import { supabase } from '@/lib/supabase';
import type { ClientExtra } from '@/types/client';

type RowClient = {
  name: string;
  phone: string;
  relation: string;
  rrn: string;
  job: string;
};

type VehicleRow = {
  contractor: string;
  insured: string;
  carNumber: string;
  carType: string;
  company: string;
  expireDate: string;
};

type InsuranceRow = {
  contractor: string;
  insured: string;
  product: string;
  contractDate: string;
  transferDate: string;
  bank: string;
  premium: string;
};

export default function EditClient() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  if (!id) return <p className="p-6">잘못된 접근입니다.</p>;

  const { client, loading } = useClientDetail(id);

  /* ===== 고객 ===== */
  const [rows, setRows] = useState<RowClient[]>([
    { name: '', phone: '', relation: '', rrn: '', job: '' },
  ]);

  /* ===== 신분증 ===== */
  const [idIssueOrg, setIdIssueOrg] = useState('');
  const [idIssueDate, setIdIssueDate] = useState('');
  const [licenseNo, setLicenseNo] = useState('');

  /* ===== 계좌 ===== */
  const [bank, setBank] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [accountNo, setAccountNo] = useState('');

  /* ===== 주소 ===== */
  const [address, setAddress] = useState('');

  /* ===== 차량 ===== */
  const [vehicles, setVehicles] = useState<VehicleRow[]>([
    {
      contractor: '',
      insured: '',
      carNumber: '',
      carType: '',
      company: '',
      expireDate: '',
    },
  ]);

  /* ===== 보험 ===== */
  const [insurances, setInsurances] = useState<InsuranceRow[]>([
    {
      contractor: '',
      insured: '',
      product: '',
      contractDate: '',
      transferDate: '',
      bank: '',
      premium: '',
    },
  ]);

  /* ===== 메모 ===== */
  const [memoText, setMemoText] = useState('');

  /* ===== 🔥 기존 데이터 → 그대로 채우기 ===== */
  useEffect(() => {
    if (!client) return;

    setRows([
      {
        name: client.name,
        phone: client.phone ?? '',
        relation: client.extra?.relation ?? '',
        rrn: client.extra?.rrn ?? '',
        job: client.extra?.job ?? '',
      },
    ]);

    setIdIssueOrg(client.extra?.identity?.idIssueOrg ?? '');
    setIdIssueDate(client.extra?.identity?.idIssueDate ?? '');
    setLicenseNo(client.extra?.identity?.licenseNo ?? '');

    setBank(client.extra?.account?.bank ?? '');
    setAccountHolder(client.extra?.account?.accountHolder ?? '');
    setAccountNo(client.extra?.account?.accountNo ?? '');

    setAddress(client.address ?? '');
    setMemoText(client.memo ?? '');

    setVehicles(
      client.extra?.vehicles?.length
        ? client.extra.vehicles.map((v) => ({
            contractor: v.contractor ?? '',
            insured: v.insured ?? '',
            carNumber: v.carNumber ?? '',
            carType: v.carType ?? '',
            company: v.company ?? '',
            expireDate: v.expireDate ?? '',
          }))
        : [
            {
              contractor: '',
              insured: '',
              carNumber: '',
              carType: '',
              company: '',
              expireDate: '',
            },
          ]
    );

    setInsurances(
      client.extra?.insurances?.length
        ? client.extra.insurances.map((i) => ({
            contractor: i.contractor ?? '',
            insured: i.insured ?? '',
            product: i.product ?? '',
            contractDate: i.contractDate ?? '',
            transferDate: i.transferDate ?? '',
            bank: i.bank ?? '',
            premium: i.premium ?? '',
          }))
        : [
            {
              contractor: '',
              insured: '',
              product: '',
              contractDate: '',
              transferDate: '',
              bank: '',
              premium: '',
            },
          ]
    );
  }, [client]);

  /* ===== 핸들러 (AddClient 그대로) ===== */

  const handleChange = (
    index: number,
    field: keyof RowClient,
    value: string
  ) => {
    const next = [...rows];
    next[index][field] = value;
    setRows(next);
  };

  const addRow = () => {
    setRows([
      ...rows,
      { name: '', phone: '', relation: '', rrn: '', job: '' },
    ]);
  };

  const handleVehicleChange = (
    index: number,
    field: keyof VehicleRow,
    value: string
  ) => {
    const next = [...vehicles];
    next[index][field] = value;
    setVehicles(next);
  };

  const addVehicleRow = () => {
    setVehicles([
      ...vehicles,
      {
        contractor: '',
        insured: '',
        carNumber: '',
        carType: '',
        company: '',
        expireDate: '',
      },
    ]);
  };

  const handleInsuranceChange = (
    index: number,
    field: keyof InsuranceRow,
    value: string
  ) => {
    const next = [...insurances];
    next[index][field] = value;
    setInsurances(next);
  };

  const addInsuranceRow = () => {
    setInsurances([
      ...insurances,
      {
        contractor: '',
        insured: '',
        product: '',
        contractDate: '',
        transferDate: '',
        bank: '',
        premium: '',
      },
    ]);
  };

  /* ===== 저장 (UPDATE) ===== */

  const handleSubmit = async () => {
    try {
      const extra: ClientExtra = {
        relation: rows[0].relation,
        rrn: rows[0].rrn,
        job: rows[0].job,
        identity: { idIssueOrg, idIssueDate, licenseNo },
        account: { bank, accountHolder, accountNo },
        vehicles,
        insurances,
      };

      const { error } = await supabase
        .from('clients')
        .update({
          name: rows[0].name,
          phone: rows[0].phone || null,
          address: address || null,
          memo: memoText || null,
          extra,
        })
        .eq('id', id);

      if (error) throw error;

      alert('고객 정보 수정 완료');

      navigate(`/clients/${id}`, {
        state: { updated: true },
      });

    } catch (e: any) {
      alert(e.message);
    }
  };

  if (loading) return <p className="p-6">로딩중...</p>;

  /* ===== UI (AddClient와 완전 동일) ===== */

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-black">
      <div className="mx-auto max-w-6xl bg-white p-6 shadow space-y-10">
        <h1 className="text-xl font-bold">고객 등록 (엑셀 형식)</h1>

        {/* 고객 */}
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100 text-black font-semibold text-lg">
            <tr>
              <th className="border w-12">No</th>
              <th className="border">이름</th>
              <th className="border">전화번호</th>
              <th className="border">관계</th>
              <th className="border">주민번호</th>
              <th className="border">직업</th>
            </tr>
          </thead>
          <tbody className="text-lg font-semibold text-black">
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="border text-center">{index + 1}</td>
                {(['name', 'phone', 'relation', 'rrn', 'job'] as const).map(
                  (field) => (
                    <td key={field} className="border">
                      <input
                        value={row[field]}
                        onChange={(e) =>
                          handleChange(index, field, e.target.value)
                        }
                        className="w-full px-2 py-1 outline-none"
                      />
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={addRow}
          className="rounded bg-gray-200 px-4 py-2 text-black cursor-pointer"
        >
          + 인원 추가
        </button>

        {/* 신분증 */}
        <div>
          <h2 className="mb-2 font-semibold text-lg">신분증</h2>
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100 font-semibold">
              <tr>
                <th className="border px-4 py-2">발급기관</th>
                <th className="border px-4 py-2">발급일</th>
                <th className="border px-4 py-2">면허번호</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border">
                  <input className="w-full px-4 py-2 outline-none text-lg font-semibold"
                    value={idIssueOrg}
                    onChange={(e) => setIdIssueOrg(e.target.value)}
                  />
                </td>
                <td className="border">
                  <input type="date"
                    className="w-full px-4 py-2 outline-none text-lg font-semibold"
                    value={idIssueDate}
                    onChange={(e) => setIdIssueDate(e.target.value)}
                  />
                </td>
                <td className="border">
                  <input className="w-full px-4 py-2 outline-none text-lg font-semibold"
                    value={licenseNo}
                    onChange={(e) => setLicenseNo(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 계좌 */}
        <div>
          <h2 className="mb-2 font-semibold text-lg">계좌</h2>
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100 font-semibold">
              <tr>
                <th className="border px-2 py-2">금융기관</th>
                <th className="border px-2 py-2">예금주</th>
                <th className="border px-2 py-2">계좌번호</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border">
                  <input className="w-full px-2 py-1 outline-none text-lg font-semibold"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                  />
                </td>
                <td className="border">
                  <input className="w-full px-2 py-1 outline-none text-lg font-semibold"
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                  />
                </td>
                <td className="border">
                  <input className="w-full px-2 py-1 outline-none text-lg font-semibold"
                    value={accountNo}
                    onChange={(e) => setAccountNo(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 주소 */}
        <div>
          <h2 className="mb-2 font-semibold text-lg text-black">주소</h2>
          <table className="w-full border border-gray-700 border-collapse">
            <tbody>
              <tr>
                <td className="border border-gray-700">
                  <input
                    className="w-full px-2 py-2 outline-none text-lg font-semibold"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 차량정보 */}
        <div>
          <h2 className="mb-2 font-semibold text-lg">차량정보</h2>
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100 font-semibold">
              <tr>
                <th className="border">계약자</th>
                <th className="border">피보험자</th>
                <th className="border">차량번호</th>
                <th className="border">차종(운전범위)</th>
                <th className="border">가입회사</th>
                <th className="border">만기일</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((row, index) => (
                <tr key={index}>
                  {(
                    [
                      'contractor',
                      'insured',
                      'carNumber',
                      'carType',
                      'company',
                      'expireDate',
                    ] as const
                  ).map((field) => (
                    <td key={field} className="border">
                      <input
                        type={field === 'expireDate' ? 'date' : 'text'}
                        value={row[field]}
                        onChange={(e) =>
                          handleVehicleChange(index, field, e.target.value)
                        }
                        className="w-full px-2 py-1 outline-none text-lg font-semibold"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={addVehicleRow}
            className="mt-2 rounded bg-gray-200 px-4 py-2 cursor-pointer"
          >
            + 차량 추가
          </button>
        </div>

        {/* 보험가입사항 */}
        <div>
          <h2 className="mb-2 font-semibold text-lg">보험가입사항</h2>
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100 font-semibold">
              <tr>
                <th className="border w-12">No</th>
                <th className="border">계약자</th>
                <th className="border">피보험자</th>
                <th className="border">상품명 / 회사</th>
                <th className="border">계약일</th>
                <th className="border">이체일</th>
                <th className="border">은행</th>
                <th className="border">보험료</th>
              </tr>
            </thead>
            <tbody>
              {insurances.map((row, index) => (
                <tr key={index}>
                  <td className="border text-center font-semibold">
                    {index + 1}
                  </td>
                  {(
                    [
                      'contractor',
                      'insured',
                      'product',
                      'contractDate',
                      'transferDate',
                      'bank',
                      'premium',
                    ] as const
                  ).map((field) => (
                    <td key={field} className="border">
                      <input
                        type={
                          field === 'contractDate' || field === 'transferDate'
                            ? 'date'
                            : 'text'
                        }
                        value={row[field]}
                        onChange={(e) =>
                          handleInsuranceChange(index, field, e.target.value)
                        }
                        className="w-full px-2 py-1 outline-none text-lg font-semibold"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={addInsuranceRow}
            className="mt-2 rounded bg-gray-200 px-4 py-2 cursor-pointer"
          >
            + 보험 추가
          </button>
        </div>

        <div>
          <h2 className="mb-2 font-semibold text-lg">메모장</h2>
          <textarea
            value={memoText}
            onChange={(e) => setMemoText(e.target.value)}
            placeholder="고객 관련 메모를 입력하세요"
            rows={6}
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none text-lg font-semibold resize-none"
          />
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded bg-blue-600 px-6 py-2 text-white disabled:opacity-50 cursor-pointer"
          >
            {loading ? '저장 중...' : '저장'}
          </button>
          <button
            onClick={() => navigate(-1)}
            className="rounded bg-gray-300 px-4 py-2 cursor-pointer"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}