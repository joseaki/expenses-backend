import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsISO4217CurrencyCode,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  ITransaction,
  ITransactionCreateResponse,
  PaymentMethod,
  TransactionType,
} from '../interfaces/transaction.interface';

export class CreateTransactionDto implements Omit<ITransaction, 'uuid' | 'userId'> {
  @IsString()
  @IsISO4217CurrencyCode()
  @ApiProperty({
    example: 'PEN',
    description: 'Transaction currency ISO code',
    required: true,
  })
  @Expose()
  currency: string;

  @IsEnum(TransactionType)
  @ApiProperty({
    example: 'INCOME',
    description: 'type of transaction',
    required: true,
    enum: TransactionType,
    type: TransactionType,
  })
  @Expose()
  type: TransactionType;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    example: 230,
    description: 'Amount of the transaction',
    required: true,
  })
  @Expose()
  amount: number;

  @IsString()
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Account id the transaction belongs to',
    required: true,
  })
  @Expose()
  accountId: string;

  @IsDate()
  @ApiProperty({
    example: '2023-04-21T02:45:41.619Z',
    description: 'Date the transaction was performed',
    required: true,
  })
  @Expose()
  dateTime: Date;

  @IsEnum(PaymentMethod)
  @ApiProperty({
    example: 'CASH',
    description: 'Payment method used for the transaction',
    required: true,
    enum: PaymentMethod,
  })
  @Expose()
  paymentMethod: PaymentMethod;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'supermarket',
    description: 'Some description of the transaction',
    required: false,
  })
  @Expose()
  description?: string;
}

export class CreateTransactionResponseDto implements ITransactionCreateResponse {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'transaction uuid',
  })
  @Expose()
  id: string;
}
