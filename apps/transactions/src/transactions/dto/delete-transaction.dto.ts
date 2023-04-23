import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

export class DeleteTransactionParamsDto {
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

export class DeleteTransactionResponseDto {
  @ApiProperty({
    example: true,
    description: 'True if the transaction is deleted',
  })
  @Expose()
  deleted: boolean;
}

export class DeleteTransactionsFromAccountDto {
  @IsString()
  @IsUUID()
  @Expose()
  accountId: string;
}
