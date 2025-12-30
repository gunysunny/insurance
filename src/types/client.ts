export type ClientExtra = {
  relation?: string;
  rrn?: string;
  job?: string;

  identity?: {
    idIssueOrg?: string;
    idIssueDate?: string;
    licenseNo?: string;
  };

  account?: {
    bank?: string;
    accountHolder?: string;
    accountNo?: string;
  };

  vehicles?: {
    contractor?: string;
    insured?: string;
    carNumber?: string;
    carType?: string;
    company?: string;
    expireDate?: string;
  }[];

  insurances?: {
    contractor?: string;
    insured?: string;
    product?: string;
    contractDate?: string;
    transferDate?: string;
    bank?: string;
    premium?: string;
  }[];
};

export type Client = {
  id: string;
  user_id: string;

  name: string;
  phone: string | null;
  gender: 'male' | 'female' | null;
  address: string | null;

  birth: string | null;
  memo: string | null;

  /** 🔥 추가 */
  extra?: ClientExtra;

  created_at: string;
};