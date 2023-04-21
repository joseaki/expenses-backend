import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AccountsService } from './accounts.service';
import { CreateAccountDto, CreateAccountResponseDto } from './dto/create-account.dto';
import { UpdateAccountDto, UpdateAccountParamsDto, UpdateAccountResponseDto } from './dto/update-account.dto';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonCreateResponse, CommonResponse, ListResponse } from '@expenses/dto';
import { ValidatePipe } from '@expenses/pipes';
import { Deleted } from '@expenses/interfaces';
import { TransformResponseInterceptor, ServiceResponseToDto } from '@expenses/interceptors';
import { ListAccountsResponseDto } from './dto/list-accounts.dto';
import { DeleteAccountParamsDto, DeleteAccountResponseDto } from './dto/delete-account.dto';

@Controller('account')
@ApiTags('Accounts')
@ApiExtraModels(CreateAccountResponseDto, ListAccountsResponseDto, UpdateAccountResponseDto, DeleteAccountResponseDto)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  /**
   *
   * @param createAccountDto
   * @returns
   */
  @MessagePattern('createAccount')
  create(@Payload() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  /**
   * Creates a new account.
   * @param createAccountDto createAccount Body.
   * @returns account created object.
   */
  @Post()
  @ApiOperation({
    summary: 'Create a new account',
    description: 'This endpoint creates a new account for an user.',
  })
  @CommonCreateResponse(CreateAccountResponseDto)
  @UseInterceptors(new ServiceResponseToDto(CreateAccountResponseDto))
  @UseInterceptors(TransformResponseInterceptor)
  createAccount(@Body(new ValidatePipe()) createAccountDto: CreateAccountDto): Promise<CreateAccountResponseDto> {
    return this.accountsService.create(createAccountDto);
  }

  /**
   * List of all user's accounts
   * @param userId user id the account belongs to.
   * @returns list of user accounts.
   */
  @Get(':userId')
  @ApiOperation({
    summary: 'List of accounts',
    description: 'This endpoint lists all the accounts of the specified user',
  })
  @ListResponse(ListAccountsResponseDto)
  @UseInterceptors(new ServiceResponseToDto(ListAccountsResponseDto))
  @UseInterceptors(TransformResponseInterceptor)
  findAllByUserId(@Param('userId') userId: string): Promise<ListAccountsResponseDto[]> {
    return this.accountsService.findAllByUserId(userId);
  }

  /**
   * Update some account parameters.
   * @param params Url parameters.
   * @param updateParameters request body with parameters to be updated.
   * @returns account updated.
   */
  @Patch(':accountId')
  @ApiOperation({
    summary: 'Update account information',
    description: 'This endpoint updates an user account',
  })
  @CommonResponse(UpdateAccountResponseDto)
  @UseInterceptors(new ServiceResponseToDto(UpdateAccountResponseDto))
  @UseInterceptors(TransformResponseInterceptor)
  updateAccount(
    @Param() params: UpdateAccountParamsDto,
    @Body(new ValidatePipe()) updateParameters: UpdateAccountDto
  ): Promise<UpdateAccountResponseDto> {
    return this.accountsService.updateAccount(params.accountId, updateParameters);
  }

  /**
   * Delete an account.
   * @param params Url parameters with the accountID.
   * @returns true or false if the account was deleted.
   */
  @Delete(':accountId')
  @ApiOperation({
    summary: 'Deletes an account',
    description: 'This endpoint deleted an account',
  })
  @CommonResponse(DeleteAccountResponseDto)
  @UseInterceptors(new ServiceResponseToDto(DeleteAccountResponseDto))
  @UseInterceptors(TransformResponseInterceptor)
  deleteAccount(@Param() params: DeleteAccountParamsDto): Promise<Deleted> {
    return this.accountsService.deleteAccount(params.accountId);
  }
}
