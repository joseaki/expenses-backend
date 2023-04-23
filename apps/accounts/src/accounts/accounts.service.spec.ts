import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { AccountRepository } from './repository/account.repository';
import { CreateAccountDto } from './dto/create-account.dto';
import { CREATED_ACCOUNT_MOCK, MockAccountRepository } from './repository/__mocks__/account.repository';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ClientProxy } from '@nestjs/microservices';
import { of } from 'rxjs';

describe('AccountsService', () => {
  let accountService: AccountsService;
  let accountRepository: AccountRepository;
  let transactionClient: ClientProxy;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AccountRepository,
          useValue: MockAccountRepository(),
        },
        {
          provide: 'TRANSACTION_SERVICE',
          useFactory: () => ({
            send: jest.fn(),
            emit: jest.fn(),
          }),
        },
        AccountsService,
      ],
    }).compile();

    accountService = module.get<AccountsService>(AccountsService);
    accountRepository = module.get<AccountRepository>(AccountRepository);
    transactionClient = module.get<ClientProxy>('TRANSACTION_SERVICE');
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
    };
    const userId = '123e4567-e89b-12d3-a456-426614174000';

    const account = await accountService.create(accountBody, userId);
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

  it("should update some account's parameters", async () => {
    const accountId = '123e4567-e89b-12d3-a456-426614174001';
    const updatedBody: UpdateAccountDto = {
      name: 'new name',
      color: '#00000f',
      initialValue: 1,
    };
    const account = await accountService.updateAccount(accountId, updatedBody);
    expect(account).toBeDefined();
    expect(accountRepository.updateAccount).toBeCalledTimes(1);
    expect(accountRepository.updateAccount).toBeCalledWith(accountId, updatedBody);
    expect(account).toEqual(CREATED_ACCOUNT_MOCK);
  });

  it('should delete an account', async () => {
    const data = { deleted: true };
    jest.spyOn(transactionClient, 'send').mockReturnValueOnce(of(data));
    const accountId = '123e4567-e89b-12d3-a456-426614174001';
    const account = await accountService.deleteAccount(accountId);
    // (transactionClient.send as jest.Mock).mockReturnValueOnce(of(data));

    expect(account).toBeDefined();
    expect(accountRepository.deleteAccount).toBeCalledTimes(1);
    expect(accountRepository.deleteAccount).toBeCalledWith(accountId);
    expect(account).toEqual({ deleted: true });
  });

  it('should not delete an account if the repository does not return a count', async () => {
    const data = { deleted: true };
    jest.spyOn(transactionClient, 'send').mockReturnValueOnce(of(data));
    jest.spyOn(accountRepository, 'deleteAccount').mockResolvedValueOnce({ deletedCount: 0, acknowledged: true });
    const accountId = '123e4567-e89b-12d3-a456-426614174001';
    const account = await accountService.deleteAccount(accountId);
    expect(account).toBeDefined();
    expect(accountRepository.deleteAccount).toBeCalledTimes(1);
    expect(accountRepository.deleteAccount).toBeCalledWith(accountId);
    expect(account).toEqual({ deleted: false });
  });
});
