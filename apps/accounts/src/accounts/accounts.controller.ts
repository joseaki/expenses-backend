import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AccountsService } from './accounts.service';
import { CreateAccountDto, CreateAccountResponseDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiExtraModels, ApiOperation } from '@nestjs/swagger';
import { CommonResponse } from '@expenses/dto';
import { ValidatePipe } from '@expenses/pipes';
import { TransformResponseInterceptor, ServiceResponseToDto } from '@expenses/interceptors';

@Controller('account')
@ApiExtraModels(CreateAccountResponseDto)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @MessagePattern('createAccount')
  create(@Payload() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new account',
    description: 'This endpoint creates a new account for an user.',
  })
  @CommonResponse(CreateAccountResponseDto)
  @UseInterceptors(new ServiceResponseToDto(CreateAccountResponseDto))
  @UseInterceptors(TransformResponseInterceptor)
  createAccount(@Body(new ValidatePipe()) createAccountDto: CreateAccountDto): Promise<CreateAccountResponseDto> {
    return this.accountsService.create(createAccountDto);
  }

  @Get(':userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.accountsService.findAllByUserId(userId);
  }

  @MessagePattern('findAllAccounts')
  findAll() {
    return this.accountsService.findAll();
  }

  @MessagePattern('findOneAccount')
  findOne(@Payload() id: number) {
    return this.accountsService.findOne(id);
  }

  @MessagePattern('updateAccount')
  update(@Payload() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(updateAccountDto.id, updateAccountDto);
  }

  @MessagePattern('removeAccount')
  remove(@Payload() id: number) {
    return this.accountsService.remove(id);
  }
}
