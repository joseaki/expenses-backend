import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { AccountRepository } from './repository/account.repository';
import { CreateAccountDto } from './dto/create-account.dto';
import { CREATED_ACCOUNT_MOCK, MockAccountRepository } from './repository/__mocks__/account.repository';
// import { getModelToken } from '@nestjs/mongoose';
// import { Account } from './schemas/account.schema';

// jest.mock('./repository/account.repository');

describe('AccountsService', () => {
  let accountService: AccountsService;
  let accountRepository: AccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AccountRepository,
          useValue: MockAccountRepository,
        },
        AccountsService,
      ],
    }).compile();

    accountService = module.get<AccountsService>(AccountsService);
    accountRepository = module.get<AccountRepository>(AccountRepository);
  });

  it('should be defined', () => {
    expect(accountService).toBeDefined();
  });

  it('should create a new account', async () => {
    const accountBody: CreateAccountDto = {
      name: 'account',
      initialValue: 0,
      currency: 'USD',
      color: '#000000',
      userId: '123e4567-e89b-12d3-a456-426614174000',
    };
    const account = await accountService.create(accountBody);
    expect(account).toBeDefined();
    expect(accountRepository.createAccount).toHaveBeenCalledWith(
      expect.objectContaining({
        uuid: expect.any(String),
        name: expect.any(String),
        initialValue: expect.any(Number),
        currency: expect.any(String),
        color: expect.any(String),
        userId: expect.any(String),
      })
    );
    expect(accountRepository.createAccount).toBeCalledTimes(1);
    expect(account).toEqual({ id: CREATED_ACCOUNT_MOCK.uuid });
  });

  it('should find all account based on its UUID', async () => {
    const userId = '123e4567-e89b-12d3-a456-426614174000';
    const accounts = await accountService.findAllByUserId(userId);
    expect(accounts).toBeDefined();
    expect(accounts.length).toBeGreaterThan(0);
    expect(accounts).toEqual([CREATED_ACCOUNT_MOCK]);
  });
});
