import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto, CreateTransactionResponseDto } from './dto/create-transaction.dto';
import {
  UpdateTransactionDto,
  UpdateTransactionParamsDto,
  UpdateTransactionResponseDto,
} from './dto/update-transaction.dto';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ValidatePipe } from '@expenses/pipes';
import { Deleted } from '@expenses/interfaces';
import { CommonCreateResponse, CommonResponse, ListResponse } from '@expenses/dto';
import { TransformResponseInterceptor, ServiceResponseToDto } from '@expenses/interceptors';
import { ListTransactionsResponseDto } from './dto/list-transactions.dto';
import { DeleteTransactionParamsDto, DeleteTransactionResponseDto } from './dto/delete-transaction.dto';

@Controller('transaction')
@ApiTags('Transactions')
@ApiExtraModels(
  CreateTransactionResponseDto,
  ListTransactionsResponseDto,
  UpdateTransactionResponseDto,
  DeleteTransactionResponseDto
)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @MessagePattern('createTransaction')
  create(@Payload() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  /**
   * Creates a new transaction.
   * @param createTransactionDto createTransaction Body.
   * @returns transaction created object.
   */
  @Post()
  @ApiOperation({
    summary: 'Create a new transaction',
    description: 'This endpoint creates a new transaction .',
  })
  @CommonCreateResponse(CreateTransactionResponseDto)
  @UseInterceptors(new ServiceResponseToDto(CreateTransactionResponseDto))
  @UseInterceptors(TransformResponseInterceptor)
  createTransaction(
    @Body(new ValidatePipe()) createTransactionDto: CreateTransactionDto
  ): Promise<CreateTransactionResponseDto> {
    return this.transactionsService.create(createTransactionDto);
  }

  /**
   * List of all user's transactions
   * @param userId user id the transaction belongs to.
   * @returns list of user transactions.
   */
  @Get(':userId')
  @ApiOperation({
    summary: 'List of all transactions',
    description: 'This endpoint lists all the transactions of the specified user',
  })
  @ListResponse(ListTransactionsResponseDto)
  @UseInterceptors(new ServiceResponseToDto(ListTransactionsResponseDto))
  @UseInterceptors(TransformResponseInterceptor)
  findAllByUserId(@Param('userId') userId: string): Promise<ListTransactionsResponseDto[]> {
    return this.transactionsService.findAllByUserId(userId);
  }

  /**
   * Update some transaction parameters.
   * @param params Url parameters.
   * @param updateParameters request body with parameters to be updated.
   * @returns transaction updated.
   */
  @Patch(':transactionId')
  @ApiOperation({
    summary: 'Update transaction information',
    description: 'This endpoint updates an user transaction',
  })
  @CommonResponse(UpdateTransactionResponseDto)
  @UseInterceptors(new ServiceResponseToDto(UpdateTransactionResponseDto))
  @UseInterceptors(TransformResponseInterceptor)
  updateTransaction(
    @Param() params: UpdateTransactionParamsDto,
    @Body(new ValidatePipe()) updateParameters: UpdateTransactionDto
  ): Promise<UpdateTransactionResponseDto> {
    return this.transactionsService.updateTransaction(params.transactionId, updateParameters);
  }

  /**
   * Delete a transaction.
   * @param params Url parameters with the transactionID.
   * @returns true or false if the transaction was deleted.
   */
  @Delete(':transactionId')
  @ApiOperation({
    summary: 'Deletes an transaction',
    description: 'This endpoint deleted an transaction',
  })
  @CommonResponse(DeleteTransactionResponseDto)
  @UseInterceptors(new ServiceResponseToDto(DeleteTransactionResponseDto))
  @UseInterceptors(TransformResponseInterceptor)
  deleteTransaction(@Param() params: DeleteTransactionParamsDto): Promise<Deleted> {
    return this.transactionsService.deleteTransaction(params.transactionId);
  }
}
