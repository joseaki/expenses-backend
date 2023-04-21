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

export interface IRepositoryPagination {
  items: ITransaction[];
  count: number;
}

export interface IServicePagination extends IRepositoryPagination {
  page: number;
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

export enum FieldsOrder {
  AMOUNT = 'amount',
  CURRENCY = 'currency',
  ACCOUNT_ID = 'accountId',
  DATE_TIME = 'dateTime',
  PAYMENT_METHOD = 'paymentMethod',
}

export enum SortType {
  ASC = 'asc',
  DESC = 'desc',
}
