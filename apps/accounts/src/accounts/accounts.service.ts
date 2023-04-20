import { Injectable } from '@nestjs/common';
import {
  CreateAccountDto,
  CreateAccountResponseDto,
} from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountRepository } from './repository/account.repository';

@Injectable()
export class AccountsService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async create(
    createAccountDto: CreateAccountDto
  ): Promise<CreateAccountResponseDto> {
    const response = await this.accountRepository.createAccount(
      createAccountDto
    );
    return { id: response.id };
  }

  async findAllByUserId(userId: string) {
    const response = await this.accountRepository.findAllByUserId(userId);
    console.log(response);
    return response;
  }

  findAll() {
    return `This action returns all accounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
