export const MockAccountService = jest.fn().mockReturnValue({
  create: jest.fn(),
  findAllByUserId: jest.fn(),
  updateAccount: jest.fn(),
  deleteAccount: jest.fn(),
});
