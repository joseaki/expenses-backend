import { ApiProperty } from '@nestjs/swagger';
import {
  FieldsOrder,
  ITransaction,
  PaymentMethod,
  SortType,
  TransactionType,
} from '../interfaces/transaction.interface';
import { Expose, Type } from 'class-transformer';
import { IsEnum, IsOptional, IsPositive } from 'class-validator';

export class ListTransactionsResponseDto implements Omit<ITransaction, 'userId'> {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Transaction uuid',
  })
  @Expose()
  uuid: string;

  @ApiProperty({
    example: 'PEN',
    description: 'Transaction currency ISO code',
    required: true,
  })
  @Expose()
  currency: string;

  @ApiProperty({
    example: 'INCOME',
    description: 'type of transaction',
    required: true,
    enum: TransactionType,
    type: TransactionType,
  })
  @Expose()
  type: TransactionType;

  @ApiProperty({
    example: 230,
    description: 'Amount of the transaction',
    required: true,
  })
  @Expose()
  amount: number;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Account id the transaction belongs to',
    required: true,
  })
  @Expose()
  accountId: string;

  @ApiProperty({
    example: '2023-04-21T02:45:41.619Z',
    description: 'Date the transaction was performed',
    required: true,
  })
  @Expose()
  dateTime: Date;

  @ApiProperty({
    example: 'CASH',
    description: 'Payment method used for the transaction',
    required: true,
    enum: PaymentMethod,
  })
  @Expose()
  paymentMethod: PaymentMethod;

  @ApiProperty({
    example: 'supermarket',
    description: 'Some description of the transaction',
    required: false,
  })
  @Expose()
  description?: string;
}

export class PaginationTransactionsResponseDto {
  @ApiProperty({
    example: 100,
    description: 'Transaction uuid',
  })
  @Expose()
  count: number;

  @ApiProperty({
    example: 1,
    description: 'Transaction uuid',
  })
  @Expose()
  page: number;

  @ApiProperty({
    description: 'List of transactions',
    type: [ListTransactionsResponseDto],
  })
  @Type(() => ListTransactionsResponseDto)
  @Expose()
  items: ListTransactionsResponseDto[];
}

export class ListTransactionQueryParamsDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty({
    example: 10,
    description: 'Number of transactions to be returned',
    required: false,
  })
  @Expose()
  rowsPerPage: number;

  @IsOptional()
  @IsPositive()
  @ApiProperty({
    example: 1,
    description: 'Page of the the transaction list',
    required: false,
  })
  @Expose()
  pageNumber: number;

  @IsOptional()
  @IsEnum(FieldsOrder)
  @ApiProperty({
    example: 'amount',
    description: 'list of transactions ordered by field name',
    enum: FieldsOrder,
    type: FieldsOrder,
    required: false,
  })
  @Expose()
  orderField: FieldsOrder;

  @IsOptional()
  @IsEnum(SortType)
  @ApiProperty({
    example: 'asc',
    description: 'list of transactions ordered sorted ascending or descending',
    enum: SortType,
    type: SortType,
    required: false,
  })
  @Expose()
  sortType: SortType;
}
