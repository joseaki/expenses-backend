import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { MockTransactionService } from './__mocks__/transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FieldsOrder, PaymentMethod, SortType, TransactionType } from './interfaces/transaction.interface';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

describe('TransactionsController', () => {
  let controller: TransactionsController;
  let transactionService: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [{ provide: TransactionsService, useValue: MockTransactionService() }],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
    transactionService = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the createTransaction service', async () => {
    const transactionBody: CreateTransactionDto = {
      currency: 'USD',
      userId: '123e4567-e89b-12d3-a456-426614174000',
      type: TransactionType.INCOME,
      amount: 0,
      dateTime: new Date('2023-04-21T02:45:41.619Z'),
      paymentMethod: PaymentMethod.CASH,
      accountId: '123e4567-e89b-12d3-a456-426614174000',
    };
    await controller.create(transactionBody);
    expect(transactionService.create).toHaveBeenCalledTimes(1);
    expect(transactionService.create).toHaveBeenCalledWith(transactionBody);
  });

  it('should call the findAllByUserId service', async () => {
    const userId = '123e4567-e89b-12d3-a456-426614174000';
    const query = {
      rowsPerPage: 1,
      pageNumber: 1,
      orderField: FieldsOrder.AMOUNT,
      sortType: SortType.ASC,
    };
    await controller.findAllByUserId(userId, query);
    expect(transactionService.findAllByUserId).toHaveBeenCalledTimes(1);
    expect(transactionService.findAllByUserId).toHaveBeenCalledWith(userId, query);
  });

  it('should call the updateTransaction service', async () => {
    const transactionId = '123e4567-e89b-12d3-a456-426614174000';
    const transactionBody: UpdateTransactionDto = {
      currency: 'USD',
      type: TransactionType.EXPENSE,
      amount: 1,
      accountId: '123e4567-e89b-12d3-a456-426614174001',
      dateTime: new Date('2023-04-21T02:45:41.619Z'),
      paymentMethod: PaymentMethod.CASH,
      description: 'des',
    };
    await controller.updateTransaction({ transactionId }, transactionBody);
    expect(transactionService.updateTransaction).toHaveBeenCalledTimes(1);
    expect(transactionService.updateTransaction).toHaveBeenCalledWith(transactionId, transactionBody);
  });

  it('should call the deleteTransaction service', async () => {
    const transactionId = '123e4567-e89b-12d3-a456-426614174000';
    await controller.deleteTransaction({ transactionId });
    expect(transactionService.deleteTransaction).toHaveBeenCalledTimes(1);
    expect(transactionService.deleteTransaction).toHaveBeenCalledWith(transactionId);
  });
});
