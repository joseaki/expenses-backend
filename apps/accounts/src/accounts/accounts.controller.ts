import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AccountsService } from './accounts.service';
import {
  CreateAccountDto,
  CreateAccountResponseDto,
} from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ConvertResponseToDtoInterceptor } from '../Interceptors/convert-response-to-dto.interceptor';
import { TransformResponseInterceptor } from '../Interceptors/transform-response.interceptor';
import { ValidatePipe } from '../Pipes/validate-body.pipe';

@Controller('account')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @MessagePattern('createAccount')
  create(@Payload() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Post()
  @ApiResponse({
    status: 200,
    type: CreateAccountResponseDto,
    description: 'Id of the created account',
  })
  @ApiOperation({
    summary: 'Create a new account',
    description: 'This endpoint creates a new account for an user.',
  })
  @UseInterceptors(
    new ConvertResponseToDtoInterceptor(CreateAccountResponseDto)
  )
  @UseInterceptors(TransformResponseInterceptor)
  createAccount(@Body(new ValidatePipe()) createAccountDto: CreateAccountDto) {
    console.log(createAccountDto);
    return this.accountsService.create(createAccountDto);
  }

  @Get(':userId')
  findAllByUserId(@Param('userId') userId: string) {
    console.log(userId);
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
