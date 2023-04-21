import { Injectable } from '@nestjs/common';
import { CreateTransactionDto, CreateTransactionResponseDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRepository } from './repository/transaction.repository';
import { randomUUID } from 'crypto';
import { Transaction } from './schemas/transaction.schema';
import { Deleted } from '@expenses/interfaces';
import { ListTransactionQueryParamsDto } from './dto/list-transactions.dto';
import { IRepositoryPagination, IServicePagination } from './interfaces/transaction.interface';

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  /**
   * Create a new transaction.
   * @param createTransactionDto body to create a new transaction.
   * @returns id of the new transaction.
   */
  async create(createTransactionDto: CreateTransactionDto): Promise<CreateTransactionResponseDto> {
    const response = await this.transactionRepository.createTransaction({
      uuid: randomUUID(),
      ...createTransactionDto,
    });
    return { id: response.uuid };
  }

  /**
   * List all the transactions of the specified user.
   * @param userId userId the transactions belongs to.
   * @returns A list of transactions.
   */
  async findAllByUserId(userId: string, query: ListTransactionQueryParamsDto): Promise<IServicePagination> {
    const repositoryData = await this.transactionRepository.findAllByUserId(userId, query);
    return {
      ...repositoryData,
      page: query.pageNumber ?? 1,
    };
  }

  /**
   * Updates an transaction.
   * @param transactionId transaction id to be updated.
   * @param updateParameters parameters of the transaction to be updated.
   * @returns the updated transaction.
   */
  updateTransaction(transactionId: string, updateParameters: UpdateTransactionDto): Promise<Transaction> {
    return this.transactionRepository.updateTransaction(transactionId, updateParameters);
  }

  /**
   * Deletes an transaction
   * @param transactionId transaction id to be deleted.
   * @returns true if the transaction was deleted.
   */
  async deleteTransaction(transactionId: string): Promise<Deleted> {
    const transaction = await this.transactionRepository.deleteTransaction(transactionId);
    if (transaction.deletedCount > 0) {
      return { deleted: true };
    }
    return { deleted: false };
  }
}
