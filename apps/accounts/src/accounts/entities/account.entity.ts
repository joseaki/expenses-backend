export interface IAccount {
  uuid: string;
  name: string;
  initialValue: number;
  currency: string;
  color: string;
  userId: string;
}

export interface IAccountCreateResponse {
  id: string;
}
