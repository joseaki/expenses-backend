export interface IAccount {
  name: string;
  initialValue: number;
  currency: string;
  color: string;
  userId: string;
}

export interface IAccountCreateResponse {
  id: string;
}
