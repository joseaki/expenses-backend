export const CREATED_ACCOUNT_MOCK = {
  name: 'wallet',
  initialValue: 10,
  currency: 'PEN',
  color: '#4455dd',
  userId: '123e4567-e89b-12d3-a456-426614174000',
  _id: '6441779fb4f81b3806b6a457',
  __v: 0,
};

export const MockAccountRepository = {
  createAccount: jest.fn().mockResolvedValue(CREATED_ACCOUNT_MOCK),
  findAllByUserId: jest.fn().mockResolvedValue([CREATED_ACCOUNT_MOCK]),
};
