export const CREATED_TRANSACTION_MOCK = {
  name: 'wallet',
  initialValue: 10,
  currency: 'PEN',
  color: '#4455dd',
  userId: '123e4567-e89b-12d3-a456-426614174000',
  uuid: '123e4567-e89b-12d3-a456-426614174001',
  _id: '6441779fb4f81b3806b6a457',
  __v: 0,
};

export const MockTransactionRepository = jest.fn().mockReturnValue({
  createTransaction: jest.fn().mockResolvedValue(CREATED_TRANSACTION_MOCK),
  findAllByUserId: jest.fn().mockResolvedValue({ items: [CREATED_TRANSACTION_MOCK] }),
  updateTransaction: jest.fn().mockResolvedValue(CREATED_TRANSACTION_MOCK),
  deleteTransaction: jest.fn().mockResolvedValue({ deletedCount: 1 }),
});
