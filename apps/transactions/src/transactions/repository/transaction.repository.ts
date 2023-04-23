import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from '../schemas/transaction.schema';
import { ListTransactionQueryParamsDto } from '../dto/list-transactions.dto';
import { FieldsOrder, IRepositoryPagination } from '../interfaces/transaction.interface';

export class TransactionRepository {
  constructor(@InjectModel(Transaction.name) private transactionModel: Model<Transaction>) {}

  createTransaction(transaction: Transaction) {
    const entity = new this.transactionModel(transaction);
    return entity.save();
  }

  async findAllByAccount(userId: string, accountId: string, query: ListTransactionQueryParamsDto) {
    return this.findTransactions({ userId, accountId }, query);
  }

  async findAllByUserId(userId: string, query: ListTransactionQueryParamsDto): Promise<IRepositoryPagination> {
    return this.findTransactions({ userId }, query);
  }

  private async findTransactions(match: Record<string, string>, query: ListTransactionQueryParamsDto) {
    const rowsPerPage = query.rowsPerPage ?? 10;
    const pageNumber = query.pageNumber ? query.pageNumber - 1 : 0;
    const orderField = query.orderField ? query.orderField : FieldsOrder.DATE_TIME;
    const sortType = query.sortType ?? 'desc';
    const skipNumber = pageNumber * rowsPerPage;

    const queryModel = this.transactionModel.aggregate().match(match);
    queryModel.sort({ [orderField]: sortType === 'desc' ? -1 : 1 });
    const data = await queryModel
      .group({ _id: null, items: { $push: '$$ROOT' }, count: { $sum: 1 } })
      .project({ _id: 0, count: 1, items: { $slice: ['$items', skipNumber, rowsPerPage] } })
      .exec();
    return data[0];
  }

  updateTransaction(transactionId: string, updatedParameters: Partial<Transaction>) {
    return this.transactionModel.findOneAndUpdate({ uuid: transactionId }, updatedParameters, {
      returnDocument: 'after',
    });
  }

  deleteTransaction(transactionId: string) {
    return this.transactionModel.deleteOne({ uuid: transactionId });
  }

  deleteTransactions(accountId: string) {
    return this.transactionModel.deleteMany({ accountId });
  }
}
