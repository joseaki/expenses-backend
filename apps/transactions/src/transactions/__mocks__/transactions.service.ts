export const MockTransactionService = jest.fn().mockReturnValue({
  create: jest.fn(),
  findAllByUserId: jest.fn(),
  updateTransaction: jest.fn(),
  deleteTransaction: jest.fn(),
});
