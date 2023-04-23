import { Inject, Injectable } from '@nestjs/common';
import { CreateAccountDto, CreateAccountResponseDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountRepository } from './repository/account.repository';
import { randomUUID } from 'crypto';
import { Account } from './schemas/account.schema';
import { Deleted } from '@expenses/interfaces';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountRepository: AccountRepository,
    @Inject('TRANSACTION_SERVICE') private transactionClient: ClientProxy
  ) {}

  /**
   * Create a new account.
   * @param createAccountDto body to create a new account.
   * @returns id of the new account.
   */
  async create(createAccountDto: CreateAccountDto, userId: string): Promise<CreateAccountResponseDto> {
    const response = await this.accountRepository.createAccount({
      userId,
      uuid: randomUUID(),
      ...createAccountDto,
    });
    return { id: response.uuid };
  }

  /**
   * List all the accounts of the specified user.
   * @param userId userId the accounts belongs to.
   * @returns A list of accounts.
   */
  async findAllByUserId(userId: string): Promise<Account[]> {
    return await this.accountRepository.findAllByUserId(userId);
  }

  /**
   * Updates an account.
   * @param accountId account id to be updated.
   * @param updateParameters parameters of the account to be updated.
   * @returns the updated account.
   */
  updateAccount(accountId: string, updateParameters: UpdateAccountDto): Promise<Account> {
    return this.accountRepository.updateAccount(accountId, updateParameters);
  }

  /**
   * Deletes an account
   * @param accountId account id to be deleted.
   * @returns true if the account was deleted.
   */
  async deleteAccount(accountId: string): Promise<Deleted> {
    const account = await this.accountRepository.deleteAccount(accountId);
    const resp = await lastValueFrom(
      this.transactionClient.send({ cmd: 'deleteAllTransactionsFromAccount' }, { accountId })
    );
    console.log(resp);
    if (account.deletedCount > 0 && resp.deleted) {
      return { deleted: true };
    }
    return { deleted: false };
  }
}
