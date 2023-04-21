import { Model } from 'mongoose';
import { Account } from '../schemas/account.schema';
import { InjectModel } from '@nestjs/mongoose';

export class AccountRepository {
  constructor(@InjectModel(Account.name) private accountModel: Model<Account>) {}

  createAccount(account: Account) {
    const entity = new this.accountModel(account);
    return entity.save();
  }

  findAllByUserId(userId: string) {
    return this.accountModel.find({ userId }).lean();
  }

  updateAccount(accountId: string, updatedParameters: Partial<Account>) {
    return this.accountModel.findOneAndUpdate({ uuid: accountId }, updatedParameters, { returnDocument: 'after' });
  }

  deleteAccount(accountId: string) {
    return this.accountModel.deleteOne({ uuid: accountId });
  }
}
