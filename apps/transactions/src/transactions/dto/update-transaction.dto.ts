import { ApiProperty } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsDateString, IsEnum, IsISO4217CurrencyCode, IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';
import { PaymentMethod, TransactionType } from '../interfaces/transaction.interface';

export class UpdateTransactionDto implements Partial<Omit<CreateTransactionDto, 'uuid' | 'userId'>> {
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

  @IsDateString()
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

  @IsString()
  @ApiProperty({
    example: 'supermarket',
    description: 'Some description of the transaction',
    required: false,
  })
  @Expose()
  description?: string;
}

export class UpdateTransactionParamsDto {
  @IsString()
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Transaction id',
    required: true,
  })
  @Expose()
  transactionId: string;
}

export class UpdateTransactionResponseDto extends UpdateTransactionDto {}
