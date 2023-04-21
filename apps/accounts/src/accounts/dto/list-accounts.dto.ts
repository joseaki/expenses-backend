import { ApiProperty } from '@nestjs/swagger';
import { IAccount } from '../interfaces/account.interface';
import { Expose } from 'class-transformer';

export class ListAccountsResponseDto implements Omit<IAccount, 'userId'> {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Account uuid',
  })
  @Expose()
  uuid: string;

  @ApiProperty({
    example: 'wallet',
    description: 'Account name',
  })
  @Expose()
  name: string;

  @ApiProperty({
    example: '10.0',
    description: 'Initial amount the account starts with',
    required: true,
  })
  @Expose()
  initialValue: number;

  @ApiProperty({
    example: 'PEN',
    description: 'Account currency ISO code',
    required: true,
  })
  @Expose()
  currency: string;

  @ApiProperty({
    example: '#a1d5ee',
    description: 'Account color reference',
    required: true,
  })
  @Expose()
  color: string;
}
