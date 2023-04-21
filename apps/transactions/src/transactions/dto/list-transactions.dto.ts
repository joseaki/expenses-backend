import { ApiProperty } from '@nestjs/swagger';
import { ITransaction, PaymentMethod, TransactionType } from '../interfaces/transaction.interface';
import { Expose } from 'class-transformer';

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
