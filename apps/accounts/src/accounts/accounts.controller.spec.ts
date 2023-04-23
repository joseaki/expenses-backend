import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { MockAccountService } from './__mocks__/accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

describe('AccountsController', () => {
  let controller: AccountsController;
  let accountService: AccountsService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [
        { provide: AccountsService, useValue: MockAccountService() },
        {
          provide: 'AUTH_SERVICE',
          useFactory: () => ({
            send: jest.fn(),
            emit: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
    accountService = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the createAccount service', async () => {
    const accountBody: CreateAccountDto = {
      name: 'account',
      initialValue: 0,
      currency: 'USD',
      color: '#000000',
    };
    const userId = '123e4567-e89b-12d3-a456-426614174000';

    await controller.createAccount(accountBody, { userId });
    expect(accountService.create).toHaveBeenCalledTimes(1);
    expect(accountService.create).toHaveBeenCalledWith(accountBody, userId);
  });

  it('should call the findAllByUserId service', async () => {
    const userId = '123e4567-e89b-12d3-a456-426614174000';
    await controller.findAllByUserId({ userId });
    expect(accountService.findAllByUserId).toHaveBeenCalledTimes(1);
    expect(accountService.findAllByUserId).toHaveBeenCalledWith(userId);
  });

  it('should call the updateAccount service', async () => {
    const accountId = '123e4567-e89b-12d3-a456-426614174000';
    const accountBody: UpdateAccountDto = {
      name: 'account',
      color: '#000000',
      initialValue: 8,
    };
    await controller.updateAccount({ accountId }, accountBody);
    expect(accountService.updateAccount).toHaveBeenCalledTimes(1);
    expect(accountService.updateAccount).toHaveBeenCalledWith(accountId, accountBody);
  });

  it('should call the deleteAccount service', async () => {
    const accountId = '123e4567-e89b-12d3-a456-426614174000';
    await controller.deleteAccount({ accountId });
    expect(accountService.deleteAccount).toHaveBeenCalledTimes(1);
    expect(accountService.deleteAccount).toHaveBeenCalledWith(accountId);
  });
});
