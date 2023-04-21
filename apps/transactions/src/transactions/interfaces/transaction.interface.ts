export interface ITransaction {
  uuid: string;
  type: TransactionType;
  amount: number;
  currency: string;
  accountId: string;
  userId: string;
  dateTime: Date;
  paymentMethod: PaymentMethod;
  description?: string;
}

export interface ITransactionCreateResponse {
  id: string;
}

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export enum PaymentMethod {
  CASH = 'CASH',
  CREDIT_CART = 'CREDIT_CART',
  DEBIT_CART = 'DEBIT_CART',
  TRANSFER = 'TRANSFER',
}
