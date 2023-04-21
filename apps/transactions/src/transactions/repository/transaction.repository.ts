import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from '../schemas/transaction.schema';

export class TransactionRepository {
  constructor(@InjectModel(Transaction.name) private transactionModel: Model<Transaction>) {}

  createTransaction(transaction: Transaction) {
    const entity = new this.transactionModel(transaction);
    return entity.save();
  }

  findAllByAccount(accountId: string) {
    return this.transactionModel.find({ accountId }).exec();
  }

  findAllByUserId(userId: string) {
    return this.transactionModel.find({ userId }).exec();
  }

  updateTransaction(transactionId: string, updatedParameters: Partial<Transaction>) {
    return this.transactionModel.findOneAndUpdate({ uuid: transactionId }, updatedParameters, {
      returnDocument: 'after',
    });
  }

  deleteTransaction(transactionId: string) {
    return this.transactionModel.deleteOne({ uuid: transactionId });
  }
}
