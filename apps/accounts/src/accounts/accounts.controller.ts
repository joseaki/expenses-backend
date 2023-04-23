import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto, CreateAccountResponseDto } from './dto/create-account.dto';
import { UpdateAccountDto, UpdateAccountParamsDto, UpdateAccountResponseDto } from './dto/update-account.dto';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonCreateResponse, CommonResponse, ListResponse } from '@expenses/dto';
import { ValidatePipe } from '@expenses/pipes';
import { Deleted } from '@expenses/interfaces';
import { AuthenticationGuard } from '@expenses/guards';
import { UserFromToken, IUserFromToken } from '@expenses/decorators';
import { TransformResponseInterceptor, ServiceResponseToDto } from '@expenses/interceptors';
import { ListAccountsResponseDto } from './dto/list-accounts.dto';
import { DeleteAccountParamsDto, DeleteAccountResponseDto } from './dto/delete-account.dto';

@Controller()
@ApiTags('Accounts')
@ApiExtraModels(CreateAccountResponseDto, ListAccountsResponseDto, UpdateAccountResponseDto, DeleteAccountResponseDto)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  /**
   * Creates a new account.
   * @param createAccountDto createAccount Body.
   * @returns account created object.
   */
  @UseGuards(AuthenticationGuard)
  @Post()
  @ApiOperation({
    summary: 'Create a new account',
    description: 'This endpoint creates a new account for an user.',
  })
  @CommonCreateResponse(CreateAccountResponseDto)
  @UseInterceptors(new ServiceResponseToDto(CreateAccountResponseDto))
  @UseInterceptors(TransformResponseInterceptor)
  async createAccount(
    @Body(new ValidatePipe()) createAccountDto: CreateAccountDto,
    @UserFromToken() user: IUserFromToken
  ): Promise<CreateAccountResponseDto> {
    return this.accountsService.create(createAccountDto, user.userId);
  }

  /**
   * List of all user's accounts
   * @param userId user id the account belongs to.
   * @returns list of user accounts.
   */
  @UseGuards(AuthenticationGuard)
  @Get('')
  @ApiOperation({
    summary: 'List of accounts',
    description: 'This endpoint lists all the accounts of the specified user',
  })
  @ListResponse(ListAccountsResponseDto)
  @UseInterceptors(new ServiceResponseToDto(ListAccountsResponseDto))
  @UseInterceptors(TransformResponseInterceptor)
  findAllByUserId(@UserFromToken() user: IUserFromToken): Promise<ListAccountsResponseDto[]> {
    return this.accountsService.findAllByUserId(user.userId);
  }

  /**
   * Update some account parameters.
   * @param params Url parameters.
   * @param updateParameters request body with parameters to be updated.
   * @returns account updated.
   */
  @UseGuards(AuthenticationGuard)
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
  @UseGuards(AuthenticationGuard)
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
