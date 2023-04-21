import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { TransactionRepository } from './repository/transaction.repository';
import { CREATED_TRANSACTION_MOCK, MockTransactionRepository } from './repository/__mocks__/trasaction.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FieldsOrder, PaymentMethod, SortType, TransactionType } from './interfaces/transaction.interface';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

describe('TransactionsService', () => {
  let transactionService: TransactionsService;
  let transactionRepository: TransactionRepository;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TransactionRepository,
          useValue: MockTransactionRepository(),
        },
        TransactionsService,
      ],
    }).compile();

    transactionService = module.get<TransactionsService>(TransactionsService);
    transactionRepository = module.get<TransactionRepository>(TransactionRepository);
  });

  it('should be defined', () => {
    expect(transactionService).toBeDefined();
  });

  it('should create a new transaction', async () => {
    const transactionBody: CreateTransactionDto = {
      currency: 'USD',
      userId: '123e4567-e89b-12d3-a456-426614174000',
      type: TransactionType.INCOME,
      amount: 0,
      dateTime: new Date('2023-04-21T02:45:41.619Z'),
      paymentMethod: PaymentMethod.CASH,
      accountId: '123e4567-e89b-12d3-a456-426614174000',
    };
    const transaction = await transactionService.create(transactionBody);
    expect(transaction).toBeDefined();
    expect(transactionRepository.createTransaction).toHaveBeenCalledWith(
      expect.objectContaining({
        uuid: expect.any(String),
        currency: expect.any(String),
        userId: expect.any(String),
        type: expect.any(String),
        amount: expect.any(Number),
        dateTime: expect.any(Date),
        paymentMethod: expect.any(String),
      })
    );
    expect(transactionRepository.createTransaction).toBeCalledTimes(1);
    expect(transaction).toEqual({ id: CREATED_TRANSACTION_MOCK.uuid });
  });

  it('should find all transaction based on its UUID', async () => {
    const userId = '123e4567-e89b-12d3-a456-426614174000';
    const query = {
      rowsPerPage: 1,
      pageNumber: 1,
      orderField: FieldsOrder.AMOUNT,
      sortType: SortType.ASC,
    };
    const transactions = await transactionService.findAllByUserId(userId, query);
    expect(transactions).toBeDefined();
    expect(transactions.items.length).toBeGreaterThan(0);
    expect(transactions).toEqual(expect.objectContaining({ items: expect.any(Array) }));
  });

  it("should update some transaction's parameters", async () => {
    const transactionId = '123e4567-e89b-12d3-a456-426614174001';
    const updatedBody: UpdateTransactionDto = {
      currency: 'USD',
      type: TransactionType.EXPENSE,
      amount: 1,
      accountId: '123e4567-e89b-12d3-a456-426614174001',
      dateTime: new Date('2023-04-21T02:45:41.619Z'),
      paymentMethod: PaymentMethod.CASH,
      description: 'des',
    };
    const transaction = await transactionService.updateTransaction(transactionId, updatedBody);
    expect(transaction).toBeDefined();
    expect(transactionRepository.updateTransaction).toBeCalledTimes(1);
    expect(transactionRepository.updateTransaction).toBeCalledWith(transactionId, updatedBody);
    expect(transaction).toEqual(CREATED_TRANSACTION_MOCK);
  });

  it('should delete an transaction', async () => {
    const transactionId = '123e4567-e89b-12d3-a456-426614174001';
    const transaction = await transactionService.deleteTransaction(transactionId);
    expect(transaction).toBeDefined();
    expect(transactionRepository.deleteTransaction).toBeCalledTimes(1);
    expect(transactionRepository.deleteTransaction).toBeCalledWith(transactionId);
    expect(transaction).toEqual({ deleted: true });
  });

  it('should not delete an transaction if the repository does not return a count', async () => {
    jest
      .spyOn(transactionRepository, 'deleteTransaction')
      .mockResolvedValueOnce({ deletedCount: 0, acknowledged: true });
    const transactionId = '123e4567-e89b-12d3-a456-426614174001';
    const transaction = await transactionService.deleteTransaction(transactionId);
    expect(transaction).toBeDefined();
    expect(transactionRepository.deleteTransaction).toBeCalledTimes(1);
    expect(transactionRepository.deleteTransaction).toBeCalledWith(transactionId);
    expect(transaction).toEqual({ deleted: false });
  });
});
